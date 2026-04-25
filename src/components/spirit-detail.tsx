"use client"

import { ArrowLeft, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type Comment = { id: string; name: string; body: string; ts: number }

const DAY = 86_400_000
const SEED_COMMENTS: Omit<Comment, "ts">[] = [
  {
    id: "seed-1",
    name: "Velvet Heron",
    body: "Ordered this twice in one sitting. The bartender just nodded knowingly the second time.",
  },
  {
    id: "seed-2",
    name: "Smoky Marten",
    body: "Balanced, unhurried, dangerously easy to drink. Pairs well with the steak tartare.",
  },
  {
    id: "seed-3",
    name: "Quiet Owl",
    body: "Not what I expected. Better.",
  },
]
const SEED_LIKES = 47

const ADJECTIVES = [
  "Quick",
  "Velvet",
  "Midnight",
  "Copper",
  "Smoky",
  "Restless",
  "Gilded",
  "Quiet",
  "Wandering",
  "Salted",
  "Crimson",
  "Hushed",
  "Bramble",
  "Lantern",
  "Marble",
  "Ember",
  "Dusky",
  "Hollow",
  "Polished",
  "Rye",
]
const ANIMALS = [
  "Turtle",
  "Fox",
  "Heron",
  "Stag",
  "Otter",
  "Magpie",
  "Wolf",
  "Hare",
  "Falcon",
  "Raven",
  "Bison",
  "Lynx",
  "Mole",
  "Crane",
  "Boar",
  "Marten",
  "Owl",
  "Bear",
  "Pheasant",
  "Badger",
]

function randomAlias() {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const b = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  return `${a} ${b}`
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function formatTs(ts: number) {
  const d = new Date(ts)
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

interface Item {
  name: string
  notes: string
  price: string
  category: string
  label?: string
}

interface Props {
  item: Item
  prevSlug: string | null
  nextSlug: string | null
}

export function SpiritDetail({ item, prevSlug, nextSlug }: Props) {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [exitDir, setExitDir] = useState<"next" | "prev" | null>(null)

  const slug = slugify(item.name)
  const likeKey = `btr:likes:${slug}`
  const likedKey = `btr:liked:${slug}`
  const commentsKey = `btr:comments:${slug}`

  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [pulse, setPulse] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [body, setBody] = useState("")

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem(likeKey)
      setLikes(storedLikes === null ? SEED_LIKES : Number(storedLikes))
      setLiked(localStorage.getItem(likedKey) === "1")
      const raw = localStorage.getItem(commentsKey)
      if (raw) {
        setComments(JSON.parse(raw))
      } else {
        const now = Date.now()
        setComments(
          SEED_COMMENTS.map((c, i) => ({ ...c, ts: now - (i + 1) * 3 * DAY })),
        )
      }
    } catch {}
  }, [likeKey, likedKey, commentsKey])

  function toggleLike() {
    const next = liked ? Math.max(0, likes - 1) : likes + 1
    setLikes(next)
    setLiked(!liked)
    if (!liked) {
      setPulse(true)
      setTimeout(() => setPulse(false), 450)
    }
    try {
      localStorage.setItem(likeKey, String(next))
      localStorage.setItem(likedKey, liked ? "0" : "1")
    } catch {}
  }

  function submitComment(e: React.FormEvent) {
    e.preventDefault()
    const trimmedBody = body.trim()
    if (!trimmedBody) return
    const next: Comment[] = [
      {
        id: crypto.randomUUID(),
        name: randomAlias(),
        body: trimmedBody,
        ts: Date.now(),
      },
      ...comments,
    ]
    setComments(next)
    setBody("")
    try {
      localStorage.setItem(commentsKey, JSON.stringify(next))
    } catch {}
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const dir = params.get("dir")
    const el = wrapperRef.current
    if (!el || (dir !== "next" && dir !== "prev")) return
    const cls = dir === "next" ? "food-enter" : "food-enter-prev"
    el.classList.add(cls)
    const onEnd = () => el.classList.remove(cls)
    el.addEventListener("animationend", onEnd, { once: true })
  }, [])

  function handleNext() {
    if (!nextSlug || exitDir) return
    setExitDir("next")
    setTimeout(() => router.push(`/spirits/${nextSlug}?dir=next`), 350)
  }

  function handlePrev() {
    if (!prevSlug || exitDir) return
    setExitDir("prev")
    setTimeout(() => router.push(`/spirits/${prevSlug}?dir=prev`), 350)
  }

  const exitClass =
    exitDir === "next"
      ? "food-exit"
      : exitDir === "prev"
        ? "food-exit-prev"
        : ""

  return (
    <div ref={wrapperRef} className={exitClass}>
      <section className="flex flex-col bg-oxblood px-8 pt-44 pb-24 md:px-16 md:pt-52 md:pb-32">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-12 flex items-center justify-between">
            <Link
              href="/spirits"
              className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/60 uppercase transition-colors hover:text-amber"
            >
              <ArrowLeft className="size-3.5" />
              Back to spirits
            </Link>
            <div className="flex items-center gap-6">
              {prevSlug && (
                <button
                  onClick={handlePrev}
                  disabled={!!exitDir}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/60 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                >
                  <ArrowLeft className="size-3.5" />
                  Prev
                </button>
              )}
              {nextSlug && (
                <button
                  onClick={handleNext}
                  disabled={!!exitDir}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/60 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                >
                  Next
                  <ArrowRight className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4">
              <span className="block h-px w-8 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                {item.label ?? item.category}
              </span>
              <span className="block h-px w-8 shrink-0 bg-amber/50" />
            </div>

            <h1 className="mt-6 font-display text-5xl leading-tight text-cream md:text-7xl lg:text-8xl">
              {item.name}
            </h1>

            <p className="mt-8 max-w-md text-base leading-relaxed text-tan md:text-lg">
              {item.notes}
            </p>

            <div className="mt-12 flex items-baseline gap-3">
              <span className="text-xs tracking-[0.3em] text-tan/50 uppercase">
                Pour
              </span>
              <span className="font-display text-4xl text-amber md:text-5xl">
                ${item.price}
              </span>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-md border-y border-cream/10">
            <div className="flex h-16 items-center justify-between border-b border-cream/10">
              <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                Category
              </span>
              <span className="text-xs tracking-[0.2em] text-cream uppercase">
                {item.category}
              </span>
            </div>
            <button
              onClick={toggleLike}
              aria-pressed={liked}
              className="group flex h-16 w-full items-center justify-between text-left"
            >
              <span className="flex items-center gap-3 text-xs tracking-[0.2em] text-cream/45 uppercase transition-colors group-hover:text-cream/70">
                <Heart
                  className={`size-3.5 transition-all duration-300 ${
                    liked
                      ? "fill-amber stroke-amber"
                      : "stroke-cream/45 group-hover:stroke-amber"
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
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/#reservations"
              className="flex w-fit items-center gap-3 border border-cream/25 px-8 py-3.5 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-8 py-24 md:px-16 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-10 flex items-baseline justify-between border-b border-cream/10 pb-4">
            <h2 className="font-display text-2xl text-cream md:text-3xl">
              Guestbook
            </h2>
            <span className="text-[10px] tracking-[0.3em] text-cream/30 uppercase">
              {comments.length} {comments.length === 1 ? "Note" : "Notes"}
            </span>
          </div>

          <form onSubmit={submitComment} className="mb-12 space-y-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Leave a note about this pour…"
              rows={3}
              className="w-full resize-none border-b border-cream/15 bg-transparent py-3 text-sm leading-relaxed text-cream placeholder-cream/25 focus:border-amber focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!body.trim()}
                className="border border-cream/25 px-6 py-2.5 text-[11px] tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-cream/25 disabled:hover:text-cream"
              >
                Post Note
              </button>
            </div>
          </form>

          <ul className="space-y-8">
            {comments.length === 0 ? (
              <li className="text-center text-xs tracking-[0.2em] text-cream/25 uppercase">
                Be the first to leave a note
              </li>
            ) : (
              comments.map((c) => (
                <li
                  key={c.id}
                  className="border-b border-cream/[0.06] pb-8 last:border-0"
                >
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <span className="text-[11px] tracking-[0.25em] text-cream/80 uppercase">
                      {c.name}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-cream/30 uppercase">
                      {formatTs(c.ts)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-tan">{c.body}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  )
}
