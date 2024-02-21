// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { remotePatterns: [{ hostname: "*" }] },
};

export default withPlaiceholder(nextConfig);
