"use client";

import React, { FormEvent, useRef, useState, ChangeEvent } from "react";

const initState = {
    key: ""
}

export default function ImageUploader() {
    // 1. add reference to input element
    const [data, setData] = useState(initState);
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { key } = data;

        // 2. get reference to the input element
        const input = ref.current!;

        // 3. build form data
        const formData = new FormData();
        for (const file of Array.from(input.files ?? [])) {
            formData.append(file.name, file);
        }

        // 4. use axios to send the FormData
        await fetch('/api/upload', {
            method: 'POST',
            headers: {
                // DO NOT SET CONTENT-TYPE! It messes up with image upload
                Authentication: key || ''
            },
            body: formData
        })
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const name = e.target.name

        setData(prevData => ({
            ...prevData,
            [name]: e.target.value
        }))
    }
    return (
        <>
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
                <input className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-sm bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden" type="file" name="files" ref={ref} multiple />
                <button
                    type="submit"
                    className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-sm bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
                >
                    Upload
                </button>
            </form>
        </>
    );
};
