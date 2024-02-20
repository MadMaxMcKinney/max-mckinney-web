import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import ImageContainer from "@/components/ImageContainer";
import Image from "next/image";

const markdownComponents = {
    ImageContainer,
    Image,
};

const workProjectsDir = path.join(process.cwd(), "src", "work");

export async function getWorkProjectBySlug(slug: string) {
    const fileName = `${slug}.mdx`;
    const fullPath = path.join(workProjectsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { frontmatter, content } = await compileMDX<{
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
        postType: string;
    }>({
        source: fileContents,
        options: { parseFrontmatter: true },
        components: markdownComponents,
    });

    return { frontmatter, content, slug: path.parse(fileName).name };
}

export async function getAllWorkProjects(sortedByLatest = true) {
    const fileNames = fs.readdirSync(workProjectsDir);
    const allWorkProjectsData = fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        return await getWorkProjectBySlug(slug);
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
