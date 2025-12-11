#!/usr/bin/env node
import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { PersonalProjectSchema, WorkProjectSchema, type PersonalProject, type WorkProject } from "../src/schemas/project";

interface ProjectAnswers {
    projectType: "personal" | "work";
    title: string;
    slug: string;
}

interface PersonalProjectAnswers extends ProjectAnswers, PersonalProject {}

interface WorkProjectAnswers extends ProjectAnswers, WorkProject {}

function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
}

async function promptBasicInfo(): Promise<ProjectAnswers> {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "projectType",
            message: "What type of project are you creating?",
            choices: [
                { name: "Personal Project", value: "personal" },
                { name: "Work Project", value: "work" },
            ],
        },
        {
            type: "input",
            name: "title",
            message: "Project title:",
            validate: (input: string) => input.trim().length > 0 || "Title is required",
        },
    ]);

    const slug = createSlug(answers.title);
    console.log(`Generated slug: ${slug}`);

    const { confirmSlug } = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirmSlug",
            message: `Use "${slug}" as the file name?`,
            default: true,
        },
    ]);

    let finalSlug = slug;
    if (!confirmSlug) {
        const { customSlug } = await inquirer.prompt([
            {
                type: "input",
                name: "customSlug",
                message: "Enter custom slug:",
                validate: (input: string) => {
                    const cleaned = input.trim();
                    return (cleaned.length > 0 && /^[a-z0-9-]+$/.test(cleaned)) || "Slug must contain only lowercase letters, numbers, and hyphens";
                },
            },
        ]);
        finalSlug = customSlug.trim();
    }

    return { ...answers, slug: finalSlug };
}

async function promptPersonalProject(basicInfo: ProjectAnswers & { projectType: "personal" }): Promise<PersonalProjectAnswers> {
    console.log("\n📝 Required fields:");
    const required = await inquirer.prompt([
        {
            type: "input",
            name: "description",
            message: "Description:",
            validate: (input: string) => input.trim().length > 0 || "Description is required",
        },
        {
            type: "input",
            name: "accent",
            message: "Accent color (hex, e.g. #FF0000):",
            validate: (input: string) => /^#[0-9A-Fa-f]{6}$/.test(input) || "Must be a valid hex color",
        },
        {
            type: "input",
            name: "locationText",
            message: "Location text (URL path):",
            validate: (input: string) => input.trim().length > 0 || "Location text is required",
        },
        {
            type: "input",
            name: "icon",
            message: "Icon path:",
            validate: (input: string) => input.trim().length > 0 || "Icon path is required",
        },
        {
            type: "input",
            name: "seoImage",
            message: "SEO image path:",
            validate: (input: string) => input.trim().length > 0 || "SEO image path is required",
        },
        {
            type: "input",
            name: "sortDate",
            message: "Sort date (YYYY-MM-DD):",
            default: formatDate(new Date()),
            validate: (input: string) => /^\d{4}-\d{2}-\d{2}$/.test(input) || "Must be in YYYY-MM-DD format",
        },
        {
            type: "checkbox",
            name: "projectTypes",
            message: "Project types:",
            choices: ["web", "app", "ai", "iOS", "brand", "education", "raycast"],
            validate: (answer: string[]) => answer.length > 0 || "At least one project type is required",
        },
        {
            type: "input",
            name: "projectLink",
            message: "Project link (URL):",
            validate: (input: string) => {
                try {
                    new URL(input);
                    return true;
                } catch {
                    return "Must be a valid URL";
                }
            },
        },
    ]);

    console.log("\n🔧 Optional fields (press Enter to skip):");
    const optional = await inquirer.prompt([
        {
            type: "input",
            name: "accentForeground",
            message: "Accent foreground color (hex, optional):",
            validate: (input: string) => !input || /^#[0-9A-Fa-f]{6}$/.test(input) || "Must be a valid hex color",
        },
        {
            type: "input",
            name: "sourceLink",
            message: "Source link (URL, optional):",
            validate: (input: string) => {
                if (!input) return true;
                try {
                    new URL(input);
                    return true;
                } catch {
                    return "Must be a valid URL";
                }
            },
        },
        {
            type: "input",
            name: "folder",
            message: "Folder (for grouping projects, optional):",
        },
        {
            type: "input",
            name: "folderFor",
            message: "Folder for (if this IS a folder entry, optional):",
        },
    ]);

    return {
        ...basicInfo,
        ...required,
        ...Object.fromEntries(Object.entries(optional).filter(([_, v]) => v)),
    } as PersonalProjectAnswers;
}

async function promptWorkProject(basicInfo: ProjectAnswers & { projectType: "work" }): Promise<WorkProjectAnswers> {
    console.log("\n📝 Required fields:");
    const required = await inquirer.prompt([
        {
            type: "input",
            name: "projectClient",
            message: "Client:",
            validate: (input: string) => input.trim().length > 0 || "Client is required",
        },
        {
            type: "input",
            name: "projectDate",
            message: 'Project date (e.g. "Dec 2021 - Present"):',
            validate: (input: string) => input.trim().length > 0 || "Project date is required",
        },
        {
            type: "input",
            name: "projectRole",
            message: "Your role:",
            validate: (input: string) => input.trim().length > 0 || "Project role is required",
        },
        {
            type: "editor",
            name: "projectBrief",
            message: "Project brief (detailed):",
            validate: (input: string) => input.trim().length > 0 || "Project brief is required",
        },
        {
            type: "input",
            name: "projectShortBrief",
            message: "Project short brief:",
            validate: (input: string) => input.trim().length > 0 || "Project short brief is required",
        },
        {
            type: "input",
            name: "categories",
            message: "Categories (comma-separated):",
            filter: (input: string) =>
                input
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s),
            validate: (input: string[]) => input.length > 0 || "At least one category is required",
        },
        {
            type: "input",
            name: "themeColor",
            message: "Theme color (hex):",
            validate: (input: string) => /^#[0-9A-Fa-f]{6}$/.test(input) || "Must be a valid hex color",
        },
        {
            type: "input",
            name: "accentColor",
            message: "Accent color (hex):",
            validate: (input: string) => /^#[0-9A-Fa-f]{6}$/.test(input) || "Must be a valid hex color",
        },
        {
            type: "input",
            name: "image",
            message: "Header image path:",
            validate: (input: string) => input.trim().length > 0 || "Image path is required",
        },
        {
            type: "input",
            name: "thumb",
            message: "Thumbnail image path:",
            validate: (input: string) => input.trim().length > 0 || "Thumbnail path is required",
        },
        {
            type: "input",
            name: "sortDate",
            message: "Sort date (YYYY-MM-DD):",
            default: formatDate(new Date()),
            validate: (input: string) => /^\d{4}-\d{2}-\d{2}$/.test(input) || "Must be in YYYY-MM-DD format",
        },
    ]);

    console.log("\n🔧 Optional fields (press Enter to skip):");
    const optional = await inquirer.prompt([
        {
            type: "input",
            name: "projectAgency",
            message: "Agency (optional):",
        },
    ]);

    return {
        ...basicInfo,
        ...required,
        ...Object.fromEntries(Object.entries(optional).filter(([_, v]) => v)),
    } as WorkProjectAnswers;
}

function generateMDXContent(data: PersonalProjectAnswers | WorkProjectAnswers): string {
    const frontmatter = Object.entries(data)
        .filter(([key, _]) => key !== "projectType" && key !== "slug")
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`;
            }
            return `${key}: "${value}"`;
        })
        .join("\n");

    return `---
${frontmatter}
---

<!-- Add your content here -->

<ImageContainer
    src="${data.projectType === "personal" ? (data as PersonalProjectAnswers).seoImage : (data as WorkProjectAnswers).image}"
    alt="${data.title}"
/>

## Overview

<!-- Add project overview here -->

## Key Features

<!-- Add key features here -->

## Process

<!-- Add process details here -->
`;
}

async function main() {
    console.log("🚀 Create New Project\n");

    try {
        const basicInfo = await promptBasicInfo();

        let data: PersonalProjectAnswers | WorkProjectAnswers;

        if (basicInfo.projectType === "personal") {
            data = await promptPersonalProject(basicInfo as ProjectAnswers & { projectType: "personal" });
            // Validate with schema
            PersonalProjectSchema.parse(data);
        } else {
            data = await promptWorkProject(basicInfo as ProjectAnswers & { projectType: "work" });
            // Validate with schema
            WorkProjectSchema.parse(data);
        }

        // Generate MDX file
        const dir = path.join(process.cwd(), "src", data.projectType);
        const filename = `${data.slug}.mdx`;
        const filepath = path.join(dir, filename);

        if (fs.existsSync(filepath)) {
            const { overwrite } = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "overwrite",
                    message: `File ${filename} already exists. Overwrite?`,
                    default: false,
                },
            ]);

            if (!overwrite) {
                console.log("❌ Cancelled");
                process.exit(0);
            }
        }

        const content = generateMDXContent(data);
        fs.writeFileSync(filepath, content);

        console.log(`✅ Created ${data.projectType} project: ${filepath}`);
        console.log("\n📁 Next steps:");
        console.log("1. Add your project images to the appropriate public folder");
        console.log("2. Update the MDX content with your project details");
        console.log("3. Test the project page in development");
    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error:", error.message);
        } else {
            console.error("❌ Validation error:", error);
        }
        process.exit(1);
    }
}

// Run only if called directly
if (require.main === module) {
    main();
}
