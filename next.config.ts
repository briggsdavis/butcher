import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  // NOTE: experimental.inlineCss was tried here to remove render-blocking CSS,
  // but it triggers a Turbopack "module factory is not available" crash on the
  // server-rendered menu pages (/food, /beverages, /spirits) — a known
  // limitation of the experimental flag. Eliminating the origin-wide layout
  // shift on those pages (by server-rendering their content) matters far more
  // than inlining the stylesheet, so inlineCss stays off.
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
