import { Readable } from "stream";
import { getBucket } from "./dbConnect";

export async function getImage(filename: string) {
    const bucket = await getBucket();
    const files = await bucket.find({ filename }).toArray();
    if (!files.length) {
        return null;
    }

    const ContentType = files[0].contentType;
    const stream = bucket.openDownloadStreamByName(filename)
    return { stream, ContentType};

}

export async function saveImage(filename: string, buffer: Buffer, ContentType: string) {
    const bucket = await getBucket();
    const stream = Readable.from(buffer);
    const uploadStream = bucket.openUploadStream(filename, {
        contentType: ContentType,
    });
    await stream.pipe(uploadStream);
    return filename
}