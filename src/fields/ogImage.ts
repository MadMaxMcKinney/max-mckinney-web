import type { UploadField } from "payload";

/**
 * The shared "Open Graph image" upload field. Used by the SiteSettings global
 * (site-wide default) and per-project SEO tabs (override). The frontend reads
 * `ogImage` and falls back appropriately when it's empty.
 */
export const ogImageField = (description: string): UploadField => ({
    name: "ogImage",
    type: "upload",
    relationTo: "media",
    label: "Open Graph image",
    admin: { description },
});
