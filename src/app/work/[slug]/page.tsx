import Image from "next/image";
import { MHeading01, MBodyXL } from "@/app/components/Typography";
import { ProjectDir, getAllWorkProjects, getMarkdownBySlug } from "@/app/fetchers";
import { WorkProject } from "@/types";
import { Metadata } from "next";
import { FadeIn } from "@/app/components/Anim";

interface TemplateProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const data = await getAllWorkProjects();
    return data.map((project) => ({
        params: {
            slug: project.slug,
        },
    }));
}

export async function generateMetadata({ params }: TemplateProps): Promise<Metadata> {
    const data = await getMarkdownBySlug<WorkProject>(params.slug, ProjectDir.work);
    return {
        title: data.frontmatter.title,
        description: data.frontmatter.projectBrief,
    };
}

export default async function Template({ params }: TemplateProps) {
    const data = await getMarkdownBySlug<WorkProject>(params.slug, ProjectDir.work);
    const fm = data.frontmatter;
    const meta = [fm.projectRole, fm.projectClient, fm.projectDate].filter(Boolean).join(" · ");

    return (
        <div className="page-grid">
            <FadeIn dir="up" delay={0.1} duration={1} as="div" className="mt-32 sm:mt-56">
                <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">{meta}</p>
            </FadeIn>

            <FadeIn dir="up" delay={0.2} duration={1} as="div">
                <MHeading01 className="mb-6 max-w-4xl text-white">{fm.title}</MHeading01>
            </FadeIn>

            <FadeIn dir="up" delay={0.4} duration={1} as="div">
                <MBodyXL className="mb-12 max-w-3xl text-zinc-400">{fm.projectShortBrief}</MBodyXL>
            </FadeIn>

            <FadeIn dir="up" delay={0.6} duration={1.2} as="div" className="mb-16">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#0c0c12]">
                    <Image src={fm.image} alt={fm.title} fill priority sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" />
                </div>
            </FadeIn>

            <FadeIn
                dir="up"
                delay={0.8}
                duration={1.2}
                className="prose prose-lg max-w-none text-zinc-300 prose-headings:font-medium prose-headings:text-white prose-p:text-zinc-300 prose-a:text-zinc-300 prose-ul:text-zinc-300 prose-li:my-1 [&_img]:rounded"
            >
                {data.content}
            </FadeIn>
        </div>
    );
}
