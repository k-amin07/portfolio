
import { getBucket } from "@/lib/dbConnect"
import { RedirectType } from "next/dist/client/components/redirect"
import { redirect } from "next/navigation"
import { Readable } from "stream"

export default async function Page() {
    async function create(formData: FormData) {
        'use server'
        const bucket = await getBucket()
        const files = []
        let key = formData.get('key')?.toString()
        if(key !== process.env.API_KEY) {
            throw new Error('Invalid API Key')
        }
        for (const entry of Array.from(formData.entries())) {
            const [key, value] = entry;
            const isFile = typeof value == "object";
            if(isFile) {
                const blob = value as Blob;
                const filename = crypto.randomUUID()
                const buffer = Buffer.from(await blob.arrayBuffer());
                const stream = Readable.from(buffer);
                const uploadStream = bucket.openUploadStream(filename, {
                    contentType: blob.type,
                });
                await stream.pipe(uploadStream);
                files.push(filename)
            }
        }
        redirect(`/api/uploads/${files[0]}`,RedirectType.replace)
    }
    return (
        <form action={create} className="flex flex-col mx-auto max-w-3xl p-6 dark:text-white">
            <label className="text-2xl mb-1" htmlFor="key">API Key:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="key"
                name="key"
                placeholder="API Key"
                autoFocus
            />
            <input className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-sm bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden" type="file" name="files" multiple />
            <button
                type="submit"
                className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-sm bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
            >
                Upload
            </button>
        </form>
    )
}