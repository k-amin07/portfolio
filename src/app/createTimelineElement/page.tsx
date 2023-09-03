"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"


const initState = {
    type: "work",
    date: "",
    subtitle: "",
    title: "",
    description: "",
    url: "",
    technologies: "",
    key: ""
}

export default function CreateTimelineElement() {
    const [data, setData] = useState(initState);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { type, date, key, subtitle, title, description, url, technologies } = data
        
        // Send data to API route 
        const res = await fetch('/api/timeline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authentication: key || ''
            },
            body: JSON.stringify({
                type,
                date,
                subtitle,
                title,
                description,
                url,
                technologies: technologies.split(',').map((tech: string) => tech.trim())
            })
        })

        await res.json()

        // Navigate to home
        if (res.ok) {
            router.push(`/`)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const name = e.target.name

        setData(prevData => ({
            ...prevData,
            [name]: e.target.value
        }))
    }

    const canSave = [...Object.values(data)].every(Boolean)

    const formContent = (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl p-6 dark:text-white">
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

            <label className="text-2xl mb-1" htmlFor="type">Type:</label>
            <select className="p-3 mb-6 text-2xl rounded-2xl text-black" 
                onChange={(e) => handleChange(e)}
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
                value={data.title}
                onChange={handleChange}
            />

            <label className="text-2xl mb-1" htmlFor="subtitle">Subtitle:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="subtitle"
                name="subtitle"
                placeholder="Backend Engineer"
                value={data.subtitle}
                onChange={handleChange}
            />

            <label className="text-2xl mb-1" htmlFor="date">Date:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="date"
                name="date"
                placeholder="Feb 2022 - Present"
                value={data.date}
                onChange={handleChange}
                autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="url">URL:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="url"
                name="url"
                placeholder="https://www.example.com"
                value={data.url}
                onChange={handleChange}
                autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="technologies">Technologies:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="technologies"
                name="technologies"
                placeholder="NodeJS, GraphQL, Neo4j"
                value={data.technologies}
                onChange={handleChange}
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
                value={data.description}
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