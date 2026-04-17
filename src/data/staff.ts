export type StaffMember = {
  name: string
  role: string
  quote: string
  years: string
  initials: string
  specialty: string
}

export const STAFF: StaffMember[] = [
  {
    name: "Marcus Chen",
    role: "Executive Chef",
    quote: "Every cut tells a story. We make sure it's a great one.",
    years: "12 years",
    initials: "MC",
    specialty: "Dry-aged beef & modern American cuisine",
  },
  {
    name: "Elena Vasquez",
    role: "Sous Chef",
    quote: "Precision and passion — you need both in equal measure.",
    years: "8 years",
    initials: "EV",
    specialty: "Braises & whole-animal butchery",
  },
  {
    name: "James O'Brien",
    role: "Head Butcher",
    quote: "I've spent my life learning the art of the cut.",
    years: "15 years",
    initials: "JO",
    specialty: "Prime and Wagyu beef selection",
  },
  {
    name: "Sophia Reeves",
    role: "Bar Director",
    quote: "A great cocktail starts long before it reaches the glass.",
    years: "10 years",
    initials: "SR",
    specialty: "Whiskey-forward cocktails & house infusions",
  },
  {
    name: "Dominic Rossi",
    role: "Wine & Spirits Director",
    quote: "The right pour can transform an entire evening.",
    years: "9 years",
    initials: "DR",
    specialty: "Old World wine & American single-malt",
  },
  {
    name: "Amara Washington",
    role: "General Manager",
    quote: "Hospitality isn't a job — it's a calling.",
    years: "11 years",
    initials: "AW",
    specialty: "Guest experience & team development",
  },
  {
    name: "Claire Fontaine",
    role: "Pastry Chef",
    quote: "Dessert should be the memory that lingers longest.",
    years: "7 years",
    initials: "CF",
    specialty: "Seasonal tarts, chocolate & house ice cream",
  },
  {
    name: "Theo Nakamura",
    role: "Head Server",
    quote: "Every table is someone's special night. We never forget that.",
    years: "6 years",
    initials: "TN",
    specialty: "Wine pairing & elevated front-of-house service",
  },
]
