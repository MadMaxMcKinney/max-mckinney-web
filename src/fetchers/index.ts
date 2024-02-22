import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import ImageContainer from "@/components/ImageContainer";
import Image from "next/image";

export interface WorkProject {
    title: string;
    projectClient: string;
    projectDate: string;
    projectRole: string;
    projectBrief: string;
    projectShortBrief: string;
    categories: string[];
    themeColor: string;
    accentColor: string;
    image: string;
    thumb: string;
    sortDate: string;
}

export interface PersonalProject {
    title: string;
    description: string;
    accent: string;
    locationText: string;
    icon: string;
    seoImage: string;
    sortDate: string;
    projectTypes: string[];
    projectLink: string;
    sourceLink?: string;
}

export const ProjectDir = {
    work: path.join(process.cwd(), "src", "work"),
    personal: path.join(process.cwd(), "src", "personal"),
};

const markdownComponents = {
    ImageContainer,
    Image,
};

export async function getMarkdownBySlug<Type>(slug: string, dir: string) {
    const fileName = `${slug}.mdx`;
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { frontmatter, content } = await compileMDX<Type>({
        source: fileContents,
        options: { parseFrontmatter: true },
        components: markdownComponents,
    });

    return { frontmatter, content, slug: path.parse(fileName).name };
}

export async function getAllWorkProjects(sortedByLatest = true) {
    const fileNames = fs.readdirSync(ProjectDir.work);
    const allWorkProjectsData = fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        return await getMarkdownBySlug<WorkProject>(slug, ProjectDir.work);
    });

    if (!sortedByLatest) {
        return Promise.all(allWorkProjectsData);
    } else {
        const sortedData = await Promise.all(allWorkProjectsData);
        sortedData.sort((a, b) => {
            if (a.frontmatter.sortDate < b.frontmatter.sortDate) {
                return 1;
            } else {
                return -1;
            }
        });
        return sortedData;
    }
}

export async function getAllPersonalProjects(sortedByLatest = true) {
    const fileNames = fs.readdirSync(ProjectDir.personal);
    const allPersonalProjectsData = fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        return await getMarkdownBySlug<PersonalProject>(slug, ProjectDir.personal);
    });

    if (!sortedByLatest) {
        return Promise.all(allPersonalProjectsData);
    } else {
        const sortedData = await Promise.all(allPersonalProjectsData);
        sortedData.sort((a, b) => {
            if (a.frontmatter.sortDate < b.frontmatter.sortDate) {
                return 1;
            } else {
                return -1;
            }
        });
        return sortedData;
    }
}
