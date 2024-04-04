'use client'

import Link from "next/link"

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <div className='text-center'>
            <h1 className='mt-10 font-bold text-xl'>Error: {error.message}</h1>
            <Link href="/" className="my-10">Back to Home</Link>
            <br/>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}