import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

export default async function useBase64Image(filePath: string) {
    if (filePath.startsWith("http")) {
        try {
            const src = filePath;
            const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
            const { base64 } = await getPlaiceholder(buffer);
            return base64;
        } catch (error) {
            console.error("Error fetching image", error);
        }
    } else {
        const processedPath = path.join(process.cwd(), "public", filePath);
        const file = fs.readFileSync(processedPath);
        const { base64 } = await getPlaiceholder(file);
        return base64;
    }
}
