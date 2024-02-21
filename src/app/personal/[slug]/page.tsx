import Image from "next/image";
import { MHeading01, MBodyXL } from "@components/Typography";
import Pill from "@components/Pill";
import { getMarkdownBySlug, ProjectDir, PersonalProject } from "@/fetchers";
import useBase64Image from "@/hooks/useBase64Image";
import PersonalProjectLinkButton from "@components/Buttons/PersonalProjectLinkButton";
import PersonalProjectLinkSourceButton from "@components/Buttons/PersonalProjectLinkSourceButton";
import { Metadata } from "next";

interface TemplateProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: TemplateProps): Promise<Metadata> {
    const data = await getMarkdownBySlug<PersonalProject>(params.slug, ProjectDir.personal);
    return {
        title: data.frontmatter.title,
        description: data.frontmatter.description,
    };
}

export default async function ({ params }: TemplateProps) {
    const data = await getMarkdownBySlug<PersonalProject>(params.slug, ProjectDir.personal);
    const base64Icon = await useBase64Image(data.frontmatter.icon);

    return (
        <>
            <div className="page-grid">
                <Image
                    className="w-24 h-24 mb-6 mt-44 animate-fade-in-fast rounded-3xl"
                    width={96}
                    height={96}
                    src={data.frontmatter.icon}
                    alt=""
                    aria-hidden
                    placeholder="blur"
                    blurDataURL={base64Icon}
                    priority
                />
                <div className="flex flex-col-reverse gap-4 items-start animate-fade-in-fast mb-8 mt-2 md:mt-0 md:mb-4 md:gap-4 md:flex-row md:items-center">
                    <MHeading01 className="text-white">{data.frontmatter.title}</MHeading01>
                    <Pill type="themed" theme={data.frontmatter.accent} text={data.frontmatter.projectType} />
                </div>
                <MBodyXL className="text-zinc-400 mb-12 max-w-3xl animate-fade-in">{data.frontmatter.description}</MBodyXL>

                <div className="flex flex-wrap gap-4 justify-start animate-fade-in-very-slow">
                    {data.frontmatter.projectLink && <PersonalProjectLinkButton href={data.frontmatter.projectLink} accent={data.frontmatter.accent} />}
                    {data.frontmatter.sourceLink && <PersonalProjectLinkSourceButton href={data.frontmatter.sourceLink} accent={data.frontmatter.accent} />}
                </div>

                <div className="prose prose-lg max-w-none text-zinc-200 mt-16 animate-fade-in-very-slow [&_img]:rounded-sm [&_p]:opacity-85">{data.content}</div>
            </div>
        </>
    );
}