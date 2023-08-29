"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
    // meta: "",
    content: "",
    // date: "",
    timelineId: "",
    key: ""
}



export default function CreateTimelinePost() {
    const [data,setData] = useState(initState);
    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { content, key, timelineId } = data
        console.log({timelineId})
        // Send data to API route 
        const res = await fetch('/api/timelinePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authentication: key || ''
            },
            body: JSON.stringify({
                timelineId,
                // meta: `---\n${meta}\n---`,
                content
            })
        })
        console.log(res)
        const result = await res.json()
        console.log(result)

        // Navigate to home
        if(res.ok){
            router.push(`/`)    
        }
        
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const name = e.target.name

        setData(prevData => ({
            ...prevData,
            [name]: e.target.value
        }))
    }
    console.log([...Object.values(data)])
    const canSave = [...Object.values(data)].every(Boolean)
    const formContent = (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl p-6">

            {/* <h1 className="text-4xl mb-4">Create Post</h1> */}

            <label className="text-2xl mb-1" htmlFor="Key">API Key:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="key"
                name="key"
                placeholder="API Key"
                // pattern="([A-Z])[\w+.]{1,}"
                value={data.key}
                onChange={handleChange}
                autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="tlid">TimelineId:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="tlId"
                name="timelineId"
                placeholder="Timeline Id"
                // pattern="([A-Z])[\w+.]{1,}"
                value={data.timelineId}
                onChange={handleChange}
                autoFocus
            />

            {/* <label className="text-2xl mb-1" htmlFor="meta">Meta:</label>
            <textarea
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                id="meta"
                name="meta"
                rows={4}
                cols={33}
                // placeholder={"---\ntitle: \nsubtitle: \ndate: \n---"}
                // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                value={data.meta || "title: \nsubtitle: \ndate: "}
                onChange={handleChange}
            /> */}

            {/* <label className="text-2xl mb-1" htmlFor="date">Date:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="date"
                name="date"
                placeholder="Aug 2021 - Present"
                value={data.date}
                onChange={handleChange}
            /> */}

            <label className="text-2xl mb-1" htmlFor="post">Post:</label>
            <textarea
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                id="message"
                name="content"
                placeholder="Your message here..."
                rows={5}
                cols={33}
                value={data.content}
                onChange={handleChange}
            />

            <button
                className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
                disabled={!canSave}
            >Submit</button>

        </form>
    )

    return formContent
}