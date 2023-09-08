import Link from 'next/link'
import Typewriter from './TypeWriter'
import { Tooltip } from '@mui/material';

import { FaLinkedin, FaGithub, FaEnvelope, FaMedium, FaNode, FaPython, FaAws } from 'react-icons/fa'
import { TbBrandNextjs, TbBrandGraphql, TbBrandTypescript, TbBrandJavascript } from "react-icons/tb";
import { SiAmazonec2, SiAwslambda, SiRedis } from "react-icons/si";

export default function Socials() {
    return (
        <>
            <div className="flex flex-row justify-center space-x-6 align-middle dark:text-white">
                <Link href="https://www.linkedin.com/in/k-amin07" target="_blank"><FaLinkedin size={48} /></Link>
                <Link href="mailto:khizaramin95@gmail.com" target="_blank"><FaEnvelope size={48} /></Link>
                <Link href="https://www.github.com/k-amin07" target="_blank"><FaGithub size={48} /></Link>
                <Link href="https://medium.com/@khizaramin95" target="_blank"><FaMedium size={48} /></Link>
            </div>
            <div className="mt-12 mb-12 text-sm text-center dark:text-white">
                <Typewriter
                    text="&zwnj;Warning: Risk of getting stuck in an infinite loop! The navbar on the top points to my Resume which points back to this website. Proceed with caution!"
                    delay={10}
                />
            </div>
            <div className="mt-12 text-2xl text-center dark:text-white">
                <h1 className="mb-2 text-2xl font-bold">Tech Stack</h1>
                <div className="flex flex-row justify-center space-x-6 align-middle dark:text-white">
                    <Tooltip title="NodeJS"><FaNode size={36} /></Tooltip>
                    <Tooltip title="Typescript"><TbBrandTypescript size={36} /></Tooltip>
                    <Tooltip title="Javascript"><TbBrandJavascript size={36} /></Tooltip>
                    <Tooltip title="Python"><FaPython size={36} /></Tooltip>
                    <Tooltip title="GraphQL"><TbBrandGraphql size={36} /></Tooltip>
                    <Tooltip title="NextJS"><TbBrandNextjs size={36} /></Tooltip>
                </div>
                <div className="mt-4 flex flex-row justify-center space-x-6 align-middle dark:text-white">
                    <Tooltip title="AWS"><FaAws size={32} /></Tooltip>
                    <Tooltip title="EC2"><SiAmazonec2 size={32} /></Tooltip>
                    <Tooltip title="Lambda"><SiAwslambda size={32} /></Tooltip>
                    <Tooltip title="Redis"><SiRedis size={32} /></Tooltip>
                </div>
            </div>
        </>
    )
}