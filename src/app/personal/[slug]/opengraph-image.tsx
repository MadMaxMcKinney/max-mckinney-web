import { ProjectDir, getMarkdownBySlug } from "@/app/fetchers";
import { PersonalProject } from "@/types";
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

function getAbsoluteURL(path: string) {
    const baseURL = headers().get("host");
    if (path.startsWith("/")) {
        return `https://${baseURL}${path}`;
    } else {
        return path;
    }
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const markdown = await getMarkdownBySlug<PersonalProject>(slug, ProjectDir.personal);
    return new ImageResponse(
        (
            // ImageResponse JSX element
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
                <img src={getAbsoluteURL(markdown.frontmatter.seoImage)} width={size.width} height={size.height} alt="Google logo" style={{ objectFit: "cover", objectPosition: "bottom" }} />
            </div>
        )
    );
}
