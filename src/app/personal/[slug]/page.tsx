import Image from "next/image";
import { MHeading01, MBodyXL } from "@/app/components/Typography";
import Pill from "@/app/components/Pill";
import { getMarkdownBySlug, ProjectDir, getAllPersonalProjects } from "@/app/fetchers";
import useBase64Image from "@/app/hooks/useBase64Image";
import PersonalProjectLinkButton from "@components/Buttons/PersonalProjectLinkButton";
import PersonalProjectLinkSourceButton from "@components/Buttons/PersonalProjectLinkSourceButton";
import { Metadata } from "next";
import { PersonalProject } from "@/types";
import { FadeIn } from "@/app/components/Anim";

interface TemplateProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const data = await getAllPersonalProjects({ includeFolders: false });
    return data.map((project) => ({
        params: {
            slug: project.slug,
        },
    }));
}

export async function generateMetadata({ params }: TemplateProps): Promise<Metadata> {
    const { slug } = params;
    const data = await getMarkdownBySlug<PersonalProject>(slug, ProjectDir.personal);
    return {
        title: data.frontmatter.title,
        description: data.frontmatter.description,
    };
}

export default async function ({ params }: TemplateProps) {
    const { slug } = params;
    const data = await getMarkdownBySlug<PersonalProject>(slug, ProjectDir.personal);
    return (
        <>
            <div className="page-grid">
                <FadeIn duration={1} as="div">
                    <Image className="w-24 h-24 mb-6 mt-44 rounded-3xl" width={96} height={96} src={data.frontmatter.icon} alt="" aria-hidden priority />
                </FadeIn>
                
                <FadeIn delay={0.3} duration={1} className="flex flex-col-reverse gap-4 items-start mb-8 mt-2 md:mt-0 md:mb-4 md:gap-4 md:flex-row md:items-center">
                    <MHeading01 className="text-white">{data.frontmatter.title}</MHeading01>
                    <div className="flex flex-wrap gap-2">
                        {data.frontmatter.projectTypes.map((type) => (
                            <Pill key={type} type="themed" theme={data.frontmatter.accent} text={type} />
                        ))}
                    </div>
                </FadeIn>
                
                <FadeIn delay={0.6} duration={1} as="div">
                    <MBodyXL className="text-zinc-400 mb-12 max-w-3xl">{data.frontmatter.description}</MBodyXL>
                </FadeIn>

                <FadeIn delay={0.9} duration={1} className="flex flex-wrap gap-4 justify-start">
                    {data.frontmatter.projectLink && (
                        <PersonalProjectLinkButton href={data.frontmatter.projectLink} accent={data.frontmatter.accent} accentForeground={data.frontmatter.accentForeground} />
                    )}
                    {data.frontmatter.sourceLink && <PersonalProjectLinkSourceButton href={data.frontmatter.sourceLink} accent={data.frontmatter.accent} />}
                </FadeIn>

                <FadeIn dir="up" delay={1.2} duration={1.5} className="prose prose-lg prose-p:font-medium max-w-none text-zinc-300 mt-16 [&_img]:rounded-sm [&_p]:opacity-85">{data.content}</FadeIn>
            </div>
        </>
    );
}
