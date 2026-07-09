import Image from "next/image"

/**
 * Ornamental rule divider — the "flair" flourish shown twice: once as-is on the
 * left half and once mirrored on the right half, so the two bushy ends meet in
 * the centre and the tips taper out toward the edges.
 */
export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none flex items-center justify-center py-6 ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-full max-w-lg items-center">
        <Image src="/flair.png" alt="" width={1600} height={181} className="h-auto w-1/2" />
        <Image
          src="/flair.png"
          alt=""
          width={1600}
          height={181}
          className="h-auto w-1/2 scale-x-[-1]"
        />
      </div>
    </div>
  )
}
