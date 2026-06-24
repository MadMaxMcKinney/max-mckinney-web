import Image from "next/image";
import { MHeading01, MBodyXL } from "@/app/components/Typography";
import { ProjectDir, getAllWorkProjects, getMarkdownBySlug } from "@/app/fetchers";
import { WorkProject } from "@/types";
import { Metadata } from "next";
import { FadeIn } from "@/app/components/Anim";
import Label from "@/app/components/Label";

interface TemplateProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const data = await getAllWorkProjects();
    return data.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: TemplateProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await getMarkdownBySlug<WorkProject>(slug, ProjectDir.work);
    return {
        title: data.frontmatter.title,
        description: data.frontmatter.projectBrief,
    };
}

function ProjectDetail({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <Label as="span">{label}</Label>
            <span className="text-sm font-medium text-zinc-300">{value}</span>
        </div>
    );
}

export default async function Template({ params }: TemplateProps) {
    const { slug } = await params;
    const data = await getMarkdownBySlug<WorkProject>(slug, ProjectDir.work);
    const fm = data.frontmatter;

    return (
        <div className="page-grid">
            <FadeIn dir="up" delay={0.1} duration={1} as="div" className="mt-32 sm:mt-56">
                <Label className="mb-3">{fm.categories.join(" · ")}</Label>
            </FadeIn>

            <FadeIn dir="up" delay={0.2} duration={1} as="div">
                <MHeading01 className="mb-6 max-w-4xl text-white">{fm.title}</MHeading01>
            </FadeIn>

            <FadeIn dir="up" delay={0.4} duration={1} as="div">
                <MBodyXL className="mb-10 max-w-3xl text-zinc-400">{fm.projectShortBrief}</MBodyXL>
            </FadeIn>

            <FadeIn dir="up" delay={0.5} duration={1} as="div">
                <div className="mb-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-6">
                    <ProjectDetail label="Role" value={fm.projectRole} />
                    <ProjectDetail label="Client" value={fm.projectClient} />
                    {fm.projectAgency && <ProjectDetail label="Agency" value={fm.projectAgency} />}
                    <ProjectDetail label="Timeline" value={fm.projectDate} />
                </div>
            </FadeIn>

            {/* Hero image — sits above the content and fades into it */}
            {/* <FadeIn dir="up" delay={0.6} duration={1.2} as="div" className="relative">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#0c0c12]">
                    <Image src={fm.image} alt={fm.title} fill priority sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" />
                </div>
            </FadeIn> */}

            <FadeIn
                dir="up"
                delay={0.8}
                duration={1.2}
                className="prose prose-lg max-w-none text-zinc-300 prose-headings:font-medium prose-headings:text-white prose-p:text-zinc-300 prose-a:text-zinc-300 prose-ul:text-zinc-300 prose-li:my-1 [&_img]:rounded-sm"
            >
                {data.content}
            </FadeIn>
        </div>
    );
}
