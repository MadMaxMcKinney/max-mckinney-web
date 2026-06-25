import type { CollectionConfig } from "payload";

import { getServerSideURL } from "./getServerSideURL";

/** Responsive preview sizes shown in the admin Live Preview pane. */
const breakpoints = [
    { label: "Mobile", name: "mobile", width: 375, height: 667 },
    { label: "Tablet", name: "tablet", width: 768, height: 1024 },
    { label: "Desktop", name: "desktop", width: 1440, height: 900 },
];

type LivePreviewConfig = NonNullable<NonNullable<CollectionConfig["admin"]>["livePreview"]>;

/**
 * Live Preview config for a project collection. `pathPrefix` is the frontend
 * route segment (e.g. "work" → /work/[slug]). The preview pane points at the
 * real page; a slugless doc previews the index while it has no slug yet.
 */
export function projectLivePreview(pathPrefix: "work" | "personal"): LivePreviewConfig {
    return {
        url: ({ data }) => `${getServerSideURL()}/${pathPrefix}/${(data?.slug as string) ?? ""}`,
        breakpoints,
    };
}
