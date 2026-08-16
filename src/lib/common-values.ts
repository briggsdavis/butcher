export type CommonValueField = {
  key: string
  label: string
  defaultValue: string
  kind: "text" | "textarea"
  help?: string
}

export type CommonValueSection = {
  title: string
  fields: CommonValueField[]
}

export type StoredCommonValues = {
  fields?: Record<string, string> | null
} | null

export const COMMON_VALUE_SECTIONS: CommonValueSection[] = [
  {
    title: "Business",
    fields: [
      {
        kind: "text",
        key: "business.name",
        label: "Business name",
        defaultValue: "Butcher and the Rye",
      },
      {
        kind: "text",
        key: "reservation.href",
        label: "Reservation link",
        defaultValue: "https://www.opentable.com/r/butcher-and-the-rye-pittsburgh",
      },
      {
        kind: "text",
        key: "events.href",
        label: "Event inquiry link",
        defaultValue: "https://richarddeshantzrestaurantgroup.tripleseat.com/party_request/36628",
      },
    ],
  },
  {
    title: "Contact",
    fields: [
      { kind: "text", key: "phone.display", label: "Phone", defaultValue: "(412) 391-2752" },
      {
        kind: "text",
        key: "email.display",
        label: "Email",
        defaultValue: "info@richardeshantz.com",
      },
    ],
  },
  {
    title: "Location",
    fields: [
      {
        kind: "text",
        key: "address.line1",
        label: "Address line 1",
        defaultValue: "212 6th Street",
      },
      {
        kind: "text",
        key: "address.line2",
        label: "Address line 2",
        defaultValue: "Pittsburgh, PA 15222",
      },
      {
        kind: "text",
        key: "address.href",
        label: "Map link",
        defaultValue: "https://maps.google.com/?q=212+6th+Street+Pittsburgh+PA+15222",
      },
    ],
  },
  {
    title: "Hours",
    fields: [
      { kind: "text", key: "hours.days", label: "Days", defaultValue: "Wed - Sat" },
      { kind: "text", key: "hours.time", label: "Time", defaultValue: "5pm - 10pm" },
      { kind: "textarea", key: "hours.note", label: "Hours note", defaultValue: "" },
    ],
  },
  {
    title: "Social",
    fields: [
      {
        kind: "text",
        key: "instagram.href",
        label: "Instagram link",
        defaultValue: "https://www.instagram.com/butcherandtheryepgh",
      },
      {
        kind: "text",
        key: "facebook.href",
        label: "Facebook link",
        defaultValue: "https://www.facebook.com/butcherandtherye",
      },
    ],
  },
]

export function getCommonValueFields() {
  return COMMON_VALUE_SECTIONS.flatMap((section) => section.fields)
}

export function getDefaultCommonValues() {
  return Object.fromEntries(getCommonValueFields().map((field) => [field.key, field.defaultValue]))
}

export function resolveCommonValues(storedValues: StoredCommonValues | undefined) {
  return {
    ...getDefaultCommonValues(),
    ...storedValues?.fields,
  }
}

export function getCommonAddressDisplay(values: Record<string, string>) {
  return [values["address.line1"], values["address.line2"]].filter(Boolean).join(", ")
}

export function getCommonEmailHref(values: Record<string, string>) {
  return `mailto:${values["email.display"].trim()}`
}

export function getCommonPhoneHref(values: Record<string, string>) {
  const phone = values["phone.display"].trim()
  if (phone.startsWith("+")) return `tel:+${phone.slice(1).replace(/\D/g, "")}`

  const digits = phone.replace(/\D/g, "")
  if (digits.length === 10) return `tel:+1${digits}`
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`
  return `tel:${digits}`
}
