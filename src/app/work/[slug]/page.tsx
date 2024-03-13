import React from "react";
import Image from "next/image";
import { MBodyLight, MHeading03 } from "@components/Typography";
import { ProjectDir, getAllWorkProjects, getMarkdownBySlug } from "@/fetchers";
import { WorkProject } from "@/types";
import { Metadata } from "next";
import Pill from "@/components/Pill";

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
                className="h-[430px] flex flex-col gap-10 justify-center items-center relative px-6 md:h-[800px] after:absolute after:inset-0 after:bg-gradient-to-b from-black/0 to-[#05010d] to-90%"
            >
                <Image
                    className="animate-fade-in object-cover"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: `100%` }}
                    src={data.frontmatter.image}
                    alt=""
                    aria-hidden
                    fill
                    priority
                />
                <h1 className="font-bold text-center text-4xl z-10 md:text-6xl animate-fade-in-slow">{data.frontmatter.title}</h1>
                <div className="flex gap-4 flex-wrap justify-center z-20 animate-fade-in-slow">
                    <Pill text={data.frontmatter.projectRole} type="themed" theme={data.frontmatter.accentColor} />
                    <Pill text={data.frontmatter.projectClient} type="themed" theme={data.frontmatter.accentColor} />
                    <Pill text={data.frontmatter.projectDate} type="themed" theme={data.frontmatter.accentColor} />
                </div>
            </div>

            <div className="page-grid page-grid-sm text-white animate-fade-in-up">
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
                    <MBodyLight className="mb-4">{data.frontmatter.projectBrief}</MBodyLight>
                </div>

                <MHeading03 className="mt-14 mb-1 animate-fade-in-up">Case Study</MHeading03>

                <div className="prose prose-lg text-white max-w-none animate-fade-in-up">{data.content}</div>
            </div>
        </>
    );
}
