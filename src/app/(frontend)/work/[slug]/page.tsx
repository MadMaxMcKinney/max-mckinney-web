import { getAllWorkProjects, getWorkProjectBySlug, mediaURL } from "@/app/fetchers";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSideURL } from "@/lib/getServerSideURL";
import WorkProjectView from "./WorkProjectView";

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

export default async function Template({ params }: TemplateProps) {
    const { slug } = await params;
    const fm = await getWorkProjectBySlug(slug);
    if (!fm) notFound();

    return <WorkProjectView initialData={fm} serverURL={getServerSideURL()} />;
}
