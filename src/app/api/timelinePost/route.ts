import { addTimelinePost } from "@/lib/timelineposts"
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const { content, timelineId } = await request.json();
    if(!content) {
        return NextResponse.json({ 'message': 'Missing Required data' })
    }

    return NextResponse.json(await addTimelinePost(content, timelineId))
}