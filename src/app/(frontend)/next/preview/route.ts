import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

const PREVIEWABLE = new Set(["work-projects", "personal-projects"]);

/**
 * Draft preview entrypoint. Payload's Live Preview / "Preview" button points the
 * iframe (and new tabs) here. We verify the request comes from a logged-in admin
 * (the admin panel forwards its auth cookie), enable Next.js Draft Mode, then
 * redirect to the real page — which now renders unpublished draft content.
 */
export async function GET(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    const collection = searchParams.get("collection");

    // Only allow internal, non-protocol-relative paths to avoid open redirects.
    if (!path || !path.startsWith("/") || path.startsWith("//")) {
        return new Response("Invalid preview path", { status: 400 });
    }
    if (!collection || !PREVIEWABLE.has(collection)) {
        return new Response("Invalid preview collection", { status: 400 });
    }

    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: req.headers });
    if (!user) {
        return new Response("You must be logged in to preview drafts", { status: 403 });
    }

    const draft = await draftMode();
    draft.enable();

    redirect(path);
}
