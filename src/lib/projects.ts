import { ProjectModel } from "@/models/projects";
import dbConnect from "./dbConnect";

export async function getProjects(): Promise<Project[] | undefined> {
    await dbConnect();
    let projects = await ProjectModel.find({});
    projects.sort((a, b) => {
        return a.priority - b.priority;
    })
    return projects;
}

export async function getProjectCount(): Promise<number> {
    await dbConnect();
    return await ProjectModel.countDocuments({}).exec();
}

export async function getProjectMeta(): Promise<Partial<Project[]> | undefined> {
    await dbConnect();
    return await ProjectModel.find({}).select('_id meta').exec();
}

export async function getProjectById(id: string): Promise<Project | null> {
    await dbConnect();
    return await ProjectModel.findById(id).exec();
}

export async function addProject(project: Project): Promise<Project> {
    await dbConnect();
    return await ProjectModel.create(project);
}