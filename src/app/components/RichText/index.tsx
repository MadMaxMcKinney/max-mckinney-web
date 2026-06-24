import Image from "next/image";
import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { Media } from "@payload-types";

type MediaValue = string | Media | null | undefined;

function resolveMedia(value: MediaValue): { url: string; alt: string; width?: number; height?: number } | null {
    if (!value || typeof value === "string" || !value.url) return null;
    return { url: value.url, alt: value.alt || "", width: value.width ?? undefined, height: value.height ?? undefined };
}

function Caption({ children }: { children?: string | null }) {
    if (!children) return null;
    return <p className="opacity-90 text-sm w-full text-center mt-2">{children}</p>;
}

function ImageBlockView({ image, subtitle }: { image?: MediaValue; subtitle?: string | null }) {
    const m = resolveMedia(image);
    if (!m) return null;
    return (
        <>
            <div className="relative w-full rounded-sm overflow-clip shadow-md">
                <Image src={m.url} alt={m.alt} width={m.width ?? 1400} height={m.height ?? 1400} className="w-full h-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" />
            </div>
            <Caption>{subtitle}</Caption>
        </>
    );
}

function GalleryBlockView({ images, subtitle }: { images?: { image?: MediaValue }[]; subtitle?: string | null }) {
    const resolved = (images ?? []).map((row) => resolveMedia(row?.image)).filter((m): m is NonNullable<ReturnType<typeof resolveMedia>> => Boolean(m));
    if (resolved.length === 0) return null;
    return (
        <>
            <div className="flex gap-4 flex-col md:flex-row">
                {resolved.map((m, i) => (
                    <div key={i} className="relative w-full rounded-sm overflow-clip shadow-md">
                        <Image src={m.url} alt={m.alt} width={m.width ?? 700} height={m.height ?? 700} className="w-full h-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 700px" />
                    </div>
                ))}
            </div>
            <Caption>{subtitle}</Caption>
        </>
    );
}

function VideoBlockView({ video, subtitle }: { video?: MediaValue; subtitle?: string | null }) {
    const m = resolveMedia(video);
    if (!m) return null;
    return (
        <>
            <video width="100%" controls loop className="rounded-sm overflow-clip shadow-md">
                <source src={m.url} />
            </video>
            <Caption>{subtitle}</Caption>
        </>
    );
}

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    blocks: {
        imageBlock: ({ node }: { node: { fields: Parameters<typeof ImageBlockView>[0] } }) => <ImageBlockView {...node.fields} />,
        galleryBlock: ({ node }: { node: { fields: Parameters<typeof GalleryBlockView>[0] } }) => <GalleryBlockView {...node.fields} />,
        videoBlock: ({ node }: { node: { fields: Parameters<typeof VideoBlockView>[0] } }) => <VideoBlockView {...node.fields} />,
    },
});

export default function RichText({ data, className }: { data: unknown; className?: string }) {
    if (!data) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <PayloadRichText data={data as any} converters={jsxConverters} className={className} disableContainer />;
}
