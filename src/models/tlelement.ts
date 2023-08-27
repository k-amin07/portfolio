import { Schema, model, connect, Model, Mongoose } from 'mongoose';

import mongoose from 'mongoose';

type TimelineModelType = Model<Timeline>

const TimelineSchema = new Schema<Timeline,TimelineModelType>({
    sr: Number,
    type: String,
    date: String,
    title: String,
    subtitle: String,
    description: String,
    url: String,
    technologies: [String],
    GPA: Number
});

export const TimelineModel = mongoose.models.Timeline || model<Timeline, TimelineModelType>('Timeline', TimelineSchema);