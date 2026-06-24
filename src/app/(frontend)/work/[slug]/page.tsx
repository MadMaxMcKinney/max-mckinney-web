import { MHeading01, MBodyXL } from "@/app/components/Typography";
import { getAllWorkProjects, getWorkProjectBySlug, mediaURL } from "@/app/fetchers";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/app/components/Anim";
import Label from "@/app/components/Label";
import RichText from "@/app/components/RichText";

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
    const data = await getWorkProjectBySlug(slug);
    if (!data) return {};
    // Per-project OG override; falls back to the site default (root layout) when unset.
    const ogImage = mediaURL(data.ogImage);
    return {
        title: data.title,
        description: data.projectBrief,
        ...(ogImage ? { openGraph: { images: [ogImage] } } : {}),
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
    const fm = await getWorkProjectBySlug(slug);
    if (!fm) notFound();

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

            <FadeIn
                dir="up"
                delay={0.8}
                duration={1.2}
                className="prose prose-lg max-w-none text-zinc-300 prose-headings:font-medium prose-headings:text-white prose-p:text-zinc-300 prose-a:text-zinc-300 prose-ul:text-zinc-300 prose-li:my-1 [&_img]:rounded-sm"
            >
                <RichText data={fm.body} />
            </FadeIn>
        </div>
    );
}
