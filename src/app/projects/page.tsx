import { getProjectMeta } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectDisplay from "../components/ProjectDisplay";

export async function generateMetadata() {
    const projects = await getProjectMeta()
    if(!projects) {
        return {
            title: "Page Not Found"
        }
    }
    return {
        title: "Khizar Amin - Projects",
        description: 'Khizar Amin\'s Projects',
        openGraph: {
            title: "Khizar Amin - Projects",
            description: 'Khizar Amin\'s Projects',
        },
    }
}

export default async function Page() {
    const projects = await getProjectMeta()
    if(!projects || !projects?.length) {
        return notFound()
    }

    projects.sort((a, b) => (b?.meta?.priority || 0) - (a?.meta?.priority || 0))
    
    return ProjectDisplay(projects)

}