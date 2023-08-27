import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
            <div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                    <Link href="/" className="text-white/90 no-underline hover:text-white">
                        Khizar Amin
                    </Link>
                </h1>
                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-3xl lg:text-3xl">
                    <Link className="text-white/90 no-underline hover:text-white" href="/projects" >Projects</Link>
                    <p className="cursor-default">|</p>
                    <Link className="text-white/90 no-underline hover:text-white" href="/experience" >Experience</Link>
                    <p className="cursor-default">|</p>
                    <Link className="text-white/90 no-underline hover:text-white" href='https://drive.google.com/file/d/1jYIkj4xz3PWRaWBZT2bY1Gim_uKvdIys/view?usp=sharing' target="_blank">Resume</Link>
                </div>
            </div>
        </nav>
    )
}