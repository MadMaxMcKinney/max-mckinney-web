"use client";

import React from "react";
import { useField } from "@payloadcms/ui";

type ColorFieldProps = {
    path: string;
    field?: {
        label?: unknown;
        required?: boolean;
        admin?: { description?: unknown };
    };
};

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

/** Humanize a field path segment, e.g. "themeColor" → "Theme Color". */
function humanize(path: string): string {
    const last = path.split(".").pop() ?? path;
    return last
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase())
        .trim();
}

/**
 * Custom admin Field for hex-color text fields: a native color swatch kept in
 * sync with a free-text hex input. Wired in via `hexColorField`.
 */
export const ColorPickerField: React.FC<ColorFieldProps> = ({ path, field }) => {
    const { value, setValue, showError, errorMessage } = useField<string>({ path });
    const current = typeof value === "string" ? value : "";
    const swatch = HEX_RE.test(current) ? current : "#000000";
    const label = typeof field?.label === "string" && field.label ? field.label : humanize(path);
    const description = typeof field?.admin?.description === "string" ? field.admin.description : undefined;

    return (
        <div className="field-type" style={{ marginBottom: "var(--base)" }}>
            <label className="field-label" htmlFor={path}>
                {label}
                {field?.required && <span className="required">*</span>}
            </label>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                    type="color"
                    aria-label={`${label} color picker`}
                    value={swatch}
                    onChange={(e) => setValue(e.target.value.toUpperCase())}
                    style={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        padding: 2,
                        borderRadius: "var(--style-radius-s, 4px)",
                        border: "1px solid var(--theme-elevation-150)",
                        background: "var(--theme-elevation-0)",
                        cursor: "pointer",
                    }}
                />
                <input
                    id={path}
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="#RRGGBB"
                    value={current}
                    onChange={(e) => setValue(e.target.value)}
                    style={{
                        flex: 1,
                        height: 40,
                        padding: "0 10px",
                        borderRadius: "var(--style-radius-s, 4px)",
                        border: `1px solid ${showError ? "var(--theme-error-500)" : "var(--theme-elevation-150)"}`,
                        background: "var(--theme-input-bg, var(--theme-elevation-0))",
                        color: "var(--theme-elevation-800)",
                        fontFamily: "var(--font-mono, monospace)",
                    }}
                />
            </div>

            {showError && errorMessage && (
                <div className="field-error" style={{ color: "var(--theme-error-500)", marginTop: 4 }}>
                    {errorMessage}
                </div>
            )}
            {description && (
                <div className="field-description" style={{ marginTop: 4 }}>
                    {description}
                </div>
            )}
        </div>
    );
};

export default ColorPickerField;
