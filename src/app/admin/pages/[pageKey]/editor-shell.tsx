"use client"

import { useMutation, useQuery } from "convex/react"
import { Check, ExternalLink, Loader2, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import {
  getDefaultImageFields,
  getDefaultTextFields,
  type SitePageDefinition,
} from "~/lib/site-content"
import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { EditorProvider, type EditorApi } from "./editable"

type Working = {
  fields: Record<string, string>
  imageIds: Record<string, Id<"_storage">>
  imageUrls: Record<string, string>
}

type SaveStatus = "saved" | "unsaved" | "saving"

const AUTOSAVE_DELAY = 700

function nonNullUrls(urls: Record<string, string | null>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, url] of Object.entries(urls)) {
    if (url) out[key] = url
  }
  return out
}

export function EditorShell({
  definition,
  children,
}: {
  definition: SitePageDefinition
  children: ReactNode
}) {
  const savedPage = useQuery(api.site.getPageForAdmin, { key: definition.key })
  const savePageDraft = useMutation(api.site.savePageDraft)
  const publishPage = useMutation(api.site.publishPage)
  const discardPageDraft = useMutation(api.site.discardPageDraft)
  const generateUploadUrl = useMutation(api.site.generatePageImageUploadUrl)

  const defaultFields = useMemo(() => getDefaultTextFields(definition), [definition])
  const defaultImages = useMemo(() => getDefaultImageFields(definition), [definition])

  const [working, setWorkingState] = useState<Working>({ fields: {}, imageIds: {}, imageUrls: {} })
  const workingRef = useRef(working)
  const [ready, setReady] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved")
  const [unpublished, setUnpublished] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const autoSaveRef = useRef(autoSave)
  autoSaveRef.current = autoSave
  const saveStatusRef = useRef(saveStatus)
  saveStatusRef.current = saveStatus
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initializedRef = useRef(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const pendingKeyRef = useRef<string | null>(null)
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)

  // Initialise the working buffer once from the server's working state.
  useEffect(() => {
    if (savedPage === undefined || initializedRef.current) return
    initializedRef.current = true
    // `getPageForAdmin` returns a default object for a page with no saved doc,
    // but older deployments returned `null` in that case. Tolerate both so a
    // page that has never been saved loads with defaults instead of crashing
    // the editor with "Cannot read properties of null (reading 'fields')".
    const page = savedPage ?? {
      fields: {},
      images: {},
      imageUrls: {},
      hasUnpublishedChanges: false,
    }
    const next: Working = {
      fields: { ...defaultFields, ...page.fields },
      imageIds: page.images ?? {},
      imageUrls: nonNullUrls(page.imageUrls),
    }
    workingRef.current = next
    setWorkingState(next)
    setUnpublished(page.hasUnpublishedChanges)
    setSaveStatus("saved")
    setReady(true)
  }, [savedPage, defaultFields])

  const flushDraft = useCallback(async () => {
    const w = workingRef.current
    setSaveStatus("saving")
    try {
      await savePageDraft({ key: definition.key, fields: w.fields, images: w.imageIds })
      setSaveStatus("saved")
    } catch {
      setSaveStatus("unsaved")
    }
  }, [savePageDraft, definition.key])

  // Any change to the working buffer marks it dirty and (optionally) queues a
  // debounced auto-save to the private draft.
  const commit = useCallback(
    (next: Working) => {
      workingRef.current = next
      setWorkingState(next)
      setUnpublished(true)
      setSaveStatus("unsaved")
      setError(null)
      if (timerRef.current) clearTimeout(timerRef.current)
      if (autoSaveRef.current) {
        timerRef.current = setTimeout(() => {
          void flushDraft()
        }, AUTOSAVE_DELAY)
      }
    },
    [flushDraft],
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Turning auto-save on should persist any pending edits immediately.
  useEffect(() => {
    if (autoSave && saveStatusRef.current === "unsaved") void flushDraft()
  }, [autoSave, flushDraft])

  const uploadFile = useCallback(
    async (file: File) => {
      const url = await generateUploadUrl({})
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!res.ok) throw new Error("Upload failed.")
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> }
      return { storageId: storageId as string, url: URL.createObjectURL(file) }
    },
    [generateUploadUrl],
  )

  const api_: EditorApi = useMemo(() => {
    return {
      // Reads come from render state so every consumer re-renders on change;
      // writes read workingRef.current so batched writes compose correctly.
      getField: (key) => working.fields[key] ?? "",
      setField: (key, value, opts) => {
        const v = opts?.lowercase ? value.toLowerCase() : value
        commit({
          ...workingRef.current,
          fields: { ...workingRef.current.fields, [key]: v },
        })
      },
      setFields: (partial) => {
        commit({
          ...workingRef.current,
          fields: { ...workingRef.current.fields, ...partial },
        })
      },
      removeKeys: (keys) => {
        const w = workingRef.current
        const fields = { ...w.fields }
        const imageIds = { ...w.imageIds }
        const imageUrls = { ...w.imageUrls }
        for (const key of keys) {
          delete fields[key]
          delete imageIds[key]
          delete imageUrls[key]
        }
        commit({ fields, imageIds, imageUrls })
      },
      getImageUrl: (key) => working.imageUrls[key] ?? defaultImages[key] ?? "",
      hasImageOverride: (key) => key in working.imageIds,
      uploadInto: (key) => {
        pendingKeyRef.current = key
        fileInputRef.current?.click()
      },
      removeImage: (key) => {
        const w = workingRef.current
        const imageIds = { ...w.imageIds }
        const imageUrls = { ...w.imageUrls }
        delete imageIds[key]
        delete imageUrls[key]
        commit({ ...w, imageIds, imageUrls })
      },
      uploadFile,
      setImage: (key, storageId, url) => {
        const w = workingRef.current
        commit({
          fields: w.fields,
          imageIds: { ...w.imageIds, [key]: storageId as Id<"_storage"> },
          imageUrls: { ...w.imageUrls, [key]: url },
        })
      },
      uploadingKey,
    }
  }, [working, commit, uploadFile, defaultImages, uploadingKey])

  async function onFilePicked(file: File) {
    const key = pendingKeyRef.current
    pendingKeyRef.current = null
    if (!key) return
    setUploadingKey(key)
    setError(null)
    try {
      const { storageId, url } = await uploadFile(file)
      api_.setImage(key, storageId, url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.")
    } finally {
      setUploadingKey(null)
    }
  }

  async function onPublish() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setBusy(true)
    setError(null)
    try {
      const w = workingRef.current
      await publishPage({ key: definition.key, fields: w.fields, images: w.imageIds })
      setSaveStatus("saved")
      setUnpublished(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed.")
    } finally {
      setBusy(false)
    }
  }

  async function onDiscard() {
    if (!window.confirm("Discard all unpublished changes and revert to the live version?")) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setBusy(true)
    setError(null)
    try {
      const published = await discardPageDraft({ key: definition.key })
      const next: Working = {
        fields: { ...defaultFields, ...published.fields },
        imageIds: published.images ?? {},
        imageUrls: nonNullUrls(published.imageUrls),
      }
      workingRef.current = next
      setWorkingState(next)
      setUnpublished(false)
      setSaveStatus("saved")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Discard failed.")
    } finally {
      setBusy(false)
    }
  }

  const hasChanges = unpublished || saveStatus !== "saved"

  return (
    <EditorProvider value={api_}>
      <div className="flex min-h-screen flex-col-reverse lg:flex-row">
        <div className="min-w-0 flex-1 bg-charcoal">
          {ready ? (
            children
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-tan/60">
              <Loader2 className="mr-2 size-4 animate-spin" /> Loading editor…
            </div>
          )}
        </div>

        <aside className="shrink-0 border-b border-amber/20 bg-oxblood/95 lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:border-b-0 lg:border-l lg:border-amber/20">
          <div className="flex h-full flex-col p-6">
            <p className="text-xs tracking-[0.2em] text-amber uppercase">Editing</p>
            <h2 className="mt-1 font-display text-3xl text-cream">{definition.label} Page</h2>

            <StatusRow status={saveStatus} unpublished={unpublished} />

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={onPublish}
                disabled={busy || !hasChanges}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-amber px-5 py-3 text-sm font-medium text-charcoal transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                Save changes
              </button>
              <button
                type="button"
                onClick={onDiscard}
                disabled={busy || !unpublished}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-amber/50 px-5 py-3 text-sm text-amber transition-colors hover:border-cream hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="size-3.5" />
                Discard
              </button>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm text-cream select-none">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="size-4 accent-amber"
              />
              Auto-save
            </label>

            {error && <p className="mt-4 text-sm text-amber">{error}</p>}

            <p className="mt-5 text-xs leading-relaxed text-tan/50">
              Edits are kept as a private draft. Click{" "}
              <span className="text-tan">Save changes</span> to publish them to the live site.{" "}
              <span className="text-tan">Discard</span> reverts to the published version.
            </p>

            <Link
              href={definition.publicHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 pt-6 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
            >
              <ExternalLink className="size-3.5" />
              View live page
            </Link>
          </div>
        </aside>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          aria-label="Upload image"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            e.target.value = ""
            if (file) void onFilePicked(file)
          }}
        />
      </div>
    </EditorProvider>
  )
}

function StatusRow({ status, unpublished }: { status: SaveStatus; unpublished: boolean }) {
  let dot = "bg-green-500"
  let label = "All changes saved"
  let text = "text-tan"

  if (status === "saving") {
    dot = "bg-amber animate-pulse"
    label = "Saving…"
    text = "text-tan"
  } else if (status === "unsaved") {
    dot = "bg-tan/60"
    label = "Unsaved changes"
    text = "text-tan"
  } else if (unpublished) {
    dot = "bg-amber"
    label = "Draft saved — not live"
    text = "text-amber"
  }

  return (
    <div className="mt-4 flex items-center gap-2.5">
      {status === "saving" ? (
        <Loader2 className="size-3.5 animate-spin text-amber" />
      ) : status === "saved" && !unpublished ? (
        <Check className="size-3.5 text-green-500" />
      ) : (
        <span className={`size-2.5 rounded-full ${dot}`} />
      )}
      <span className={`text-sm ${text}`}>{label}</span>
    </div>
  )
}
