import { ProjectDir, getMarkdownBySlug } from "@/fetchers";
import { PersonalProject } from "@/types";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "node";

// Image metadata

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const markdown = await getMarkdownBySlug<PersonalProject>(slug, ProjectDir.personal);
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: "black",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img src={markdown.frontmatter.seoImage} alt="Google logo" />
            </div>
        )
    );
}
