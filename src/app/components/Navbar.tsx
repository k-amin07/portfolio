'use client'
import React, {useState} from "react"
import { Transition } from "@headlessui/react";

import Link from "next/link"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const nodeRef = React.useRef(null)
    return (
        <nav className="shadow-sm fixed sticky w-full z-10 my-2">
            <div className="w-full">
                <div className="flex items-center h-16 w-full">
                    <div className="flex items-center justify-between mx-20 w-full">
                        <div className="flex items-center justify-center flex-shrink-0">
                            <h1 className="font-bold text-xl cursor-pointer">
                                <Link href="/" className="text-white/90 no-underline hover:text-white">
                                    Khizar Amin
                                </Link>
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4 ml-10">
                                <Link className="text-white/90 no-underline hover:text-white font-bold" href="/projects" >Projects</Link>
                                <Link className="text-white/90 no-underline hover:text-white font-bold" href="/experience" >Experience</Link>
                                <Link className="text-white/90 no-underline hover:text-white font-bold" href='https://drive.google.com/file/d/1jYIkj4xz3PWRaWBZT2bY1Gim_uKvdIys/view?usp=sharing' target="_blank">Resume</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:hidden mr-10">
                        <button aria-controls="mobile-menu" aria-expanded="false" className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white" onClick={()=>{setIsOpen(!isOpen)}}>
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <Transition
                show={isOpen} enter="transition ease-out duration-100 transform" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75 transform" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="md:hidden" id="mobile-menu">
                        <div ref={nodeRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border border-sky-500 mx-12">
                            <ul className="flex flex-col items-center space-y-4">
                                <li> <Link className="text-white/90 no-underline hover:text-white font-bold" href="/projects" onClick={()=>{setIsOpen(!isOpen)}}>Projects</Link> </li>
                                <li> <Link className="text-white/90 no-underline hover:text-white font-bold" href="/experience" onClick={()=>{setIsOpen(!isOpen)}}>Experience</Link></li>
                                <li> <Link className="text-white/90 no-underline hover:text-white font-bold" href='https://drive.google.com/file/d/1jYIkj4xz3PWRaWBZT2bY1Gim_uKvdIys/view?usp=sharing' target="_blank" onClick={()=>{setIsOpen(!isOpen)}}>Resume</Link></li>
                            </ul>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    )
}