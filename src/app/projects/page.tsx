import { getProjectMeta } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata() {
    const projects = await getProjectMeta()
    if(!projects) {
        return {
            title: "No Projects Found"
        }
    }
    return {
        title: "Projects",
        description: "Khizar's Projects"
    }
}

export default async function Page() {
    const projects = await getProjectMeta()
    if(!projects?.length) {
        return notFound()
    }

    projects.sort((a, b) => (b?.meta?.priority || 0) - (a?.meta?.priority || 0))

    return (
        // <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-between">
        <div className="flex flex-row gap-1 flex-wrap justify-center">
            {projects.map((project) => {
                return (
                    <div className="px-4 py-4 max-w-xl mx-2" key={project?._id}>
                        <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide" >
                            <div className="md:flex-shrink-0">
                                <Image
                                    src={`/api/uploads/${project?.meta.coverImage}`}
                                    alt="Project"
                                    className="w-full h-64 rounded-lg rounded-b-none"
                                    width={1920}
                                    height={0}
                                    priority={true}
                                />
                            </div>
                            <div className="px-4 py-2 mt-2">
                                <Link href={"/projects/" + project?._id}>
                                    <h2 className="font-bold text-2xl text-gray-800 tracking-normal truncate">{project?.meta.title}</h2>
                                    <p className="h-28 max-h-22 text-sm text-gray-700 mr-1 overflow-hidden">
                                        {project?.meta.summary}
                                    </p>
                                </Link>
                                <div className="flex justify-end items-center -ml-3 my-3">
                                    <h2 className="text-sm tracking-tighter text-gray-900">
                                        <span className="text-gray-600 px-2 mr-1">{project?.meta.date}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}