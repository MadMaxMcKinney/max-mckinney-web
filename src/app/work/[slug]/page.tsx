import React from "react";
import Image from "next/image";
import { MBodyLight, MHeading03 } from "@/app/components/Typography";
import { ProjectDir, getAllWorkProjects, getMarkdownBySlug } from "@/app/fetchers";
import { WorkProject } from "@/types";
import { Metadata } from "next";
import Pill from "@/app/components/Pill";
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
    return (
        <>
            <div
                style={{ "--themeColor": data.frontmatter.themeColor } as React.CSSProperties}
                className="h-[430px] flex flex-col gap-10 justify-center items-center relative px-6 md:h-[800px] after:absolute after:inset-0 after:bg-gradient-to-b from-black/0 to-black to-90%"
            >
                <FadeIn duration={1.5}>
                    <Image
                        className="object-cover filter saturate-0 contrast-[1.1] after:absolute after:inset-0 after:bg-red-400"
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: `100%` }}
                        src={data.frontmatter.image}
                        alt=""
                        aria-hidden
                        fill
                        priority
                    />
                </FadeIn>
                <FadeIn delay={0.5} duration={1} as="h1" className="font-bold text-center text-4xl z-10 md:text-6xl">{data.frontmatter.title}</FadeIn>
                <FadeIn delay={0.8} duration={1} className="flex gap-4 flex-wrap justify-center z-20">
                    <Pill text={data.frontmatter.projectRole} type="themed" theme={data.frontmatter.accentColor} />
                    <Pill text={data.frontmatter.projectClient} type="themed" theme={data.frontmatter.accentColor} />
                    <Pill text={data.frontmatter.projectDate} type="themed" theme={data.frontmatter.accentColor} />
                </FadeIn>
            </div>

            <FadeIn dir="up" delay={1} duration={1.5} className="page-grid page-grid-sm text-white">
                {/* <div className="flex gap-6 lg:gap-12">
                    <div>
                        <MHeading03 className="mb-1">Role</MHeading03>
                        <MBodyLight className="mb-4">{data.frontmatter.projectRole}</MBodyLight>
                    </div>
                    <div>
                        <MHeading03 className="mb-1">Client</MHeading03>
                        <MBodyLight className="mb-4">{data.frontmatter.projectClient}</MBodyLight>
                    </div>
                    <div>
                        <MHeading03 className="mb-1">Date</MHeading03>
                        <MBodyLight className="mb-4">{data.frontmatter.projectDate}</MBodyLight>
                    </div>
                </div> */}

                <div>
                    <MHeading03 className="mb-1">Brief</MHeading03>
                    <MBodyLight className="mb-4 text-zinc-300 leading-8">{data.frontmatter.projectBrief}</MBodyLight>
                </div>

                <FadeIn dir="up" delay={0.3} duration={1} as="div">
                    <MHeading03 className="mt-14 mb-1">Case Study</MHeading03>
                </FadeIn>

                <FadeIn dir="up" delay={0.6} duration={1} className="prose prose-lg text-white max-w-none prose-li:mt-1 prose-li:mb-1 prose-a:text-zinc-300 prose-p:text-zinc-300 prose-ul:text-zinc-300">
                    {data.content}
                </FadeIn>
            </FadeIn>
        </>
    );
}
