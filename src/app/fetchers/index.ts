import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import ImageContainer from "@/app/components/ImageContainer";
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

/**
 * Get a markdown file by its slug and directory
 *
 * @export getMarkdownBySlug
 * @template Type
 * @param {string} slug The slug of the markdown file, this is the file name without the extension
 * @param {string} dir The directory of the markdown file
 * @returns The frontmatter, content, and slug of the markdown file
 */
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

/**
 * Get all work projects
 * @param sortedByLatest Will sort the projects by the latest date using the `sortDate` frontmatter key
 * @returns An array of work projects
 */
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

/**
 * Get all personal projects including folders. Folders are projects that have a `folderFor` frontmatter key.
 * @param sortedByLatest Will sort the projects by the latest date
 * @param includeFolders Will include folders in the returned array
 * @param includeProjects Will include normal projects in the returned array
 * @returns An array of personal projects
 */
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

/**
 * Gets all personal projects in a specific folder, sorted by latest. This is useful for the collection pages so you don't need to filter the projects yourself from the `getAllPersonalProjects` function.
 * @param folder The folder to get the projects from
 * @returns An array of personal projects
 * @example
 * const projectsInFolder = await getAllPersonalProjectsInFolder("raycast");
 * console.log(projectsInFolder);
 * // Returns all projects with the frontmatter key `folder` set to "raycast"
 */
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
