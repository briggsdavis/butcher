const SITE_URL = "https://butcherandtherye.com"

export const RESTAURANT_FACTS = {
  siteUrl: SITE_URL,
  guideUrl: `${SITE_URL}/butcher-and-the-rye-guide`,
  name: "Butcher and the Rye",
  alternateName: "Butcher & the Rye",
  description:
    "Butcher and the Rye is a dinner restaurant and whiskey bar in Downtown Pittsburgh's Cultural District, known for rustic American cooking, dry-aged meats, craft cocktails, and a 600-plus-bottle whiskey program.",
  foundingYear: "2013",
  neighborhood: "Downtown Pittsburgh Cultural District",
  cuisine: ["American", "Rustic American", "Rustic Americana"],
  image: `${SITE_URL}/warm-dining-room.jpg`,
  menuUrls: {
    food: `${SITE_URL}/food`,
    beverages: `${SITE_URL}/beverages`,
  },
  nearbyLandmarks: ["Heinz Hall", "Benedum Center", "PPG Paints Arena"],
  award:
    "James Beard Foundation Award nominee for Outstanding Bar Program; the first Pittsburgh bar nominated in that category",
} as const

type CommonValues = Record<string, string>

function getOpeningHoursSpecification(common: CommonValues) {
  if (
    common["hours.days"].trim().toLowerCase() !== "wed - sat" ||
    common["hours.time"].trim().toLowerCase() !== "5pm - 10pm"
  ) {
    return undefined
  }

  return ["Wednesday", "Thursday", "Friday", "Saturday"].map((dayOfWeek) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek,
    opens: "17:00",
    closes: "22:00",
  }))
}

export function createRestaurantJsonLd(common: CommonValues) {
  const sameAs = [common["instagram.href"], common["facebook.href"]].filter(Boolean)
  const openingHoursSpecification = getOpeningHoursSpecification(common)

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${RESTAURANT_FACTS.siteUrl}/#restaurant`,
    name: common["business.name"],
    alternateName: RESTAURANT_FACTS.alternateName,
    description: RESTAURANT_FACTS.description,
    url: RESTAURANT_FACTS.siteUrl,
    mainEntityOfPage: RESTAURANT_FACTS.guideUrl,
    foundingDate: RESTAURANT_FACTS.foundingYear,
    image: RESTAURANT_FACTS.image,
    telephone: common["phone.display"],
    email: common["email.display"],
    address: {
      "@type": "PostalAddress",
      streetAddress: common["address.line1"],
      addressLocality: "Pittsburgh",
      addressRegion: "PA",
      postalCode: "15222",
      addressCountry: "US",
    },
    servesCuisine: [...RESTAURANT_FACTS.cuisine],
    openingHoursSpecification,
    acceptsReservations: true,
    hasMenu: [
      {
        "@type": "Menu",
        name: "Food Menu",
        url: RESTAURANT_FACTS.menuUrls.food,
      },
      {
        "@type": "Menu",
        name: "Beverage Menu",
        url: RESTAURANT_FACTS.menuUrls.beverages,
      },
    ],
    sameAs,
    award: RESTAURANT_FACTS.award,
    parentOrganization: {
      "@type": "Organization",
      name: "Richard DeShantz Restaurant Group",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: common["reservation.href"],
    },
  }
}
