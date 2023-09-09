import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='text-center'>
            <p className='mt-10'>Requested post does not exist</p>
            <Link href="/projects">Back to Projects</Link>
        </div>
    )
}