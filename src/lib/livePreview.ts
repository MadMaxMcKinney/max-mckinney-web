import type { CollectionConfig } from "payload";

import { getServerSideURL } from "./getServerSideURL";

/** Responsive preview sizes shown in the admin Live Preview pane. */
const breakpoints = [
    { label: "Mobile", name: "mobile", width: 375, height: 667 },
    { label: "Tablet", name: "tablet", width: 768, height: 1024 },
    { label: "Desktop", name: "desktop", width: 1440, height: 900 },
];

type Prefix = "work" | "personal";

/**
 * Build a URL to the draft-preview route, which enables Next.js Draft Mode for
 * the authenticated editor and redirects to the real page so the preview renders
 * unpublished content. Falls back to the index path while a doc has no slug yet.
 */
function previewURL(prefix: Prefix, collection: string, slug: string | undefined): string {
    const path = `/${prefix}/${slug ?? ""}`;
    const params = new URLSearchParams({ path, collection, slug: slug ?? "" });
    return `${getServerSideURL()}/next/preview?${params.toString()}`;
}

type ProjectAdmin = Pick<NonNullable<CollectionConfig["admin"]>, "livePreview" | "preview">;

/**
 * Live Preview + static "Preview" button config for a project collection.
 * `prefix` is the frontend route segment (e.g. "work" → /work/[slug]).
 */
export function projectPreview(prefix: Prefix, collection: string): ProjectAdmin {
    return {
        livePreview: {
            url: ({ data }) => previewURL(prefix, collection, data?.slug as string | undefined),
            breakpoints,
        },
        preview: (data) => previewURL(prefix, collection, data?.slug as string | undefined),
    };
}
