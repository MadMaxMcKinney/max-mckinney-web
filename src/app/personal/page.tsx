import { MHeading01, MBodyXL } from "@/app/components/Typography";
import PersonalProjectCard from "@/app/components/Cards/PersonalProjectCard";
import Image from "next/image";
import { MHeading03, MBody } from "@/app/components/Typography";
import Pill from "@/app/components/Pill";
import { getAllPersonalProjects } from "@/app/fetchers";
import { Metadata } from "next";
import { FadeIn, StaggeredFadeIn } from "@/app/components/Anim";

export const metadata: Metadata = {
    title: "Personal",
    description:
        "These are some of my personal projects. I dabble in a lot, but primarily in web tech, native apps, and educational design content. There’s probably something here to catch your interest.",
};

export default async function () {
    const personalProjects = await getAllPersonalProjects();

    return (
        <div className="page-grid">
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

            <StaggeredFadeIn stagger={0.1} delay={0.9} duration={1} className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 sm:gap-8 md:gap-14 sm:mt-24">
                {personalProjects &&
                    personalProjects.map((project) => {
                        if (!(project.frontmatter.folder || project.frontmatter.folderFor)) {
                            return (
                                <PersonalProjectCard href={"/personal/" + project.slug} accent={project.frontmatter.accent} key={project.frontmatter.title}>
                                    <Image id="SideImage" className="w-24 h-24 rounded-3xl" width={96} height={96} src={project.frontmatter.icon} alt="" aria-hidden />
                                    <div className="flex flex-col gap-2">
                                        <MHeading03>{project.frontmatter.title}</MHeading03>
                                        <MBody className="text-zinc-400 flex-1">{project.frontmatter.description}</MBody>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.frontmatter.projectTypes.map((type) => (
                                            <Pill key={type} type="themed" theme={project.frontmatter.accent} text={type} />
                                        ))}
                                    </div>
                                </PersonalProjectCard>
                            );
                        } else if (project.frontmatter.folderFor) {
                            return (
                                <PersonalProjectCard href={`/personal/collection/${project.frontmatter.folderFor}/`} accent={project.frontmatter.accent} key={project.frontmatter.title} isFolder>
                                    <Image id="SideImage" className="w-24 h-24 rounded-3xl" width={96} height={96} src={project.frontmatter.icon} alt="" aria-hidden />
                                    <div className="flex flex-col gap-2">
                                        <MHeading03>{project.frontmatter.title}</MHeading03>
                                        <MBody className="text-zinc-400 flex-1">{project.frontmatter.description}</MBody>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.frontmatter.projectTypes.map((type) => (
                                            <Pill key={type} type="themed" theme={project.frontmatter.accent} text={type} />
                                        ))}
                                    </div>
                                </PersonalProjectCard>
                            );
                        }
                    })}
            </StaggeredFadeIn>
        </div>
    );
}
