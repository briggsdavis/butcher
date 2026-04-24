"use client"

import { ArrowLeft, ArrowRight, Heart } from "lucide-react"
import Image from "next/image"
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
}

interface Props {
  item: Item
  image: string
  prevSlug: string | null
  nextSlug: string | null
  basePath: "/beverages" | "/spirits" | "/food"
  backLabel: string
}

export function ItemDetail({
  item,
  image,
  prevSlug,
  nextSlug,
  basePath,
  backLabel,
}: Props) {
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
    setTimeout(() => router.push(`${basePath}/${nextSlug}?dir=next`), 350)
  }

  function handlePrev() {
    if (!prevSlug || exitDir) return
    setExitDir("prev")
    setTimeout(() => router.push(`${basePath}/${prevSlug}?dir=prev`), 350)
  }

  const exitClass =
    exitDir === "next"
      ? "food-exit"
      : exitDir === "prev"
        ? "food-exit-prev"
        : ""

  return (
    <div ref={wrapperRef} className={exitClass}>
      <section className="flex min-h-screen flex-col justify-center bg-charcoal px-8 pt-44 pb-10 md:px-16 md:pt-52">
        <div className="grid md:grid-cols-2 md:gap-16">
          <div className="relative min-h-[55vw] md:min-h-0">
            <Image
              src={image}
              alt={item.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center pt-10 md:pt-0">
            <div className="mb-10 flex items-center justify-between">
              <Link
                href={basePath}
                className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber"
              >
                <ArrowLeft className="size-3.5" />
                {backLabel}
              </Link>
              <div className="flex items-center gap-6">
                {prevSlug && (
                  <button
                    onClick={handlePrev}
                    disabled={!!exitDir}
                    className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                  >
                    <ArrowLeft className="size-3.5" />
                    Prev
                  </button>
                )}
                {nextSlug && (
                  <button
                    onClick={handleNext}
                    disabled={!!exitDir}
                    className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                  >
                    Next
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            <h1 className="font-display text-3xl leading-tight text-cream md:text-4xl lg:text-5xl">
              {item.name}
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-tan">
              {item.notes}
            </p>

            <div className="mt-10 border-t border-cream/10">
              <div className="border-b border-cream/10 py-5">
                <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                  Price
                  <span className="mx-3 text-cream/20">·</span>${item.price}
                </span>
              </div>
              <div className="border-b border-cream/10 py-5">
                <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                  Category
                  <span className="mx-3 text-cream/20">·</span>
                  {item.category}
                </span>
              </div>
              <button
                onClick={toggleLike}
                aria-pressed={liked}
                className="group flex w-full items-center justify-between border-b border-cream/10 py-5 text-left"
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

            <div className="mt-10">
              <Link
                href="/#reservations"
                className="flex w-fit items-center gap-3 border border-cream/25 px-8 py-3.5 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 w-full max-w-3xl md:mt-32">
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
              placeholder="Leave a note about this dish…"
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
