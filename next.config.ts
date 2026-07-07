import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Inline the (small, atomic Tailwind) stylesheet into <head> as a <style>
  // tag instead of a render-blocking <link>. This removes the CSS request from
  // the critical path, which is the single biggest FCP/LCP win for first-time
  // mobile visitors on slow connections. Production-only.
  experimental: {
    inlineCss: true,
  },
  images: {
    // Next 16 requires an explicit qualities allowlist; anything not listed is
    // snapped to the nearest allowed value. Without this, our quality={30} /
    // quality={50} props were being silently served at the default 75, bloating
    // the watermark and nav-wood images. These values keep the requested
    // compression levels honoured.
    qualities: [30, 50, 60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "*.convex.cloud",
      },
    ],
  },
}

export default nextConfig
