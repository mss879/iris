import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Craftsmanship, Our Fabrics and Our Prints were folded into Our Story at the
    client's first review. Their old addresses land on the matching part of it.
    Temporary, so nothing is cached for good while the site is still in review.
  */
  async redirects() {
    return [
      { source: "/craftsmanship", destination: "/our-story#craftsmanship", permanent: false },
      { source: "/our-fabrics", destination: "/our-story#fabric-selection", permanent: false },
      { source: "/our-prints", destination: "/our-story#design-process", permanent: false },
    ];
  },
};

export default nextConfig;
