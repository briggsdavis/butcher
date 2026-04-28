"use client"

import Image from "next/image"

const IMAGES = [
  { src: "/barmood1.jpg", alt: "Bar atmosphere" },
  { src: "/bardecor1.jpg", alt: "Bar decor" },
  { src: "/bartender-at-work.jpg", alt: "Bartender at work" },
  { src: "/candlelit-tables.jpg", alt: "Candlelit tables" },
  { src: "/cocktail-splash.jpg", alt: "Cocktail" },
  { src: "/fondue-spread.jpg", alt: "Fondue spread" },
  { src: "/charcuterie-board.jpg", alt: "Charcuterie board" },
  { src: "/mussels-cream-sauce.jpg", alt: "Mussels" },
  { src: "/steak-tartare.jpg", alt: "Steak tartare" },
  { src: "/parallax-wide.jpg", alt: "The restaurant" },
]

export function InfiniteCarousel() {
  return (
    <section data-wipe className="wood-grain overflow-hidden bg-charcoal py-24 md:py-32">
      <div data-animate="" className="mb-12 flex items-center justify-center gap-6 px-8">
        <span className="block h-px w-16 bg-amber/25" />
        <span className="shrink-0 font-display text-xs tracking-[0.3em] text-amber uppercase italic">
          A Taste of the Experience
        </span>
        <span className="block h-px w-16 bg-amber/25" />
      </div>
      {/* Outer wrapper masks overflow while inner track animates */}
      <div className="overflow-hidden">
        <div className="carousel-track">
          {[...IMAGES, ...IMAGES].map((img, i) => (
            <div key={i} className="carousel-item group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="340px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
