import { Schema, model, connect, Model, Mongoose } from 'mongoose';

import mongoose from 'mongoose';


type TimelinePostModelType = Model<TimelinePost>

const TimelinePostSchema = new Schema<TimelinePost,TimelinePostModelType>({
    timelineId: String,
    meta: {
        title: String,
        subtitle: String,
        date: String,
    },
    content: String,
})

export const TimelinePostModel = mongoose.models.TimelinePost || model<TimelinePost, TimelinePostModelType>('TimelinePost', TimelinePostSchema);