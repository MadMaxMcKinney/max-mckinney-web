import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Serve optimized images as WebP (this is also Next's default).
        formats: ["image/webp"],
        // Scope the image optimizer to Vercel Blob only, so it can't be used
        // as an open proxy for arbitrary remote hosts.
        remotePatterns: [
            { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
            { protocol: "https", hostname: "maxmckinney.com" },
            { protocol: "https", hostname: "*.vercel.app" },
        ],
    },
};

export default withPayload(nextConfig);
