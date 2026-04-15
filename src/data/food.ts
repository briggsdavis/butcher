export type MenuItem = {
  name: string
  description?: string
  price: string
  likes: number
  category: string
}

export const STARTERS: MenuItem[] = [
  {
    name: "Bone Marrow",
    description: "Roasted split bones, gremolata, grilled sourdough",
    price: "18",
    likes: 47,
    category: "Starters",
  },
  {
    name: "Beef Tartare",
    description: "Hand-cut tenderloin, cured egg yolk, capers, mustard seed",
    price: "22",
    likes: 31,
    category: "Starters",
  },
  {
    name: "Charred Octopus",
    description: "Romesco, fingerling potatoes, chorizo vinaigrette",
    price: "24",
    likes: 58,
    category: "Starters",
  },
  {
    name: "Burrata",
    description: "Heirloom tomato, basil oil, aged balsamic, grilled bread",
    price: "16",
    likes: 42,
    category: "Starters",
  },
  {
    name: "Oysters on the Half Shell",
    description: "Half dozen, mignonette, cocktail sauce, fresh horseradish",
    price: "21",
    likes: 36,
    category: "Starters",
  },
]

export const MAINS: MenuItem[] = [
  {
    name: "Bone-In Ribeye",
    description: "Dry-aged 45 days, roasted marrow butter",
    price: "68",
    likes: 124,
    category: "Entrées",
  },
  {
    name: "Braised Short Rib",
    description: "Red wine reduction, root vegetables, horseradish gremolata",
    price: "42",
    likes: 89,
    category: "Entrées",
  },
  {
    name: "Pan-Seared Duck Breast",
    description: "Cherry gastrique, wild rice, charred broccolini",
    price: "38",
    likes: 73,
    category: "Entrées",
  },
  {
    name: "Grilled Lamb Chops",
    description: "Herb crust, mint chimichurri, fingerling potatoes",
    price: "54",
    likes: 96,
    category: "Entrées",
  },
  {
    name: "Berkshire Pork Chop",
    description: "Brined and grilled, apple mostarda, braised greens",
    price: "36",
    likes: 52,
    category: "Entrées",
  },
  {
    name: "Seared Scallops",
    description: "Cauliflower purée, brown butter, crispy capers, pancetta",
    price: "44",
    likes: 67,
    category: "Entrées",
  },
  {
    name: "Whole Branzino",
    description: "Wood-grilled, lemon, herbs, olive oil, roasted fennel",
    price: "40",
    likes: 44,
    category: "Entrées",
  },
]

export const SIDES: MenuItem[] = [
  { name: "Truffle Fries", price: "12", likes: 83, category: "Sides" },
  { name: "Creamed Spinach", price: "10", likes: 29, category: "Sides" },
  {
    name: "Roasted Bone Marrow Mashed Potatoes",
    price: "14",
    likes: 61,
    category: "Sides",
  },
  {
    name: "Charred Broccolini",
    price: "11",
    likes: 38,
    category: "Sides",
  },
  {
    name: "Brussels Sprouts",
    description: "Bacon, balsamic glaze",
    price: "12",
    likes: 55,
    category: "Sides",
  },
  {
    name: "Mac & Cheese",
    description: "Gruyère, white cheddar, breadcrumb crust",
    price: "13",
    likes: 71,
    category: "Sides",
  },
]

export const DESSERTS: MenuItem[] = [
  {
    name: "Bourbon Crème Brûlée",
    description: "Woodford Reserve custard, torched sugar, shortbread",
    price: "14",
    likes: 92,
    category: "Desserts",
  },
  {
    name: "Chocolate Torte",
    description: "Flourless, espresso crème, candied hazelnuts",
    price: "15",
    likes: 64,
    category: "Desserts",
  },
  {
    name: "Bread Pudding",
    description: "Brioche, salted caramel, vanilla bean ice cream",
    price: "13",
    likes: 48,
    category: "Desserts",
  },
]

export const ALL_FOOD = [...STARTERS, ...MAINS, ...SIDES, ...DESSERTS]
