import Image from "next/image";
import { MHeading01, MBodyXL, MHeading03, MBody, MHeading06 } from "@/app/components/Typography";
import Pill from "@/app/components/Pill";
import { getMarkdownBySlug, ProjectDir, getAllPersonalProjects, getAllPersonalProjectsInFolder } from "@/app/fetchers";
import PersonalProjectCard from "@/app/components/Cards/PersonalProjectCard";
import { Metadata } from "next";
import { PersonalProject } from "@/types";
import { PiArrowLeft } from "react-icons/pi";
import Link from "next/link";
import { FadeIn } from "@/app/components/Anim";
import BreadcrumbReturn from "@/app/components/BreadcrumbReturn";

interface TemplateProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const data = await getAllPersonalProjects({ includeProjects: false });
    return data.map((project) => ({
        params: {
            slug: project.slug,
        },
    }));
}

export async function generateMetadata({ params }: TemplateProps): Promise<Metadata> {
    const { slug } = params;
    const data = await getMarkdownBySlug<PersonalProject>("folder-" + slug, ProjectDir.personal);
    return {
        title: data.frontmatter.title,
        description: data.frontmatter.description,
    };
}

export default async function ({ params }: TemplateProps) {
    const { slug } = params;
    const folder = (await getMarkdownBySlug<PersonalProject>("folder-" + slug, ProjectDir.personal)).frontmatter;
    const projectsInFolder = await getAllPersonalProjectsInFolder(slug);

    return (
        <>
            <div className="page-grid">
                <FadeIn duration={1} className="mt-32 sm:mt-56 flex flex-col items-start">
                    <BreadcrumbReturn href="/personal/" location="Back to Personal/" />
                </FadeIn>

                <FadeIn dir="up" delay={0.3} duration={1} as="div">
                    <MHeading01 className="mb-6 text-white">{folder.title}</MHeading01>
                </FadeIn>

                <FadeIn dir="up" delay={0.6} duration={1} as="div">
                    <MBodyXL className="mb-8 text-zinc-400 max-w-3xl">{folder.description}</MBodyXL>
                </FadeIn>

                <FadeIn dir="up" delay={0.9} duration={1} className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 sm:gap-8 md:gap-14 sm:mt-24">
                    {projectsInFolder &&
                        projectsInFolder.map((project) => {
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
                        })}
                </FadeIn>
            </div>
        </>
    );
}
