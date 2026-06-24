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

/** A video with an optional caption — equivalent to the old `<video><source/></video>`. */
export const VideoBlock: Block = {
    slug: "videoBlock",
    interfaceName: "VideoBlock",
    labels: { singular: "Video", plural: "Videos" },
    fields: [
        { name: "video", type: "upload", relationTo: "media", required: true, admin: { description: "An uploaded video (mp4/webm)." } },
        { name: "subtitle", type: "text", admin: { description: "Optional caption shown beneath the video." } },
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
