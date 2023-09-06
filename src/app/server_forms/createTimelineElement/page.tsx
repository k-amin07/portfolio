import { redirect } from "next/navigation"
import { addTimelineElement, getTimelineCount } from "@/lib/timeline";
import { RedirectType } from "next/dist/client/components/redirect";
import { revalidatePath } from 'next/cache'

export default async function Page() {
    async function create(formData: FormData) {
        'use server'
        let key = formData.get('key')?.toString()
        if (key !== process.env.API_KEY) {
            throw new Error('Invalid API Key')
        }
        const count = await getTimelineCount() + 1;
        const tl_element = await addTimelineElement({
            sr: count,
            type: formData.get('type')?.toString()!,
            date: formData.get('date')?.toString()!,
            title: formData.get('title')?.toString()!,
            subtitle: formData.get('subtitle')?.toString()!,
            description: formData.get('description')?.toString()!,
            url: formData.get('url')?.toString()!,
            technologies: formData.get('technologies')?.toString()?.split(',').map((tech: string) => tech.trim()),
            GPA: formData.get('gpa') ? parseFloat(formData.get('gpa')?.toString()!) : undefined,
            
        })
        revalidatePath('/experience')
        redirect(`/experience/${tl_element._id}`, RedirectType.replace)
    }

    return(
        <form action={create} className="flex flex-col mx-auto max-w-3xl p-6 dark:text-white">
            <label className="text-2xl mb-1" htmlFor="Key">API Key:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="key"
                name="key"
                placeholder="API Key"
                autoFocus
            />
            <label className="text-2xl mb-1" htmlFor="type">Type:</label>
            <select className="p-3 mb-6 text-2xl rounded-2xl text-black"
                name="type"
                id="type"
            >
                <option value="work">Work</option>
                <option value="education">Education</option>
            </select>
            <label className="text-2xl mb-1" htmlFor="title">Title:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="title"
                name="title"
                placeholder="Bridgelinx Technologies"
            />
            <label className="text-2xl mb-1" htmlFor="subtitle">Subtitle:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="subtitle"
                name="subtitle"
                placeholder="Backend Engineer"
            />

            <label className="text-2xl mb-1" htmlFor="date">Date:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="date"
                name="date"
                placeholder="Feb 2022 - Present"
                autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="url">URL:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="url"
                name="url"
                placeholder="https://www.example.com"
                autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="technologies">Technologies:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="technologies"
                name="technologies"
                placeholder="NodeJS, GraphQL, Neo4j"
                autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="description">Description:</label>
            <textarea
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                id="description"
                name="description"
                placeholder="Responsible for..."
                rows={5}
                cols={33}
            />
            <label className="text-2xl mb-1" htmlFor="gpa">GPA:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="gpa"
                name="gpa"
                placeholder="4.0"
                autoFocus
            />
            <button
                type="submit"
                className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-sm bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
            >
                Submit
            </button>

        </form>
    )
}