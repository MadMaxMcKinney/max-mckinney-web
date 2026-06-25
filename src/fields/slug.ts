import type { Field } from "payload";

/** Slugify a string the same way the old scripts/create-project.ts did. */
export const formatSlug = (val: string): string =>
    val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

/**
 * A URL slug field that auto-fills from a source field (default `title`) when
 * left blank, but stays editable.
 */
export const slugField = (sourceField = "title"): Field => ({
    name: "slug",
    type: "text",
    index: true,
    unique: true,
    required: true,
    admin: {
        description: "URL segment. Auto-generated from the title if left blank.",
    },
    hooks: {
        beforeValidate: [
            ({ value, data }) => {
                if (typeof value === "string" && value.length > 0) return formatSlug(value);
                const source = data?.[sourceField];
                if (typeof source === "string" && source.length > 0) return formatSlug(source);
                return value;
            },
        ],
    },
});
