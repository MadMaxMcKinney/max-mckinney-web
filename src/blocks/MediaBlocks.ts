import type { Block } from "payload";

/**
 * Single image with an optional caption — the rich-text equivalent of the old
 * `<ImageContainer src=... subtitle=... />`.
 */
export const ImageBlock: Block = {
    slug: "imageBlock",
    interfaceName: "ImageBlock",
    labels: { singular: "Image", plural: "Images" },
    fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "subtitle", type: "text", admin: { description: "Optional caption shown beneath the image." } },
    ],
};

/**
 * A video with an optional caption, exposing the common HTML `<video>` element
 * attributes so authors can tune playback.
 */
export const VideoBlock: Block = {
    slug: "videoBlock",
    interfaceName: "VideoBlock",
    labels: { singular: "Video", plural: "Videos" },
    fields: [
        { name: "video", type: "upload", relationTo: "media", required: true, admin: { description: "An uploaded video (mp4/webm)." } },
        { name: "subtitle", type: "text", admin: { description: "Optional caption shown beneath the video." } },
        {
            type: "collapsible",
            label: "Playback options",
            admin: { initCollapsed: true },
            fields: [
                {
                    type: "row",
                    fields: [
                        { name: "controls", type: "checkbox", defaultValue: true, label: "Controls", admin: { width: "20%", description: "Show player controls." } },
                        { name: "autoplay", type: "checkbox", defaultValue: false, label: "Autoplay", admin: { width: "20%", description: "Most browsers require Muted." } },
                        { name: "loop", type: "checkbox", defaultValue: true, label: "Loop", admin: { width: "20%" } },
                        { name: "muted", type: "checkbox", defaultValue: false, label: "Muted", admin: { width: "20%" } },
                        { name: "playsInline", type: "checkbox", defaultValue: true, label: "Plays inline", admin: { width: "20%", description: "Inline (non-fullscreen) playback on mobile." } },
                    ],
                },
                {
                    name: "preload",
                    type: "select",
                    defaultValue: "metadata",
                    options: [
                        { label: "Metadata (default)", value: "metadata" },
                        { label: "Auto", value: "auto" },
                        { label: "None", value: "none" },
                    ],
                    admin: { description: "How much of the video to preload before playback." },
                },
            ],
        },
    ],
};

/**
 * A row of images sharing one caption — equivalent to `<ImageContainer srcs=...>`.
 * Alt text comes from each Media doc.
 */
export const GalleryBlock: Block = {
    slug: "galleryBlock",
    interfaceName: "GalleryBlock",
    labels: { singular: "Gallery", plural: "Galleries" },
    fields: [
        {
            name: "images",
            type: "array",
            minRows: 1,
            labels: { singular: "Image", plural: "Images" },
            fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
        },
        { name: "subtitle", type: "text", admin: { description: "Optional caption shown beneath the row." } },
    ],
};
