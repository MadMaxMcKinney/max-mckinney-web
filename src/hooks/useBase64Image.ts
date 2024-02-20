import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

export default async function useBase64Image(filePath: string) {
    const processedPath = path.join(process.cwd(), "public", filePath);
    const file = fs.readFileSync(processedPath);
    const { base64 } = await getPlaiceholder(file);
    return base64;
}
