import { getTimeLineIds } from "@/lib/timeline"
import { getTimelinePostbyId } from "@/lib/timelineposts"
import NotFound from "./not-found"
import Link from "next/link"
import MdxDisplay from "@/app/components/MdxDisplay"

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
        title: `Khizar Amin - ${post.meta.title}`,
        description: post.meta.subtitle,
        openGraph: {
            title: `Khizar Amin - ${post.meta.title}`,
            description: post.meta.subtitle,
        },
    }
}

export default async function page({params: {_id}}: Props) {
    const post = await getTimelinePostbyId(_id)
    if(!post) {
        return NotFound()
    }
    const { meta, content } = post
    
    return (
        <MdxDisplay meta={meta} content={content} parent="Experience" />
    )
}