import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
    slug: "media",
    admin: {
        useAsTitle: "filename",
    },
    access: {
        read: () => true,
    },
    upload: {
        // Storage is handled by the Vercel Blob adapter (see payload.config.ts);
        // originals are served from Blob and optimized on the frontend via next/image,
        // so we don't pre-generate Payload image sizes here.
        mimeTypes: ["image/*", "video/*"],
    },
    fields: [
        {
            name: "alt",
            type: "text",
            admin: {
                description: "Alternative text for accessibility and SEO.",
            },
        },
    ],
};
