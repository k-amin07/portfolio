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

export async function getTimeLineIds(){
    await dbConnect();
    return await TimelineModel.find().select('_id').exec();
} 

export async function getTimelineElementById(id: string): Promise<Timeline | null> {
    await dbConnect();
    console.log(id)
    return await TimelineModel.findById(id).exec();
}