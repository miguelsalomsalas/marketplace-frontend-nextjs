import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Bundled placeholder photos (real cars, tagged by body type) used only when API_URL is not set.
      { protocol: "https", hostname: "loremflickr.com" },
      // Add the NestJS backend / CDN host(s) that will serve real listing photos, e.g.:
      // { protocol: "https", hostname: "cdn.marketplace.com" },
    ],
  },
};

export default nextConfig;
