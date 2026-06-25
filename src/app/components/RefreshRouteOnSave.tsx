"use client";

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

import { getServerSideURL } from "@/lib/getServerSideURL";

/**
 * Listens for Payload Live Preview save events (when this page is rendered inside
 * the admin preview iframe) and refreshes the route so the pane reflects the
 * saved content. Inert for normal visitors — it only reacts to the admin's
 * postMessage events.
 */
export default function RefreshRouteOnSave() {
    const router = useRouter();
    return <PayloadRefreshRouteOnSave refresh={() => router.refresh()} serverURL={getServerSideURL()} />;
}
