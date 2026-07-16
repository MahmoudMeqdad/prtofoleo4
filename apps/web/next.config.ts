import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone is for Docker/local; Vercel uses its own output pipeline.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
