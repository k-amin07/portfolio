import { NextResponse } from "next/server";
import crypto from 'crypto'
import { Readable } from "stream";
import { getBucket } from "@/lib/dbConnect";


export async function POST(request:Request) {
    const data = await request.formData();
    const bucket = await getBucket();

    let files = []
    for (const entry of Array.from(data.entries())) {
        const [key, value] = entry;
        console.log(typeof value)
        const isFile = typeof value == "object";
        if (isFile) {
            const blob = value as Blob;
            const filename = crypto.randomUUID()
            const buffer = Buffer.from(await blob.arrayBuffer());
            const stream = Readable.from(buffer);
            const uploadStream = bucket.openUploadStream(filename, {
                contentType: blob.type,
            });
            await stream.pipe(uploadStream);
            files.push(filename)
        }
    }
    return NextResponse.json({ success: true,files });
}