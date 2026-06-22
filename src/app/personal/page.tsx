import { MHeading01, MBodyXL } from "@/app/components/Typography";
import PersonalGrid, { PersonalGridProject } from "./PersonalGrid";
import { getAllPersonalProjects } from "@/app/fetchers";
import { Metadata } from "next";
import { FadeIn } from "@/app/components/Anim";

export const metadata: Metadata = {
    title: "Personal",
    description:
        "These are some of my personal projects. I dabble in a lot, but primarily in web tech, native apps, and educational design content. There’s probably something here to catch your interest.",
};

export default async function () {
    const all = await getAllPersonalProjects();

    // Show every project inline, sorted by date. Collection members blend in with the
    // rest; the collection entry pages themselves (folderFor) are skipped.
    const projects: PersonalGridProject[] = all
        .filter((p) => !p.frontmatter.folderFor)
        .map((p) => {
            const fm = p.frontmatter as any;
            return {
                slug: p.slug,
                title: fm.title,
                icon: fm.icon,
                media: fm.cardMedia ?? fm.seoImage ?? null,
                poster: fm.seoImage ?? null,
                aspect: (fm.cardAspect as "16/9" | "9/16") ?? "16/9",
                accent: fm.accent,
                projectTypes: fm.projectTypes,
                href: `/personal/${p.slug}`,
            };
        });

    return (
        <div className="page-grid page-grid-lg">
            <FadeIn dir="up" duration={1} as="div">
                <MHeading01 className="mb-6 mt-32 sm:mt-56 text-white">hello.</MHeading01>
            </FadeIn>

            <FadeIn dir="up" delay={0.2} duration={1} as="div">
                <MBodyXL className="mb-8 text-zinc-400 max-w-3xl">These are some of my personal projects.</MBodyXL>
            </FadeIn>

            <FadeIn dir="up" delay={0.4} duration={1} as="div">
                <MBodyXL className="mb-8 text-zinc-400 max-w-3xl">
                    I dabble in a lot, but primarily in web tech, native apps, and educational design content. There's probably something here to catch your interest.
                </MBodyXL>
            </FadeIn>

            <PersonalGrid projects={projects} className="mt-12 sm:mt-24" />
        </div>
    );
}
