import { RedirectType } from "next/dist/client/components/redirect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

export default async function Page() {
    async function create(formData: FormData) {
        'use server'
        let key = formData.get('key')?.toString()
        if (key !== process.env.API_KEY) {
            throw new Error('Invalid API Key')
        }
        revalidatePath(`/projects/`)
        redirect(`/projects/`, RedirectType.replace)
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
            <button
                type="submit"
                className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-sm bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
            >
                Submit
            </button>
        </form>
    )
}