import { getPersonalProjectBySlug, mediaURL } from "@/app/fetchers";
import { ImageResponse } from "next/og";
import { headers } from "next/headers";

// Route segment config
export const runtime = "nodejs";

export const size = {
    width: 1200,
    height: 630,
};

// Image metadata
export const contentType = "image/png";

function getAbsoluteURL(path: string, baseURL: string | null) {
    if (path.startsWith("/")) {
        return `https://${baseURL}${path}`;
    }
    return path;
}

// Image generation
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const baseURL = (await headers()).get("host");
    const project = await getPersonalProjectBySlug(slug);
    const seo = mediaURL(project?.seoImage) ?? "";
    return new ImageResponse(
        (
            <div
                style={{
                    background: "black",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getAbsoluteURL(seo, baseURL)} width={size.width} height={size.height} alt={project?.title ?? ""} style={{ objectFit: "cover", objectPosition: "bottom" }} />
            </div>
        )
    );
}
