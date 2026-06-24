import type { TextField } from "payload";

/** A text field constrained to a `#RRGGBB` hex color. */
export const hexColorField = (name: string, options: { label?: string; required?: boolean } = {}): TextField => ({
    name,
    type: "text",
    label: options.label,
    required: options.required ?? false,
    admin: {
        description: "Hex color, e.g. #RRGGBB",
    },
    validate: (value: string | null | undefined) => {
        if (!value) return options.required ? "Required" : true;
        return /^#[0-9A-Fa-f]{6}$/.test(value) || "Must be a valid hex color (e.g. #FF0000)";
    },
});
