import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    // URLs from the previous version of the site, so old links still land somewhere.
    return [
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/experience/:id", destination: "/#experience", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/projects/:path*", destination: "/#projects", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
