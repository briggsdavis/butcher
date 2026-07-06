import Image from "next/image"
import Link from "next/link"
import { TiltCard } from "~/components/tilt-card"

const restaurants = [
  {
    name: "Meat & Potatoes",
    image: "/logo-meat-and-potatoes.webp",
    href: "https://meatandpotatoespgh.com/",
  },
  {
    name: "Tako",
    image: "/logo-tako.webp",
    href: "https://takopgh.com/",
  },
  {
    name: "Poulet Bleu",
    image: "/logo-poulet-bleu.webp",
    href: "https://www.pouletbleupgh.com/",
  },
  {
    name: "Fish nor Fowl",
    image: "/logo-fish-nor-fowl.webp",
    href: "https://fishnorfowlpgh.com/",
  },
  {
    name: "Coop de Ville",
    image: "/logo-coop-de-ville.webp",
    href: "https://coopdevillepgh.com/",
  },
  {
    name: "Preamp Coffee Studio",
    image: "/logo-preamp-coffee.webp",
    href: "https://www.preampcoffeestudio.com/",
  },
  {
    name: "Golden Gai",
    image: "/logo-golden-gai.webp",
    href: "https://goldengaipgh.com/",
  },
  {
    name: "Sally Ann's",
    image: "/logo-sally-anns.webp",
    href: "https://sallyannspgh.com/",
  },
  {
    name: "Rib Room",
    image: "/logo-rib-room.webp",
    href: "https://ribroompgh.com/",
  },
  {
    name: "Tako Torta",
    image: "/logo-tako-torta.webp",
    href: "https://takotorta.com/",
  },
  {
    name: "Gi-Jin",
    image: "/logo-gi-jin.webp",
    href: "https://gi-jin.com/",
  },
  {
    name: "Sea Monkey",
    image: "/logo-sea-monkey.webp",
    href: "https://www.seamonkeypgh.com/",
  },
  {
    name: "Vieux Carré",
    image: "/logo-vieux-carre.png",
    href: "https://www.seamonkeypgh.com/vieux-carre",
  },
]

const ROTATIONS = [-2.5, 1.8, 2.2, -1.4, 1.6, 2.4, -1.9, 0.8, -1.1, -2.0, 1.4, -0.7]

export function RestaurantGroupSection() {
  return (
    <section className="bg-charcoal px-8 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center" data-animate="">
          <div className="flex items-center justify-center gap-6">
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
            <span className="text-sm text-amber uppercase">The Family</span>
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
          </div>
          <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">
            Part of the{" "}
            <Link
              href="https://richarddeshantz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber italic transition-colors hover:text-cream"
            >
              Richard DeShantz
            </Link>{" "}
            Restaurant Group
          </h2>
          <p className="mt-4 text-tan">Explore our other restaurants across Pittsburgh</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
          {restaurants.map((restaurant, i) => (
            <Link
              key={restaurant.name}
              href={restaurant.href}
              target="_blank"
              rel="noopener noreferrer"
              data-animate=""
              data-delay={String(i * 60)}
              className="block"
            >
              <TiltCard
                initialRotate={ROTATIONS[i % ROTATIONS.length]}
                maxTilt={6}
                subtle
                className="bg-cream shadow-2xl"
              >
                <div className="p-4 pb-2">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex min-h-10 items-center justify-center px-3 pb-3">
                  <p className="text-center font-handwritten text-2xl text-charcoal">
                    {restaurant.name}
                  </p>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
