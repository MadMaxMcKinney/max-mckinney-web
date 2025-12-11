import { z } from "zod";

/**
 * Schema for Personal Project frontmatter validation
 * Based on analysis of all personal project MDX files
 */
export const PersonalProjectSchema = z.object({
    // Required fields
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Accent must be a valid hex color (e.g. #FF0000)"),
    locationText: z.string().min(1, "Location text is required"),
    icon: z.string().min(1, "Icon path is required"),
    seoImage: z.string().min(1, "SEO image path is required"),
    sortDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Sort date must be in YYYY-MM-DD format"),
    projectTypes: z.array(z.enum(["web", "app", "ai", "iOS", "brand", "education", "raycast"])).min(1, "At least one project type is required"),
    projectLink: z.string().url("Project link must be a valid URL"),

    // Optional fields
    accentForeground: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Accent foreground must be a valid hex color")
        .optional(),
    sourceLink: z.string().url("Source link must be a valid URL").optional(),

    // Folder system fields (for organizing related projects)
    folder: z.string().optional(), // Used to group projects under a folder
    folderFor: z.string().optional(), // Used to define a folder entry
});

/**
 * Schema for Work Project frontmatter validation
 * Based on analysis of all work project MDX files
 */
export const WorkProjectSchema = z.object({
    // Required fields
    title: z.string().min(1, "Title is required"),
    projectClient: z.string().min(1, "Project client is required"),
    projectDate: z.string().min(1, "Project date is required"),
    projectRole: z.string().min(1, "Project role is required"),
    projectBrief: z.string().min(1, "Project brief is required"),
    projectShortBrief: z.string().min(1, "Project short brief is required"),
    categories: z.array(z.string()).min(1, "At least one category is required"),
    themeColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Theme color must be a valid hex color"),
    accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Accent color must be a valid hex color"),
    image: z.string().min(1, "Image path is required"),
    thumb: z.string().min(1, "Thumbnail path is required"),
    sortDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Sort date must be in YYYY-MM-DD format"),

    // Optional fields
    projectAgency: z.string().optional(), // Some projects have an agency field
});

/**
 * Schema for Folder Project (simplified personal project for grouping)
 */
export const FolderProjectSchema = z.object({
    // Required fields
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Accent must be a valid hex color (e.g. #FF0000)"),
    locationText: z.string().min(1, "Location text is required"),
    sortDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Sort date must be in YYYY-MM-DD format"),
    icon: z.string().min(1, "Icon path is required"),
    projectTypes: z.array(z.enum(["web", "app", "ai", "iOS", "brand", "education", "raycast"])).min(1, "At least one project type is required"),
    folderFor: z.string().min(1, "Folder identifier is required"),
});

// Type exports for use in your application
export type PersonalProject = z.infer<typeof PersonalProjectSchema>;
export type WorkProject = z.infer<typeof WorkProjectSchema>;
export type FolderProject = z.infer<typeof FolderProjectSchema>;

/**
 * Utility functions for validating project data
 */
export const validatePersonalProject = (data: unknown): PersonalProject => {
    return PersonalProjectSchema.parse(data);
};

export const validateWorkProject = (data: unknown): WorkProject => {
    return WorkProjectSchema.parse(data);
};

/**
 * Safe validation functions that return validation results instead of throwing
 */
export const safeValidatePersonalProject = (data: unknown) => {
    return PersonalProjectSchema.safeParse(data);
};

export const safeValidateWorkProject = (data: unknown) => {
    return WorkProjectSchema.safeParse(data);
};

export const validateFolderProject = (data: unknown): FolderProject => {
    return FolderProjectSchema.parse(data);
};

export const safeValidateFolderProject = (data: unknown) => {
    return FolderProjectSchema.safeParse(data);
};
