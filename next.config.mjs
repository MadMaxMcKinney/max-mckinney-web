/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Serve optimized images as WebP (this is also Next's default).
        formats: ["image/webp"],
        remotePatterns: [{ hostname: "*" }],
    },
};

export default nextConfig;
