import { getProjectById, getProjectMeta } from "@/lib/projects";
import NotFound from "./not-found";
import Link from "next/link";
import MdxDisplay from "@/app/components/MdxDisplay";


type Props = {
    params: {
        _id: string
    }
}
export async function generateStaticParams() {
    const projects = await getProjectMeta()
    if(!projects) {
        return []
    }
    const ids = projects.map(project => {
        return {
            _id: project?._id?.toString()
        }
    })
    return ids
}

export async function generateMetadata({params: {_id}}: Props) {
    const project = await getProjectById(_id)
    if(!project) {
        return {
            title: "No Projects Found"
        }
    }
    return {
        title: "Projects",
        description: "Khizar's Projects"
    }
}

export default async function Page({params: {_id}}: Props) {
    const project = await getProjectById(_id)
    if(!project) {
        return NotFound()
    }
    const { meta, content } = project
    return (
        <MdxDisplay meta={meta} content={content} parent="Projects" />
    )
}