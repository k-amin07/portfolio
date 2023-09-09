import ProjectDisplay from "@/app/components/ProjectDisplay"
import { getProjectMeta } from "@/lib/projects"
import { notFound } from "next/navigation"


type Props = {
    params: {
        tag: string
    }
}

export async function generateStaticParams() {
    const projects = await getProjectMeta()
    if (!projects) {
        return []
    }
    const allTags = []
    for (const project of projects) {
        if (project?.meta?.tags && project?.meta?.tags?.length) {
            allTags.push(...project.meta.tags.flatMap(tag => {
                return {
                    tag
                }
            }))
        }
    }
    console.log(allTags)
    return allTags
}

export async function generateMetadata({ params: { tag } }: Props) {
    const projects = await getProjectMeta(tag)
    if (!projects) {
        return {
            title: "Page Not Found"
        }
    }
    return {
        title: `Khizar Amin - Projects Tagged ${tag}`,
        description: `Khizar Amin's Projects Tagged ${tag}`,
        openGraph: {
            title: `Khizar Amin - Projects Tagged ${tag}`,
            description: `Khizar Amin's Projects Tagged ${tag}`,
        },
    }
}

export default async function Page({ params: { tag } }: Props) {
    const projects = await getProjectMeta(tag)
    if (!projects?.length) {
        return notFound()
    }
    projects.sort((a, b) => (b?.meta?.priority || 0) - (a?.meta?.priority || 0))

    return ProjectDisplay(projects)
}