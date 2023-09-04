import Link from "next/link"

type Props = {
    meta: TimelinePostMeta | ProjectMeta,
    content: string
    parent: string
}

export default function MdxDisplay({ meta, content, parent }: Props) {
    return (
        <div className="w-full display-flex flex-column justify-center align-center text-align-center">
            <div className="px-4 md:px-6 mx-auto prose prose-xl prose-slate dark:prose-invert bg-slate-200 rounded-md">
                <h2 className="text-3xl mt-4 mb-0 text-stone-950">{meta.title}</h2>
                <p className="mt-0 text-sm text-stone-900">{meta.date}</p>
                <article className="text-stone-950">{content}</article>
                <p className="mb-10 ">
                    <Link href={`/${parent.toLowerCase()}`} className="text-stone-900">Back to {parent}</Link>
                </p>
            </div>
        </div>
    )
}