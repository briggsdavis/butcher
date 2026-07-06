"use client"

import { useMutation, useQuery } from "convex/react"
import { ArrowLeft, ArrowRight, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { resolveCommonValues } from "~/lib/common-values"
import { api } from "../../convex/_generated/api"
import type { Doc, Id } from "../../convex/_generated/dataModel"

type Kind = "food" | "spirit" | "beverage"

function formatTs(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

type Config = {
  kind: Kind
  slug: string
  basePath: string
  backLabel: string
  priceLabel?: string
  notePlaceholder?: string
}

export function MenuDetail({
  kind,
  slug,
  basePath,
  backLabel,
  priceLabel = "Price",
  notePlaceholder = "Leave a review about this…",
}: Config) {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [exitDir, setExitDir] = useState<"next" | "prev" | null>(null)

  const item = useQuery(api.menu.getBySlug, { kind, slug })
  const allItems = useQuery(api.menu.list, { kind })
  const savedValues = useQuery(api.site.getCommonValues)

  if (item === null) notFound()

  const { prevSlug, nextSlug } = useMemo(() => {
    if (!item || !allItems) return { prevSlug: null, nextSlug: null }
    const idx = allItems.findIndex((i) => i._id === item._id)
    return {
      prevSlug: idx > 0 ? allItems[idx - 1].slug : null,
      nextSlug: idx >= 0 && idx < allItems.length - 1 ? allItems[idx + 1].slug : null,
    }
  }, [item, allItems])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const dir = params.get("dir")
    const el = wrapperRef.current
    if (!el || (dir !== "next" && dir !== "prev")) return
    const cls = dir === "next" ? "food-enter" : "food-enter-prev"
    el.classList.add(cls)
    const onEnd = () => el.classList.remove(cls)
    el.addEventListener("animationend", onEnd, { once: true })
  }, [slug])

  function handleNext() {
    if (!nextSlug || exitDir) return
    setExitDir("next")
    setTimeout(() => router.push(`${basePath}/${nextSlug}?dir=next`), 350)
  }

  function handlePrev() {
    if (!prevSlug || exitDir) return
    setExitDir("prev")
    setTimeout(() => router.push(`${basePath}/${prevSlug}?dir=prev`), 350)
  }

  const exitClass = exitDir === "next" ? "food-exit" : exitDir === "prev" ? "food-exit-prev" : ""
  const common = resolveCommonValues(savedValues)
  const reservationHref = common["reservation.href"]

  if (item === undefined) {
    return <div className="min-h-screen bg-charcoal" />
  }

  return (
    <div ref={wrapperRef} className={exitClass}>
      <section className="flex min-h-screen flex-col justify-center bg-charcoal px-8 pt-44 pb-10 md:px-16 md:pt-52">
        <div className="grid md:grid-cols-2 md:gap-16">
          <div className="relative min-h-[55vw] bg-charcoal md:min-h-0">
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center pt-10 md:pt-0">
            <div className="mb-10 flex items-center justify-between">
              <Link
                href={basePath}
                className="flex items-center gap-2 text-xs text-tan/50 uppercase transition-colors hover:text-amber"
              >
                <ArrowLeft className="size-3.5" />
                {backLabel}
              </Link>
              <div className="flex items-center gap-6">
                {prevSlug && (
                  <button
                    onClick={handlePrev}
                    disabled={!!exitDir}
                    className="flex items-center gap-2 text-xs text-tan/50 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                  >
                    <ArrowLeft className="size-3.5" />
                    Prev
                  </button>
                )}
                {nextSlug && (
                  <button
                    onClick={handleNext}
                    disabled={!!exitDir}
                    className="flex items-center gap-2 text-xs text-tan/50 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                  >
                    Next
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            <h1 className="font-display text-3xl text-cream md:text-4xl lg:text-5xl">
              {item.name}
            </h1>

            <p className="mt-5 max-w-sm text-sm text-tan">{item.description}</p>

            <div className="mt-10 border-t border-cream/10">
              <Row label={priceLabel} value={`$${item.price}`} />
              <Row label="Category" value={item.category} />
              <LikeRow itemId={item._id} likes={item.likes} slug={item.slug} />
            </div>

            <div className="mt-10">
              <Link
                href={reservationHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-3 border border-amber px-8 py-3.5 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>

        <Guestbook itemId={item._id} placeholder={notePlaceholder} />
      </section>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-cream/10 py-5">
      <span className="text-xs text-cream/45 uppercase">
        {label}
        <span className="mx-3 text-cream/20">·</span>
        {value}
      </span>
    </div>
  )
}

function LikeRow({
  itemId,
  likes,
  slug,
}: {
  itemId: Id<"menuItems">
  likes: number
  slug: string
}) {
  const toggle = useMutation(api.menu.toggleLike)
  const likedKey = `btr:liked:menu:${slug}`
  const [liked, setLiked] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(likedKey) === "1")
    } catch {}
  }, [likedKey])

  async function onToggle() {
    const next = !liked
    setLiked(next)
    if (next) {
      setPulse(true)
      setTimeout(() => setPulse(false), 450)
    }
    try {
      localStorage.setItem(likedKey, next ? "1" : "0")
    } catch {}
    await toggle({ itemId, liked: next })
  }

  return (
    <button
      onClick={onToggle}
      aria-pressed={liked}
      className="group flex w-full items-center justify-between border-b border-cream/10 py-5 text-left"
    >
      <span className="flex items-center gap-3 text-xs text-cream/45 uppercase transition-colors group-hover:text-cream/70">
        <Heart
          className={`size-3.5 transition-all duration-300 ${
            liked ? "fill-amber stroke-amber" : "stroke-cream/45 group-hover:stroke-amber"
          } ${pulse ? "scale-125" : "scale-100"}`}
        />
        {liked ? "You liked this" : "Tap to like"}
      </span>
      <span
        className={`font-display text-lg tabular-nums transition-colors ${
          liked ? "text-amber" : "text-cream/40"
        }`}
      >
        {likes}
      </span>
    </button>
  )
}

function Guestbook({ itemId, placeholder }: { itemId: Id<"menuItems">; placeholder: string }) {
  const comments = useQuery(api.menu.listComments, { itemId })
  const addComment = useMutation(api.menu.addComment)
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmed = body.trim()
    if (!trimmedName || !trimmed || submitting) return
    setSubmitting(true)
    try {
      await addComment({ itemId, name: trimmedName, body: trimmed })
      setName("")
      setBody("")
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const rows: Doc<"menuComments">[] = comments ?? []

  return (
    <div className="mx-auto mt-24 w-full max-w-3xl md:mt-32">
      <div className="mb-10 flex items-baseline justify-between border-b border-cream/10 pb-4">
        <h2 className="font-display text-2xl text-cream md:text-3xl">Reviews</h2>
        <span className="text-xs text-cream/30 uppercase">
          {rows.length} {rows.length === 1 ? "Review" : "Reviews"}
        </span>
      </div>

      <form onSubmit={onSubmit} className="mb-12 space-y-4">
        <input
          aria-label="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border-b border-cream/15 bg-transparent py-3 text-sm text-cream placeholder-cream/25 focus:border-amber focus:outline-none"
        />
        <textarea
          aria-label="Leave a review"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full resize-none border-b border-cream/15 bg-transparent py-3 text-sm text-cream placeholder-cream/25 focus:border-amber focus:outline-none"
        />
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-cream/35 uppercase">
            {submitted
              ? "Thanks. Your review is pending approval."
              : "Reviews appear after approval."}
          </span>
          <button
            type="submit"
            disabled={!name.trim() || !body.trim() || submitting}
            className="border border-amber px-6 py-2.5 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-amber disabled:hover:text-amber disabled:hover:shadow-none"
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </div>
      </form>

      <ul className="space-y-8">
        {rows.length === 0 ? (
          <li className="text-center text-xs text-cream/25 uppercase">
            Be the first to leave a review
          </li>
        ) : (
          rows.map((c) => (
            <li key={c._id} className="border-b border-cream/[0.06] pb-8 last:border-0">
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <span className="text-xs text-cream/80 uppercase">{c.name}</span>
                <span className="text-xs text-cream/30 uppercase">{formatTs(c._creationTime)}</span>
              </div>
              <p className="text-sm text-tan">{c.body}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
