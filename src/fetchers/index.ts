import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import ImageContainer from "@/components/ImageContainer";
import Image from "next/image";
import { PersonalProject, WorkProject } from "@/types";
import { JSXElementConstructor, ReactElement } from "react";

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

export async function getAllPersonalProjects(
    { sortedByLatest, includeFolders, includeProjects }: { sortedByLatest?: boolean; includeFolders?: boolean; includeProjects?: boolean } = {
        sortedByLatest: true,
        includeFolders: true,
        includeProjects: true,
    }
) {
    const fileNames = fs.readdirSync(ProjectDir.personal);
    const allPersonalProjectsData: { frontmatter: PersonalProject; content: ReactElement<any, string | JSXElementConstructor<any>>; slug: string }[] = [];

    await Promise.all(
        fileNames.map(async (fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const project = await getMarkdownBySlug<PersonalProject>(slug, ProjectDir.personal);

            // If we don't want to include folders and the project is a folder, skip it, otherwise add it to the array
            if (!includeFolders && project.frontmatter.folderFor) return;
            if (!includeProjects && !project.frontmatter.folderFor) return;

            allPersonalProjectsData.push(project);
        })
    );

    if (!sortedByLatest) {
        return allPersonalProjectsData;
    } else {
        const sortedData = allPersonalProjectsData;
        sortedData.sort((a, b) => {
            if (a!.frontmatter.sortDate < b!.frontmatter.sortDate) {
                return 1;
            } else {
                return -1;
            }
        });
        return sortedData;
    }
}

export async function getAllPersonalProjectsInFolder(folder: string) {
    const fileNames = fs.readdirSync(ProjectDir.personal);
    const allPersonalProjectsData: { frontmatter: PersonalProject; content: ReactElement<any, string | JSXElementConstructor<any>>; slug: string }[] = [];
    // Get all projects in the folder
    await Promise.all(
        fileNames.map(async (fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const project = await getMarkdownBySlug<PersonalProject>(slug, ProjectDir.personal);

            if (project.frontmatter.folder?.toLowerCase() === folder.toLowerCase()) {
                allPersonalProjectsData.push(project);
            } else {
                return;
            }
        })
    );

    // Sort by latest
    const sortedData = allPersonalProjectsData;
    sortedData.sort((a, b) => {
        if (a!.frontmatter.sortDate < b!.frontmatter.sortDate) {
            return 1;
        } else {
            return -1;
        }
    });
    return sortedData;
}
