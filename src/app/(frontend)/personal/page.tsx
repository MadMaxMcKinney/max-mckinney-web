import { MBodyXL, MHeading02 } from "@/app/components/Typography";
import PersonalGrid, { PersonalGridProject } from "./PersonalGrid";
import { getAllPersonalProjects, mediaURL } from "@/app/fetchers";
import { Metadata } from "next";
import { FadeIn } from "@/app/components/Anim";

export const metadata: Metadata = {
    title: "Personal",
    description: "Designing and engineering, specifically around web technologies, native applications, and educational content, are my passion.",
};

export default async function () {
    const all = await getAllPersonalProjects();

    // Show every project inline, sorted by date.
    const projects: PersonalGridProject[] = all.map((p) => ({
        slug: p.slug,
        title: p.title,
        icon: mediaURL(p.icon) ?? "",
        media: mediaURL(p.cardMedia) ?? mediaURL(p.ogImage),
        poster: mediaURL(p.ogImage),
        aspect: (p.cardAspect as "16/9" | "9/16") ?? "16/9",
        accent: p.accent,
        projectTypes: p.projectTypes,
        href: `/personal/${p.slug}`,
    }));

    return (
        <div className="page-grid page-grid-xl">
            <FadeIn dir="up" duration={1} as="div">
                <MHeading02 className="mb-6 mt-32 sm:mt-56 text-white">i find myself constantly building.</MHeading02>
            </FadeIn>
            {/* 
            <FadeIn dir="up" delay={0.2} duration={1} as="div">
                <MBodyXL className="mb-8 text-zinc-400 max-w-3xl">I find myself constantly building.</MBodyXL>
            </FadeIn> */}

            <FadeIn dir="up" delay={0.2} duration={1} as="div">
                <MBodyXL className="mb-8 text-zinc-400 max-w-3xl">
                    Designing and engineering, specifically around web technologies, native applications, and educational content, are my passion. I try to make time to tinker and build in this space
                    outside of my career and other responsibilities (cars).
                </MBodyXL>
            </FadeIn>

            <PersonalGrid projects={projects} className="mt-12 sm:mt-24" />
        </div>
    );
}
