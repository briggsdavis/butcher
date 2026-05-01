"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type HeroImage = { src: string; alt: string }

interface HeroCarouselProps {
  images: HeroImage[]
  firstImageAngle?: boolean
}

export function HeroCarousel({ images, firstImageAngle = false }: HeroCarouselProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % images.length), 8000)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <>
      {images.map((img, i) => (
        <div
          key={img.src}
          data-parallax="hero-bg"
          data-parallax-speed="0.15"
          data-parallax-no-rotate={firstImageAngle && i === 0 ? undefined : ""}
          className={`absolute inset-x-0 transition-opacity duration-1000 ${active === i ? "opacity-100" : "opacity-0"}`}
          style={{ top: "-15%", bottom: "-15%" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              active === i
                ? "h-1.5 w-6 bg-amber"
                : "h-1.5 w-1.5 bg-cream/40 hover:bg-cream/70"
            }`}
          />
        ))}
      </div>
    </>
  )
}
