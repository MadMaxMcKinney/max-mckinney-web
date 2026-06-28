import { getAllPersonalProjects, getPersonalProjectBySlug, mediaURL } from "@/app/fetchers";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSideURL } from "@/lib/getServerSideURL";
import PersonalProjectView from "./PersonalProjectView";

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
    // Per-project OG override; falls back to the site default (root layout) when unset.
    const ogImage = mediaURL(data.ogImage);
    return {
        title: data.title,
        description: data.description,
        ...(ogImage ? { openGraph: { images: [ogImage] } } : {}),
    };
}

export default async function ({ params }: TemplateProps) {
    const { slug } = await params;
    const data = await getPersonalProjectBySlug(slug);
    if (!data) notFound();

    return <PersonalProjectView initialData={data} serverURL={getServerSideURL()} />;
}
