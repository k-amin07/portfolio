import { redirect } from "next/navigation";

export default async function Page() {
    const resumeURL = process.env.NEXT_PUBLIC_RESUME_LINK || '/'
    redirect(resumeURL)
}
