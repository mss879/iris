import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Pages the client's reviews folded into Our Story or took out. Their old
    addresses land on Our Story, or on the section that replaced them.
    Temporary, so nothing is cached for good while the site is still in review.
  */
  async redirects() {
    return [
      { source: "/our-philosophy", destination: "/our-story", permanent: false },
      {
        source: "/consciously-irisandme",
        destination: "/our-story#consciously-irisandme",
        permanent: false,
      },
      { source: "/craftsmanship", destination: "/our-story", permanent: false },
      { source: "/our-fabrics", destination: "/our-story", permanent: false },
      { source: "/our-prints", destination: "/our-story", permanent: false },
    ];
  },
};

export default nextConfig;
