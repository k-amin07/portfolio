import {Schema, model, connect, Model, Mongoose} from 'mongoose';

import mongoose from 'mongoose';

type ProjectModelType = Model<Project>

const ProjectSchema = new Schema<Project, ProjectModelType>({
    meta: {
        title: String,
        summary: String,
        date: String,
        priority: Number,
        coverImage: String,
    },
    content: String,
})

export const ProjectModel = mongoose.models.Project || model<Project, ProjectModelType>('Project', ProjectSchema);