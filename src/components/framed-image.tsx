import Image from "next/image"

const FRAME_VARIANTS = {
  one: {
    src: "/frame/frame-one.png",
    width: 1558,
    height: 1959,
    imageInset: "14.9% 18.6% 14.3% 18%",
  },
  two: {
    src: "/frame/frame-two.png",
    width: 1652,
    height: 1924,
    imageInset: "12.1% 14.4% 12.4% 14.6%",
  },
  three: {
    src: "/frame/frame-three.png",
    width: 1579,
    height: 1996,
    imageInset: "11.8% 13.7% 12.5% 13%",
  },
  four: {
    src: "/frame/frame-four.png",
    width: 1208,
    height: 1662,
    imageInset: "7.7% 9.7% 7.6% 10.4%",
  },
} as const

export type FrameVariant = keyof typeof FRAME_VARIANTS

export function FramedImage({
  src,
  alt,
  variant,
  sizes,
  frameSizes = sizes,
  quality,
  className = "",
}: {
  src: string
  alt: string
  variant: FrameVariant
  sizes: string
  frameSizes?: string
  quality?: number
  className?: string
}) {
  const frame = FRAME_VARIANTS[variant]

  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
    >
      <div className="absolute overflow-hidden" style={{ inset: frame.imageInset }}>
        <Image src={src} alt={alt} fill quality={quality} sizes={sizes} className="object-cover" />
      </div>
      <Image
        src={frame.src}
        alt=""
        aria-hidden
        fill
        sizes={frameSizes}
        className="object-contain"
      />
    </div>
  )
}
