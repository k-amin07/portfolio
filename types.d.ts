type Meta = {
    _id?: string,
    title: string,
    date: string,
    tags?: string[]
}

type BlogPost = {
    _id: string,
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type Timeline = {
    _id?: string,
    sr: number,
    type: string,
    date: string,
    title: string,
    subtitle: string,
    description: string,
    url: string,
    technologies?: string[],
    GPA?: number
}

type TimelinePostMeta = {
    _id?: string,
    title: string,
    subtitle: string,
    date: string,
}

type TimelinePost = {
    _id?: string,
    timelineId?: string,
    meta: TimelinePostMeta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type Project = {
    name: string,
    icon: string,
    technologies: string[],
    git?: string,
}