import type { Field } from "payload";
import { lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";

import { ImageBlock, GalleryBlock, VideoBlock } from "../blocks/MediaBlocks";

/** The long-form case-study body: rich text plus Image/Gallery/Video blocks. */
export const bodyField = (): Field => ({
    name: "body",
    type: "richText",
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: [ImageBlock, GalleryBlock, VideoBlock] })],
    }),
});
