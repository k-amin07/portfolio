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