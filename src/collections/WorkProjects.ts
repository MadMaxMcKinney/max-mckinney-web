import type { CollectionConfig } from "payload";

import { slugField } from "../fields/slug";
import { hexColorField } from "../fields/hexColor";
import { bodyField } from "../fields/body";

export const WorkProjects: CollectionConfig = {
    slug: "work-projects",
    labels: { singular: "Work Project", plural: "Work Projects" },
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "projectClient", "sortDate"],
        group: "Content",
        description: "Professional / client case studies shown on the home page and /work.",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "Content",
                    fields: [
                        { name: "title", type: "text", required: true },
                        { name: "projectShortBrief", type: "textarea", required: true, admin: { description: "One- or two-sentence summary (card + header)." } },
                        { name: "projectBrief", type: "textarea", required: true, admin: { description: "Longer brief used for SEO/description." } },
                        bodyField(),
                    ],
                },
                {
                    label: "Details",
                    fields: [
                        { name: "projectClient", type: "text", required: true },
                        { name: "projectRole", type: "text", required: true },
                        { name: "projectDate", type: "text", required: true, admin: { description: 'e.g. "2021 – Present"' } },
                        { name: "projectAgency", type: "text", admin: { description: "Optional." } },
                        {
                            name: "categories",
                            type: "text",
                            hasMany: true,
                            required: true,
                            admin: { description: "Freeform tags, e.g. Frontend, Systems, Product." },
                        },
                    ],
                },
                {
                    label: "Media",
                    fields: [
                        { name: "image", type: "upload", relationTo: "media", required: true, label: "Header image" },
                        { name: "thumb", type: "upload", relationTo: "media", required: true, label: "Thumbnail" },
                    ],
                },
                {
                    label: "Theme",
                    fields: [hexColorField("themeColor", { required: true }), hexColorField("accentColor", { required: true })],
                },
            ],
        },
        slugField("title"),
        {
            name: "sortDate",
            type: "date",
            required: true,
            admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "yyyy-MM-dd" }, description: "Controls ordering (newest first)." },
        },
    ],
};
