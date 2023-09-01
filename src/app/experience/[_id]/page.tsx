import { getTimeLineIds } from "@/lib/timeline"
import { getTimelinePostbyId } from "@/lib/timelineposts"
import NotFound from "./not-found"
import Link from "next/link"

type Props = {
    params: {
        _id: string
    }
}

export async function generateStaticParams() {
    const posts = await getTimeLineIds()
    const ids = posts.map(post => {
        return {
            _id: post._id.toString()
        }
    })
    if (!posts) return []
    return ids
}

export async function generateMetadata({ params: { _id } }: Props) {
    const post = await getTimelinePostbyId(_id)

    if (!post) {
        return {
            title: "Post Not Found"
        }
    }
    return {
        title: post.meta.title,
        description: post.meta.subtitle,

    }
}

export default async function page({params: {_id}}: Props) {
    const post = await getTimelinePostbyId(_id)
    if(!post) {
        return NotFound()
    }
    const { meta, content } = post
    
    return (
        <div className="px-4 md:px-6 mx-auto prose prose-xl prose-slate dark:prose-invert">
            <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
            <p className="mt-0 text-sm">{meta.date}</p>
            <article>{content}</article>
            <p className="mb-10">
                <Link href="/experience">Back to Experience</Link>
            </p>
        </div>
    )
}