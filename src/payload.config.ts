import path from "path";
import { fileURLToPath } from "url";

import { buildConfig, type SharpDependency } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { WorkProjects } from "./collections/WorkProjects";
import { PersonalProjects } from "./collections/PersonalProjects";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        meta: {
            titleSuffix: "— Max McKinney",
        },
    },
    collections: [WorkProjects, PersonalProjects, Media, Users],
    globals: [SiteSettings],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URL || "",
    }),
    // Installed sharp (modern, Node 23-friendly) is newer than Payload's bundled
    // typings; the cast bridges the harmless type drift. Runtime is unaffected.
    sharp: sharp as unknown as SharpDependency,
    plugins: [
        vercelBlobStorage({
            enabled: true,
            collections: {
                [Media.slug]: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || "",
        }),
    ],
});
