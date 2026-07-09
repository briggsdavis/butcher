"use client"

import { ArrowRight, CalendarDays, Clock3, UsersRound } from "lucide-react"
import type { FormEvent } from "react"

const BOOKING_URL = "https://www.opentable.com/booking/restref/availability"
const RESTAURANT_ID = "104590"
const RESTAURANT_TIME_ZONE = "America/New_York"
const FIRST_RESERVATION_MINUTE = 17 * 60
const LAST_RESERVATION_MINUTE = 23 * 60 + 30

const PARTY_SIZE_OPTIONS = Array.from({ length: 20 }, (_, index) => index + 1)
const TIME_OPTIONS = Array.from({ length: 14 }, (_, index) => {
  const minutes = FIRST_RESERVATION_MINUTE + index * 30
  const hour = Math.floor(minutes / 60)
  const minute = minutes % 60

  return {
    label: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(2000, 0, 1, hour, minute))),
    value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  }
})

export function OpenTableWidget() {
  const now = new Date()
  const today = getRestaurantDate(now)
  const defaultTime = getDefaultTime(now)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const partySize = requireFormValue(data, "partySize")
    const date = requireFormValue(data, "date")
    const time = requireFormValue(data, "time")
    const destination = new URL(BOOKING_URL)

    destination.searchParams.set("rid", RESTAURANT_ID)
    destination.searchParams.set("partySize", partySize)
    destination.searchParams.set("dateTime", `${date}T${time}`)
    window.open(destination.href, "_blank", "noopener,noreferrer")
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px w-10 bg-amber/40" />
        <h2 id="reservation-form-heading" className="font-display text-2xl text-cream uppercase">
          Find a table
        </h2>
        <span className="h-px flex-1 bg-amber/20" />
      </div>

      <form
        aria-labelledby="reservation-form-heading"
        onSubmit={onSubmit}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <label className="flex min-h-16 items-center gap-3 border border-amber/30 bg-charcoal/50 px-4 transition-colors focus-within:border-amber">
          <UsersRound aria-hidden="true" className="size-5 shrink-0 text-amber" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-tan/60 uppercase">Party size</span>
            <select
              name="partySize"
              defaultValue="2"
              aria-label="Party size"
              className="mt-1 w-full bg-transparent text-sm text-cream outline-none"
            >
              {PARTY_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size} className="bg-charcoal">
                  {size} {size === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex min-h-16 items-center gap-3 border border-amber/30 bg-charcoal/50 px-4 transition-colors focus-within:border-amber">
          <CalendarDays aria-hidden="true" className="size-5 shrink-0 text-amber" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-tan/60 uppercase">Date</span>
            <input
              name="date"
              type="date"
              required
              min={today}
              defaultValue={today}
              aria-label="Reservation date"
              className="mt-1 w-full bg-transparent text-sm text-cream scheme-dark outline-none"
            />
          </span>
        </label>

        <label className="flex min-h-16 items-center gap-3 border border-amber/30 bg-charcoal/50 px-4 transition-colors focus-within:border-amber">
          <Clock3 aria-hidden="true" className="size-5 shrink-0 text-amber" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-tan/60 uppercase">Time</span>
            <select
              name="time"
              defaultValue={defaultTime}
              aria-label="Reservation time"
              className="mt-1 w-full bg-transparent text-sm text-cream outline-none"
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time.value} value={time.value} className="bg-charcoal">
                  {time.label}
                </option>
              ))}
            </select>
          </span>
        </label>

        <button
          type="submit"
          className="btn-plaque flex min-h-16 items-center justify-center gap-3 px-8 font-display text-sm uppercase"
        >
          Find a table
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </form>
    </div>
  )
}

function getRestaurantDate(date: Date) {
  const parts = getRestaurantDateTimeParts(date, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return `${requireDatePart(parts, "year")}-${requireDatePart(parts, "month")}-${requireDatePart(parts, "day")}`
}

function getDefaultTime(date: Date) {
  const parts = getRestaurantDateTimeParts(date, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
  const hour = Number(requireDatePart(parts, "hour"))
  const minute = Number(requireDatePart(parts, "minute"))
  const roundedMinute = Math.ceil((hour * 60 + minute) / 30) * 30
  const reservationMinute = Math.min(
    Math.max(roundedMinute, FIRST_RESERVATION_MINUTE),
    LAST_RESERVATION_MINUTE,
  )

  return `${String(Math.floor(reservationMinute / 60)).padStart(2, "0")}:${String(reservationMinute % 60).padStart(2, "0")}`
}

function getRestaurantDateTimeParts(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: RESTAURANT_TIME_ZONE,
  }).formatToParts(date)
}

function requireDatePart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  const part = parts.find((candidate) => candidate.type === type)
  if (!part) throw new Error(`Missing ${type} from restaurant date`)
  return part.value
}

function requireFormValue(data: FormData, name: string) {
  const value = data.get(name)
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing reservation form value: ${name}`)
  }
  return value
}
