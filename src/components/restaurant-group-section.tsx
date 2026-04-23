import Image from "next/image"
import Link from "next/link"

const restaurants = [
  {
    name: "Meat & Potatoes",
    image: "/meatpotatoew.webp",
    href: "https://meatandpotatoespgh.com/",
  },
  {
    name: "Tako",
    image: "/tako.webp",
    href: "https://takopgh.com/",
  },
  {
    name: "Poulet Bleu",
    image: "/pouletbleu.webp",
    href: "https://www.pouletbleupgh.com/",
  },
  {
    name: "Fish nor Fowl",
    image: "/fish.webp",
    href: "https://fishnorfowlpgh.com/",
  },
  {
    name: "Coop de Ville",
    image: "/voopdeville.webp",
    href: "https://coopdevillepgh.com/",
  },
  {
    name: "Preamp Coffee Studio",
    image: "/preamp.webp",
    href: "https://www.preampcoffeestudio.com/",
  },
  {
    name: "Golden Gai",
    image: "/goldengay.webp",
    href: "https://goldengaipgh.com/",
  },
  {
    name: "Sally Ann's",
    image: "/sallyanny.webp",
    href: "https://sallyannspgh.com/",
  },
  {
    name: "The Rib Room",
    image: "/ribroom.webp",
    href: "https://ribroompgh.com/",
  },
  {
    name: "Tako Torta",
    image: "/takotorta.webp",
    href: "https://takotorta.com/",
  },
  {
    name: "Gi-Jin Hand Roll Bar",
    image: "/handrollbar.webp",
    href: "https://gi-jin.com/",
  },
  {
    name: "Sea Monkey",
    image: "/seamonkey.webp",
    href: "https://www.seamonkeypgh.com/",
  },
]

export function RestaurantGroupSection() {
  return (
    <section className="bg-charcoal px-8 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center" data-animate="">
          <div className="flex items-center justify-center gap-6">
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              The Family
            </span>
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
          </div>
          <h2 className="mt-4 font-display text-4xl leading-tight text-cream md:text-5xl">
            Part of the{" "}
            <Link
              href="https://richarddeshantz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="italic text-amber transition-colors hover:text-cream"
            >
              Richard Deshantz
            </Link>{" "}
            Restaurant Group
          </h2>
          <p className="mt-4 text-tan">
            Explore our other restaurants across Pittsburgh
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {restaurants.map((restaurant, i) => (
            <Link
              key={restaurant.name}
              href={restaurant.href}
              target="_blank"
              rel="noopener noreferrer"
              data-animate=""
              data-delay={String(i * 60)}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded border border-cream/10 bg-cream/5 transition-all duration-300 group-hover:border-amber/40 group-hover:bg-cream/10">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-contain p-3 transition-opacity duration-300 group-hover:opacity-80"
                />
              </div>
              <span className="text-center text-xs text-tan/70 transition-colors group-hover:text-cream">
                {restaurant.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
