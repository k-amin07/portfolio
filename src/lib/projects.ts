import { ProjectModel } from "@/models/projects";
import dbConnect from "./dbConnect";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import Video from "@/app/components/Video"
import CustomImage from "@/app/components/CustomImage"
import moment from "moment"

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

export async function getProjectMeta(tag?:String): Promise<Partial<Project[]> | undefined> {
    await dbConnect();
    let projects
    if(tag){
        projects = await ProjectModel.find({ "meta.tags": tag }).select('_id meta').exec();
    } else {
        projects = await ProjectModel.find({}).select('_id meta').exec();
    }
    return projects
}

export async function getProjectById(id: string): Promise<Project | null> {
    await dbConnect();
    const project =  await ProjectModel.findById(id).exec();
    if (!project) {
        return null
    }

    const mdxSource = `---\ntitle: ${project.meta.title}\ndate: ${project.meta.date}\ntags: ${project.meta.tags}\n---\n\n${project.content}`

    
    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
        source: mdxSource,
        components: {
            Video,
            CustomImage
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {behavior: "wrap"}]
                ]
            }
        }
    })

    const projectObject: Project = {
        _id: id,
        meta: {
            title: frontmatter.title,
            summary: project.meta.summary,
            date: moment(frontmatter.date).format("MMMM YYYY"),
            priority: project.meta.priority,
            coverImage: project.meta.coverImage,
            tags: frontmatter.tags
        },
        content: content
    }
    
    return projectObject


}

export async function addProject(project: Project): Promise<Project> {
    await dbConnect();
    return await ProjectModel.create(project);
}