
import { getTimeline } from "@/lib/timeline";
import { notFound } from "next/navigation";
import Vtl from "./vtl";


export async function generateMetadata() {
    const timeline = await getTimeline()

    if (!timeline) {
        return {
            title: "Page Not Found"
        }
    }
    return {
        title: "Khizar Amin - Experience",
        description: "Khizar Amin's Experience",
        openGraph: {
            title: "Khizar Amin - Experience",
            description: "Khizar Amin's Experience",
        },
    }
}

export default async function page() {
    const timeline  = await getTimeline()
    if(!timeline) {
        return notFound()
    }

    return (
        <section>
            <Vtl timeline={timeline} />
        </section>
    )
}