import { MHeading01, MBodyXL } from "@/app/components/Typography";
import { getAllPersonalProjects, getPersonalProjectBySlug } from "@/app/fetchers";
import PersonalProjectLinkButton from "@components/Buttons/PersonalProjectLinkButton";
import PersonalProjectLinkSourceButton from "@components/Buttons/PersonalProjectLinkSourceButton";
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
    const data = await getAllPersonalProjects();
    return data.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: TemplateProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await getPersonalProjectBySlug(slug);
    if (!data) return {};
    return {
        title: data.title,
        description: data.description,
    };
}

export default async function ({ params }: TemplateProps) {
    const { slug } = await params;
    const data = await getPersonalProjectBySlug(slug);
    if (!data) notFound();

    return (
        <>
            <div className="page-grid">
                <FadeIn dir="up" delay={0.1} duration={1} as="div" className="mt-32 sm:mt-56">
                    <Label className="mb-3">{data.projectTypes.join(" · ")}</Label>
                </FadeIn>

                <FadeIn dir="up" delay={0.2} duration={1} as="div">
                    <MHeading01 className="mb-6 text-white">{data.title}</MHeading01>
                </FadeIn>

                <FadeIn dir="up" delay={0.4} duration={1} as="div">
                    <MBodyXL className="text-zinc-400 mb-8 max-w-3xl">{data.description}</MBodyXL>
                </FadeIn>

                <FadeIn dir="up" delay={0.6} duration={1} className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    {data.projectLink && <PersonalProjectLinkButton href={data.projectLink} accent={data.accent} />}
                    {data.sourceLink && <PersonalProjectLinkSourceButton href={data.sourceLink} accent={data.accent} />}
                </FadeIn>

                <FadeIn dir="up" delay={1} duration={1.5} className="prose prose-lg prose-p:font-medium max-w-none text-zinc-300 mt-16 [&_img]:rounded-xs [&_p]:opacity-85">
                    <RichText data={data.body} />
                </FadeIn>
            </div>
        </>
    );
}
