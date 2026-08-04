"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  function toggleSound() {
    const video = videoRef.current
    if (!video) throw new Error("Hero video is unavailable")

    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/butcher-video-optimized.mp4" type="video/mp4" />
        <track
          default
          kind="captions"
          src="/butcher-video-captions.vtt"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Turn on video sound" : "Mute video sound"}
        aria-pressed={!isMuted}
        title={isMuted ? "Turn on sound" : "Mute sound"}
        className="absolute right-4 bottom-4 z-20 grid size-11 place-items-center rounded-full border border-cream/50 bg-charcoal/60 text-cream shadow-lg backdrop-blur-sm transition-colors hover:border-cream hover:bg-charcoal/80 focus-visible:ring-2 focus-visible:ring-amber focus-visible:outline-none md:right-6 md:bottom-6"
      >
        {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
      </button>
    </>
  )
}
