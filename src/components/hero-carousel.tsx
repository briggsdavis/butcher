"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type HeroImage = { src: string; alt: string }

interface HeroCarouselProps {
  images: HeroImage[]
  parallaxSpeed?: number
}

export function HeroCarousel({ images, parallaxSpeed = 0.15 }: HeroCarouselProps) {
  const [active, setActive] = useState(0)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % images.length), 8000)
    return () => clearInterval(id)
  }, [images.length])

  useEffect(() => {
    let frame = 0
    const apply = () => {
      frame = 0
      if (layerRef.current) {
        layerRef.current.style.transform = `translate3d(0, ${window.scrollY * parallaxSpeed}px, 0)`
      }
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [parallaxSpeed])

  return (
    <>
      <div
        ref={layerRef}
        className="absolute inset-x-0 top-[-15%] bottom-[-15%] will-change-transform"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${active === i ? "opacity-100" : "opacity-0"}`}
          >
            <Image src={img.src} alt={img.alt} fill priority className="object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="grid place-items-center p-2.5"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                active === i ? "h-1.5 w-6 bg-amber" : "h-1.5 w-1.5 bg-cream/40 hover:bg-cream/70"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  )
}
