/**
 * Absolute origin of this app, used for Payload Live Preview iframe URLs.
 * Prefers an explicit env var, then the Vercel-provided production URL, and
 * falls back to localhost for `pnpm dev`.
 */
export function getServerSideURL(): string {
    if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL;
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    return "http://localhost:3000";
}
