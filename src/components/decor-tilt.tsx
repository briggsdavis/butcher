import Image from "next/image"

type DecorTiltProps = {
  src: string
  width: number
  height: number
  /** Positioning + responsive sizing utilities for the wrapper. */
  className?: string
  /** Sizing utilities for the image itself (e.g. h-[220px] w-auto md:h-[300px]). */
  imgClassName?: string
  /** Resting rotation, in degrees, before any cursor lean is applied. */
  baseRotate?: number
  /** Maximum extra rotation, in degrees, as the cursor sweeps across the page. */
  tiltMax?: number
}

/**
 * A purely decorative illustration that leans toward the cursor. PageEffects
 * reads the data-* attributes on mousemove and updates the rotation; the
 * `.decor-tilt` class smooths it. The wrapper is aria-hidden and ignores
 * pointer events so it never blocks the content beneath it.
 */
export function DecorTilt({
  src,
  width,
  height,
  className = "",
  imgClassName = "",
  baseRotate = 0,
  tiltMax = 14,
}: DecorTiltProps) {
  return (
    <div
      aria-hidden="true"
      data-cursor-tilt=""
      data-base-rotate={String(baseRotate)}
      data-tilt-max={String(tiltMax)}
      style={{ transform: `rotate(${baseRotate}deg)` }}
      className={`decor-tilt pointer-events-none absolute z-10 select-none ${className}`}
    >
      <Image src={src} alt="" width={width} height={height} className={imgClassName} />
    </div>
  )
}
