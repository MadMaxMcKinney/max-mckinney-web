import { MHeading01, MBodyXL } from "@components/Typography";
import PersonalProjectCard from "@components/Cards/PersonalProjectCard";
import Image from "next/image";
import { MHeading03, MBody } from "@components/Typography";
import Pill from "@components/Pill";
import { getAllPersonalProjects } from "@/fetchers";
import { Metadata } from "next";
import useBase64Image from "@/hooks/useBase64Image";

export const metadata: Metadata = {
    title: "Personal",
    description:
        "These are some of my personal projects. I dabble in a lot, but primarily in web tech, native apps, and educational design content. There’s probably something here to catch your interest.",
};

export default async function () {
    const personalProjects = await getAllPersonalProjects();

    return (
        <div className="page-grid">
            <MHeading01 className="mb-6 mt-32 sm:mt-56 animate-fade-in-fast text-white">hello.</MHeading01>

            <MBodyXL className="mb-8 text-zinc-400 max-w-3xl animate-fade-in">These are some of my personal projects.</MBodyXL>

            <MBodyXL className="mb-8 text-zinc-400 max-w-3xl animate-fade-in-slow">
                I dabble in a lot, but primarily in web tech, native apps, and educational design content. There’s probably something here to catch your interest.
            </MBodyXL>

            <div id="SideProjectGrid" className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 sm:gap-8 md:gap-14 sm:mt-24 animate-fade-in-slow">
                {personalProjects &&
                    personalProjects.map((project, index) => {
                        return (
                            <PersonalProjectCard href={"/personal/" + project.slug} accent={project.frontmatter.accent} key={project.frontmatter.title}>
                                <Image id="SideImage" className="w-24 h-24 rounded-3xl" width={96} height={96} src={project.frontmatter.icon} alt="" aria-hidden />
                                <div className="flex flex-col gap-2">
                                    <MHeading03>{project.frontmatter.title}</MHeading03>
                                    <MBody className="text-zinc-400 flex-1">{project.frontmatter.description}</MBody>
                                </div>
                                <div className="flex">
                                    <Pill type="themed" theme={project.frontmatter.accent} text={project.frontmatter.projectType} />
                                </div>
                            </PersonalProjectCard>
                        );
                    })}
            </div>
        </div>
    );
}
