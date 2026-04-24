import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ItemDetail } from "~/components/item-detail"

const ALL_FOOD = [
  {
    name: "Bone Marrow",
    notes: "Roasted split bones, gremolata, grilled sourdough",
    price: "18",
    category: "Starters",
  },
  {
    name: "Beef Tartare",
    notes: "Hand-cut tenderloin, cured egg yolk, capers, mustard seed",
    price: "22",
    category: "Starters",
  },
  {
    name: "Charred Octopus",
    notes: "Romesco, fingerling potatoes, chorizo vinaigrette",
    price: "24",
    category: "Starters",
  },
  {
    name: "Burrata",
    notes: "Heirloom tomato, basil oil, aged balsamic, grilled bread",
    price: "16",
    category: "Starters",
  },
  {
    name: "Oysters on the Half Shell",
    notes: "Half dozen, mignonette, cocktail sauce, fresh horseradish",
    price: "21",
    category: "Starters",
  },
  {
    name: "Bone-In Ribeye",
    notes: "Dry-aged 45 days, roasted marrow butter",
    price: "68",
    category: "Entrées",
  },
  {
    name: "Braised Short Rib",
    notes: "Red wine reduction, root vegetables, horseradish gremolata",
    price: "42",
    category: "Entrées",
  },
  {
    name: "Pan-Seared Duck Breast",
    notes: "Cherry gastrique, wild rice, charred broccolini",
    price: "38",
    category: "Entrées",
  },
  {
    name: "Grilled Lamb Chops",
    notes: "Herb crust, mint chimichurri, fingerling potatoes",
    price: "54",
    category: "Entrées",
  },
  {
    name: "Berkshire Pork Chop",
    notes: "Brined and grilled, apple mostarda, braised greens",
    price: "36",
    category: "Entrées",
  },
  {
    name: "Seared Scallops",
    notes: "Cauliflower purée, brown butter, crispy capers, pancetta",
    price: "44",
    category: "Entrées",
  },
  {
    name: "Whole Branzino",
    notes: "Wood-grilled, lemon, herbs, olive oil, roasted fennel",
    price: "40",
    category: "Entrées",
  },
  {
    name: "Truffle Fries",
    notes: "Parmesan, chive, black truffle",
    price: "12",
    category: "Sides",
  },
  {
    name: "Creamed Spinach",
    notes: "Slow-stewed, nutmeg, cream",
    price: "10",
    category: "Sides",
  },
  {
    name: "Roasted Bone Marrow Mashed Potatoes",
    notes: "Yukon gold, marrow butter, sea salt",
    price: "14",
    category: "Sides",
  },
  {
    name: "Charred Broccolini",
    notes: "Lemon, chili, garlic",
    price: "11",
    category: "Sides",
  },
  {
    name: "Brussels Sprouts",
    notes: "Bacon, balsamic glaze",
    price: "12",
    category: "Sides",
  },
  {
    name: "Mac & Cheese",
    notes: "Gruyère, white cheddar, breadcrumb crust",
    price: "13",
    category: "Sides",
  },
  {
    name: "Bourbon Crème Brûlée",
    notes: "Woodford Reserve custard, torched sugar, shortbread",
    price: "14",
    category: "Desserts",
  },
  {
    name: "Chocolate Torte",
    notes: "Flourless, espresso crème, candied hazelnuts",
    price: "15",
    category: "Desserts",
  },
  {
    name: "Bread Pudding",
    notes: "Brioche, salted caramel, vanilla bean ice cream",
    price: "13",
    category: "Desserts",
  },
]

function getItem(slug: string) {
  return ALL_FOOD.find((item) => slugify(item.name) === slug)
}

export function generateStaticParams() {
  return ALL_FOOD.map((item) => ({ slug: slugify(item.name) }))
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const item = getItem(slug)
    return { title: item?.name ?? "Not Found" }
  })
}

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) notFound()

  const image = `/food/${slug}.jpg`
  const currentIndex = ALL_FOOD.findIndex((i) => slugify(i.name) === slug)
  const prevItem = ALL_FOOD[currentIndex - 1] ?? null
  const nextItem = ALL_FOOD[currentIndex + 1] ?? null
  const prevSlug = prevItem ? slugify(prevItem.name) : null
  const nextSlug = nextItem ? slugify(nextItem.name) : null

  return (
    <Suspense>
      <ItemDetail
        item={item}
        image={image}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        basePath="/food"
        backLabel="Back to food"
      />
    </Suspense>
  )
}
