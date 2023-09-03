import { NextResponse } from "next/server";
import { getImage } from "@/lib/image";

type Params = {
    params: { filename: string };
};

export async function GET(req: Request, { params }: Params) {
    const filename = params.filename as string;
    if (!filename) {
        return new NextResponse(null, { status: 400, statusText: "Bad Request" });
    }

    const resp = await getImage(filename)
    if (!resp) {
        return new NextResponse(null, { status: 404, statusText: "Not found" });
    }
    const {stream, ContentType} = resp

    return new NextResponse(stream, {
        headers: {
            "Content-Type": ContentType,
        },
    });
}