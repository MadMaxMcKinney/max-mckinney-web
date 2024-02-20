import React from "react";
import Image from "next/image";
import { MBodyLight, MHeading03 } from "@components/Typography";
import { getWorkProjectBySlug } from "@/fetchers";

interface TemplateProps {
    params: {
        slug: string;
    };
}

export default async function Template({ params }: TemplateProps) {
    const data = await getWorkProjectBySlug(params.slug);

    return (
        <>
            {/* <Helmet title={data.site.siteMetadata.title + " | " + data.markdownRemark.frontmatter.title}>
                <meta name="theme-color" content={data.markdownRemark.frontmatter.themeColor} />

                <meta name="description" content={data.markdownRemark.frontmatter.projectShortBrief} />
                <meta name="image" content={data.site.siteMetadata.siteUrl + getImage(data.markdownRemark.frontmatter.thumb)} />
                <meta itemprop="name" content={data.site.siteMetadata.title + " | " + data.markdownRemark.frontmatter.title} />
                <meta itemprop="description" content={data.markdownRemark.frontmatter.projectShortBrief} />
                <meta itemprop="image" content={data.site.siteMetadata.siteUrl + getImage(data.markdownRemark.frontmatter.thumb)} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={data.site.siteMetadata.title + " | " + data.markdownRemark.frontmatter.title} />
                <meta name="twitter:description" content={data.markdownRemark.frontmatter.projectShortBrief} />
                <meta name="twitter:site" content="@madmaxmckinney" />
                <meta name="twitter:image" content={data.site.siteMetadata.siteUrl + getImage(data.markdownRemark.frontmatter.thumb)} />

                <meta name="og:title" content={data.site.siteMetadata.title + " | " + data.markdownRemark.frontmatter.title} />
                <meta name="og:description" content={data.markdownRemark.frontmatter.projectShortBrief} />
                <meta name="og:image" content={data.site.siteMetadata.siteUrl + getImage(data.markdownRemark.frontmatter.thumb)} />
                <meta name="og:site_name" content="Max McKinney" />

                <meta name="msapplication-TileColor" content={data.markdownRemark.frontmatter.themeColor} />
            </Helmet> */}

            <div
                style={{ "--themeColor": data.frontmatter.themeColor } as React.CSSProperties}
                className="h-[430px] flex justify-center items-center relative px-6 md:h-[800px] after:absolute after:inset-0 after:bg-gradient-to-b from-black/0 to-[#05010d] to-90%"
            >
                <Image className="animate-fade-in" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: `100%` }} src={data.frontmatter.image} alt="" aria-hidden fill priority />
                <h1 className="font-bold text-center text-4xl z-10 md:text-6xl animate-fade-in-slow">{data.frontmatter.title}</h1>
            </div>

            <div className="page-grid page-grid-sm text-white animate-fade-in-up">
                <div className="flex gap-6 lg:gap-12">
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
                </div>

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
