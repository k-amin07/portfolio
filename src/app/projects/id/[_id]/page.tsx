import { getProjectById, getProjectMeta } from "@/lib/projects";
import NotFound from "./not-found";
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
            title: "Page Not Found"
        }
    }

    return {
        title: `Khizar Amin - ${project?.meta.title}`,
        description: 'Khizar Amin\'s Projects',
        openGraph: {
            title: `Khizar Amin - ${project?.meta.title}`,
            description: 'Khizar Amin\'s Projects',
        },
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