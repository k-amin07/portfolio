import { TimelineModel } from "@/models/tlelement";
import dbConnect from "./dbConnect";

export async function getTimeline(): Promise<Timeline[] | undefined> {
    await dbConnect();
    let timeLine = await TimelineModel.find({});
    timeLine.sort((a, b) => {
        return b.sr - a.sr;
    })
    return timeLine;
}

export async function getTimelineCount(): Promise<number> {
    await dbConnect();
    return await TimelineModel.countDocuments({}).exec();
}

export async function addTimelineElement (element: Timeline): Promise<Timeline> {
    await dbConnect();
    return await TimelineModel.create(element);
}