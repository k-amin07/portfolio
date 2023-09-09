import Link from "next/link"

type Props = {
    meta: TimelinePostMeta | ProjectMeta,
    content: string
    parent: string
}

export default function MdxDisplay({ meta, content, parent }: Props) {
    const title = "subtitle" in meta && meta.subtitle ? `${meta.subtitle} - ${meta.title}` : meta.title
    let metatags = "tags" in meta && meta.tags?.length ? meta.tags : ""
    metatags = typeof metatags === 'string' && metatags.length ? metatags.split(",") : Array.isArray(metatags) ? metatags : []
    let tags = metatags.map((tag, i) => (
        <Link key={i} href={`/${parent.toLowerCase()}/tag/${tag}`}>{tag}</Link>
    ))

    return (
        <div className="w-full display-flex flex-column justify-center align-center text-align-center">
            <div className="px-4 md:px-6 mx-auto prose prose-xl prose-stone-950 bg-slate-200 rounded-md">
                <h2 className="text-3xl mt-4 mb-0 text-stone-950 py-5">{title}</h2>
                <p className="mt-0 text-sm text-stone-900">{meta.date}</p>
                <article className="text-stone-950 text-justify mx-5">{content}</article>
                {tags.length ? 
                    <section>
                        <h4>Related:</h4>
                        <div className="flex flex-row gap-4">
                            {tags}
                        </div>
                    </section>
                    : null
                }
                <p className="mb-10 ">
                    <Link href={`/${parent.toLowerCase()}`} className="text-stone-900">Back to {parent}</Link>
                </p>
            </div>
        </div>
    )
}