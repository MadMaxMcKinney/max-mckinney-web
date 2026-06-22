import { MHeading01, MBodyXL } from "@/app/components/Typography";
import { getMarkdownBySlug, ProjectDir, getAllPersonalProjects } from "@/app/fetchers";
import PersonalProjectLinkButton from "@components/Buttons/PersonalProjectLinkButton";
import PersonalProjectLinkSourceButton from "@components/Buttons/PersonalProjectLinkSourceButton";
import { Metadata } from "next";
import { PersonalProject } from "@/types";
import { FadeIn } from "@/app/components/Anim";
import BreadcrumbReturn from "@/app/components/BreadcrumbReturn";

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
                {/* <FadeIn duration={1} className="mt-32 sm:mt-56 mb-6 flex flex-col items-start">
                    <BreadcrumbReturn href="/personal/" location="Back to Personal/" />
                </FadeIn> */}

                <FadeIn dir="up" delay={0.1} duration={1} as="div" className="mt-32 sm:mt-56">
                    <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">{data.frontmatter.projectTypes.join(" · ")}</p>
                </FadeIn>

                <FadeIn dir="up" delay={0.2} duration={1} as="div">
                    <MHeading01 className="mb-6 text-white">{data.frontmatter.title}</MHeading01>
                </FadeIn>

                <FadeIn dir="up" delay={0.4} duration={1} as="div">
                    <MBodyXL className="text-zinc-400 mb-8 max-w-3xl">{data.frontmatter.description}</MBodyXL>
                </FadeIn>

                <FadeIn dir="up" delay={0.6} duration={1} className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    {data.frontmatter.projectLink && <PersonalProjectLinkButton href={data.frontmatter.projectLink} accent={data.frontmatter.accent} />}
                    {data.frontmatter.sourceLink && <PersonalProjectLinkSourceButton href={data.frontmatter.sourceLink} accent={data.frontmatter.accent} />}
                </FadeIn>

                <FadeIn dir="up" delay={1} duration={1.5} className="prose prose-lg prose-p:font-medium max-w-none text-zinc-300 mt-16 [&_img]:rounded-sm [&_p]:opacity-85">
                    {data.content}
                </FadeIn>
            </div>
        </>
    );
}
