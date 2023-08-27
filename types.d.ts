type Meta = {
    id?: string,
    title: string,
    date: string,
    tags?: string[]
}

type BlogPost = {
    id: string,
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type Timeline = {
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

// type Timeline = {
//     elements: TimelineElement[],
// }

type Project = {
    name: string,
    icon: string,
    technologies: string[],
    git?: string,
}