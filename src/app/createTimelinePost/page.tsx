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
        // Send data to API route 
        const res = await fetch('/api/timelinePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authentication: key || ''
            },
            body: JSON.stringify({
                timelineId,
                content
            })
        })
        await res.json()

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

    const canSave = [...Object.values(data)].every(Boolean)
    const formContent = (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl p-6">
            <label className="text-2xl mb-1" htmlFor="Key">API Key:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="key"
                name="key"
                placeholder="API Key"
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
                value={data.timelineId}
                onChange={handleChange}
                autoFocus
            />

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