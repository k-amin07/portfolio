import { TimelinePostModel } from "@/models/tlpost";
import dbConnect from "./dbConnect";

import { compileMDX } from "next-mdx-remote/rsc"

import rehypeAutolinkHeadings from "rehype-autolink-headings/lib"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight/lib"
import Video from "@/app/components/Video"
import CustomImage from "@/app/components/CustomImage"
import { getTimelineElementById } from "./timeline";


export async function getTimelinePostbyId(_id: string) {
    await dbConnect();
    const post = await TimelinePostModel.findOne({timelineId: _id}).exec();

    if (!post) {
        return undefined
    }

    const mdxSource = `---\ntitle: ${post.meta.title}\ndate: ${post.meta.date}\n---\n\n${post.content}`

    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
        source: mdxSource,
        components: {
            Video,
            CustomImage
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {behavior: "wrap"}]
                ]
            }
        }
    })

    const timeLinePostObject: TimelinePost = {
        _id: _id,
        meta: {
            title: frontmatter.title,
            subtitle: post.meta.subtitle,
            date: frontmatter.date,
        },
        content: content
    }
    return timeLinePostObject
}

export async function addTimelinePost(content: string, timelineId: string) {
    await dbConnect();
    const tlData = await getTimelineElementById(timelineId)
    
    const createdPost = await TimelinePostModel.create({
        timelineId,
        meta: {
            title: tlData?.title,
            subtitle: tlData?.subtitle,
            date: tlData?.date
        },
        content
    });
    return createdPost
}