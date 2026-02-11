import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/mta_ace_dashboard",
  assetPrefix: "/mta_ace_dashboard/",
  images: {
    unoptimized: true,
  },
};


module.exports = nextConfig;
