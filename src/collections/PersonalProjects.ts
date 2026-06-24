import type { CollectionConfig } from "payload";

import { slugField } from "../fields/slug";
import { hexColorField } from "../fields/hexColor";
import { bodyField } from "../fields/body";
import { ogImageField } from "../fields/ogImage";
import { PROJECT_TYPES } from "../lib/projectTypes";

export const PersonalProjects: CollectionConfig = {
    slug: "personal-projects",
    labels: { singular: "Personal Project", plural: "Personal Projects" },
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "projectTypes", "sortDate"],
        group: "Content",
        description: "Personal projects shown on /personal.",
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
                        { name: "description", type: "textarea", required: true, admin: { description: "Summary shown on the card and project header." } },
                        bodyField(),
                    ],
                },
                {
                    label: "Details",
                    fields: [
                        {
                            name: "projectTypes",
                            type: "select",
                            hasMany: true,
                            required: true,
                            options: PROJECT_TYPES.map((t) => ({ label: t, value: t })),
                        },
                        { name: "projectLink", type: "text", required: true, admin: { description: "Primary external link (URL)." } },
                        { name: "sourceLink", type: "text", admin: { description: "Optional source/repo link (URL)." } },
                        { name: "locationText", type: "text", required: true, admin: { description: 'Breadcrumb/location label, e.g. "figmalearn/".' } },
                    ],
                },
                {
                    label: "Media",
                    fields: [
                        {
                            name: "cardMedia",
                            type: "upload",
                            relationTo: "media",
                            admin: { description: "Optional card art (image or video). Falls back to the SEO image. A video plays over the SEO image as poster." },
                        },
                        {
                            name: "cardAspect",
                            type: "select",
                            defaultValue: "16/9",
                            options: [
                                { label: "16 / 9 (landscape)", value: "16/9" },
                                { label: "9 / 16 (portrait)", value: "9/16" },
                            ],
                        },
                        { name: "icon", type: "upload", relationTo: "media", required: false, admin: { description: "Square app/icon art." } },
                        { name: "seoImage", type: "upload", relationTo: "media", required: true, label: "SEO / hero image" },
                    ],
                },
                {
                    label: "Theme",
                    fields: [hexColorField("accent", { required: true }), hexColorField("accentForeground")],
                },
                {
                    label: "SEO",
                    fields: [ogImageField("Optional. Overrides this project's default social-share image (the SEO / hero image) for Open Graph.")],
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
