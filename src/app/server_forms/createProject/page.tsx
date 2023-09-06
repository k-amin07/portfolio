import { addProject } from "@/lib/projects"
import { revalidatePath } from "next/cache"
import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"

export default async function Page() {
    async function create(formData: FormData) {
        'use server'
        let key = formData.get('key')?.toString()
        if (key !== process.env.API_KEY) {
            throw new Error('Invalid API Key')
        }
        const project = await addProject({
            meta: {
                title: formData.get('title')?.toString()!,
                summary: formData.get('summary')?.toString()!,
                date: formData.get('date')?.toString()!,
                priority: parseInt(formData.get('priority')?.toString()!),
                coverImage: formData.get('coverImage')?.toString()!,   
            },
            content: formData.get('content')?.toString()!,
        })
        
        revalidatePath('/projects')
        redirect(`/projects/${project._id}`, RedirectType.replace)
    }
    return (
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
            <label className="text-2xl mb-1" htmlFor="date">Date:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="date"
                id="date"
                name="date"
                placeholder="4 Sep 2023"
            />
            <label className="text-2xl mb-1" htmlFor="priority">Priority:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                pattern="[0-9]*"
                id="priority"
                name="priority"
                placeholder="Priority.."
            />
            <label className="text-2xl mb-1" htmlFor="title">Title:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="title"
                name="title"
                placeholder="Project Title.."
            />
            <label className="text-2xl mb-1" htmlFor="coverImage">Cover Image:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="coverImage"
                name="coverImage"
                placeholder="Cover Image ID.."
            />
            <label className="text-2xl mb-1" htmlFor="summary">Summary:</label>
            <textarea
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                id="summary"
                name="summary"
                placeholder="A brief summary of the shit that went down. Must be at least 60 characters and at most 270"
                rows={2}
                cols={33}
            />
            <label className="text-2xl mb-1" htmlFor="content">Content:</label>
            <textarea
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                id="content"
                name="content"
                placeholder="Your message here..."
                rows={10}
                cols={33}
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