import { addTimelineElement, getTimelineCount } from "@/lib/timeline";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const {type, date, title, subtitle, description, url, technologies, GPA}:Partial<Timeline> = await request.json();
    if(!type || !date || !title || !subtitle || !url || !description) {
        return NextResponse.json({ 'message': 'Missing Required data' })
    }
    const count = await getTimelineCount() + 1;
    return NextResponse.json(await addTimelineElement({
        sr: count,
        type,
        date,
        title,
        subtitle,
        description,
        url,
        technologies,
        GPA
    }))
}