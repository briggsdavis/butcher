"use client"

import { useMutation, useQuery } from "convex/react"
import { Check, ExternalLink, Star, Trash2 } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"

function formatTs(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function itemHref(kind: string | null, slug: string | null) {
  if (!kind || !slug) return null
  if (kind === "beverage") return `/beverages/${slug}`
  if (kind === "spirit") return `/spirits/${slug}`
  return `/food/${slug}`
}

export default function AdminReviewsPage() {
  const reviews = useQuery(api.menu.listReviewsForAdmin)
  const approveReview = useMutation(api.menu.approveReview)
  const setFeatured = useMutation(api.menu.setReviewFeatured)
  const removeReview = useMutation(api.menu.removeReview)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const rows = useMemo(() => {
    return [...(reviews ?? [])].sort((a, b) => {
      if (a.status !== b.status) return a.status === "pending" ? -1 : 1
      return b._creationTime - a._creationTime
    })
  }, [reviews])
  const pendingCount = rows.filter((review) => review.status === "pending").length
  const featuredCount = rows.filter((review) => review.featured).length

  async function run(id: Id<"menuComments">, action: () => Promise<unknown>) {
    setBusyId(id)
    setError(null)
    try {
      await action()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setBusyId(null)
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <span className="block h-px w-8 shrink-0 bg-amber/50" />
          <span className="text-xs text-amber uppercase">Moderation</span>
        </div>
        <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="heading-emboss font-display text-4xl text-cream md:text-5xl">Reviews</h1>
            <p className="mt-1 text-xs text-tan uppercase">
              {pendingCount} pending · {featuredCount}/5 featured
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 border border-red-400/40 bg-red-950/20 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-2">
          {reviews === undefined ? (
            <div className="border border-amber/20 p-4 text-sm text-tan">Loading reviews…</div>
          ) : rows.length === 0 ? (
            <div className="border border-amber/20 p-4 text-sm text-tan">No reviews yet.</div>
          ) : (
            rows.map((review) => {
              const href = itemHref(review.itemKind, review.itemSlug)
              const approved = review.status === "approved"
              const busy = busyId === review._id

              return (
                <article
                  key={review._id}
                  className="border border-amber/20 bg-charcoal/20 px-3 py-2"
                >
                  <div className="grid gap-3 lg:grid-cols-12 lg:items-center">
                    <div className="flex min-w-0 flex-wrap items-center gap-2 lg:col-span-2 lg:block lg:space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`border px-1.5 py-0.5 text-xs uppercase ${
                            approved ? "border-cream/20 text-cream/60" : "border-amber text-amber"
                          }`}
                        >
                          {review.status}
                        </span>
                        {review.featured && (
                          <span className="border border-amber/60 px-1.5 py-0.5 text-xs text-amber uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-medium text-cream">{review.name}</h2>
                        <p className="text-xs text-tan/60 uppercase">
                          {formatTs(review._creationTime)}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0 lg:col-span-7">
                      <div className="flex min-w-0 items-center gap-2 text-xs text-cream/50 uppercase">
                        <span className="truncate">{review.itemName}</span>
                        {href && (
                          <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center gap-1 text-amber transition-colors hover:text-cream"
                          >
                            View
                            <ExternalLink className="size-3" />
                          </Link>
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-tan">{review.body}</p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-1.5 lg:col-span-3 lg:justify-end">
                      {!approved && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => run(review._id, () => approveReview({ id: review._id }))}
                          className="flex items-center gap-1.5 border border-amber px-2 py-1.5 text-xs text-amber uppercase transition-colors hover:border-cream hover:text-cream disabled:opacity-40"
                        >
                          <Check className="size-3" />
                          Approve
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={busy || !approved}
                        onClick={() =>
                          run(review._id, () =>
                            setFeatured({ id: review._id, featured: !review.featured }),
                          )
                        }
                        className="flex items-center gap-1.5 border border-amber/50 px-2 py-1.5 text-xs text-amber uppercase transition-colors hover:border-cream hover:text-cream disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Star className={review.featured ? "size-3 fill-amber" : "size-3"} />
                        {review.featured ? "Unfeature" : "Feature"}
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => run(review._id, () => removeReview({ id: review._id }))}
                        className="flex items-center gap-1.5 border border-cream/20 px-2 py-1.5 text-xs text-cream/60 uppercase transition-colors hover:border-red-300 hover:text-red-100 disabled:opacity-40"
                      >
                        <Trash2 className="size-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}
