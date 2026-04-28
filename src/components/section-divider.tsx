/**
 * Ornamental rule divider — inward-pointing chevrons bookend a thin line
 * with graduating tick marks and a filled diamond at centre.
 * Inherits color from parent via currentColor; set text-amber on the wrapper.
 */
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none flex items-center justify-center py-6 text-amber ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 20"
        className="w-full max-w-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Left inward chevron ── */}
        <polyline
          points="4,4 12,10 4,16"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Left outer line ── */}
        <line
          x1="16" y1="10" x2="226" y2="10"
          stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22"
        />

        {/* Left tick marks — tall then short, increasing density toward centre */}
        <line x1="70"  y1="6.5" x2="70"  y2="13.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.28" />
        <line x1="130" y1="7.5" x2="130" y2="12.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
        <line x1="180" y1="7"   x2="180" y2="13"   stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"  />
        <line x1="210" y1="7.5" x2="210" y2="12.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />

        {/* ── Left accent ── */}
        <line
          x1="226" y1="10" x2="248" y2="10"
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"
        />

        {/* ── Centre diamond ── */}
        <path
          d="M 260 3.5 L 268.5 10 L 260 16.5 L 251.5 10 Z"
          fill="currentColor"
          fillOpacity="0.55"
        />

        {/* ── Right accent ── */}
        <line
          x1="272" y1="10" x2="294" y2="10"
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"
        />

        {/* ── Right outer line ── */}
        <line
          x1="294" y1="10" x2="504" y2="10"
          stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22"
        />

        {/* Right tick marks */}
        <line x1="310" y1="7.5" x2="310" y2="12.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
        <line x1="340" y1="7"   x2="340" y2="13"   stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"  />
        <line x1="390" y1="7.5" x2="390" y2="12.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
        <line x1="450" y1="6.5" x2="450" y2="13.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.28" />

        {/* ── Right inward chevron ── */}
        <polyline
          points="516,4 508,10 516,16"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
