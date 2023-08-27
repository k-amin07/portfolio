import { TimelineModel } from "@/models/tlelement";
import dbConnect from "./dbConnect";

export async function getTimeline() {
    await dbConnect();
    let timeLine = await TimelineModel.find({});
    console.log(timeLine)
    timeLine.sort((a, b) => {
        return b.sr - a.sr;
    })
    return timeLine;
}

export async function getTimelineCount () {
    await dbConnect();
    return await TimelineModel.countDocuments({}).exec();
}

export async function addTimelineElement (element: Timeline) {
    await dbConnect();
    return await TimelineModel.create(element);
}