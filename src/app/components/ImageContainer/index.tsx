import Image from "next/image";

interface ImageContainerProps {
    src?: string;
    srcs?: unknown;
    alt?: string;
    alts?: unknown;
    subtitle?: string;
}

function normalizeToStringArray(value: unknown): string[] {
    if (value == null) return [];

    if (Array.isArray(value)) {
        return value.flatMap((item) => normalizeToStringArray(item));
    }

    if (typeof value === "string") {
        const trimmed = value.trim();
        if (!trimmed) return [];

        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
            try {
                const parsed = JSON.parse(trimmed);
                return normalizeToStringArray(parsed);
            } catch {
                // Fall through and treat as delimited text.
            }
        }

        // Handles accidental comma/newline-delimited strings.
        if (trimmed.includes(",") || trimmed.includes("\n")) {
            return trimmed
                .split(/[,\n]/)
                .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
                .filter(Boolean);
        }

        return [trimmed.replace(/^['"]|['"]$/g, "")];
    }

    if (typeof value === "object") {
        // Handles object-like arrays such as {0: "...", 1: "..."}.
        return Object.values(value as Record<string, unknown>).flatMap((item) => normalizeToStringArray(item));
    }

    return [];
}

export default function ImageContainer(props: ImageContainerProps) {
    const sources = normalizeToStringArray(props.srcs);
    const altTexts = normalizeToStringArray(props.alts);

    return (
        <>
            {props.src && (
                <div className="relative w-full rounded overflow-clip shadow-md">
                    <Image src={props.src} alt={props.alt ?? ""} width={1400} height={1400} className="w-full h-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" />
                </div>
            )}
            {sources.length > 0 && (
                <div className="flex gap-4 flex-col md:flex-row">
                    {sources.map((src, index) => (
                        <div key={index} className="relative w-full rounded overflow-clip shadow-md">
                            {" "}
                            <Image src={src} alt={altTexts[index] ?? ""} width={700} height={700} className="w-full h-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 700px" />
                        </div>
                    ))}
                </div>
            )}
            {props.subtitle && <p className="opacity-90 text-sm w-full text-center mt-2">{props.subtitle}</p>}
        </>
    );
}
