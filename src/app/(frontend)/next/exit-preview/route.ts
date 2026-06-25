import { draftMode } from "next/headers";

/** Turns off Draft Mode so the browser goes back to seeing published content. */
export async function GET(): Promise<Response> {
    const draft = await draftMode();
    draft.disable();
    return new Response("Draft mode disabled. You are now viewing published content.");
}
