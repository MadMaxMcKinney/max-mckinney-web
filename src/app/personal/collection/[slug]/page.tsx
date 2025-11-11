import Image from "next/image";
import { MHeading01, MBodyXL, MHeading03, MBody, MHeading06 } from "@/app/components/Typography";
import Pill from "@/app/components/Pill";
import { getMarkdownBySlug, ProjectDir, getAllPersonalProjects, getAllPersonalProjectsInFolder } from "@/app/fetchers";
import PersonalProjectCard from "@/app/components/Cards/PersonalProjectCard";
import { Metadata } from "next";
import { PersonalProject } from "@/types";
import { PiArrowLeft } from "react-icons/pi";
import Link from "next/link";

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
                <div className="mt-32 sm:mt-56 flex flex-col items-start">
                    <Link href="/personal">
                        <MHeading06 className={`grid grid-flow-col gap-1 mb-6 text-sm font-bold text-zinc-400 place-items-center transition-all group hover:opacity-70`}>
                            <PiArrowLeft className="w-4 h-4 mr-2 transform translate-y-px group-hover:animate-pulse-right"></PiArrowLeft> Personal
                        </MHeading06>
                    </Link>
                    <MHeading01 className="mb-6 text-white">{folder.title}</MHeading01>

                    <MBodyXL className="mb-8 text-zinc-400 max-w-3xl">{folder.description}</MBodyXL>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 sm:gap-8 md:gap-14 sm:mt-24">
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
                </div>
            </div>
        </>
    );
}
