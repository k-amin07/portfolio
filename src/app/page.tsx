import MyProfilePic from './components/MyProfilePic'
import { FaLinkedin, FaGithub, FaEnvelope, FaMedium } from 'react-icons/fa'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <MyProfilePic />
      <div className="w-full display-flex flex-column justify-center align-center text-align-center">
        <div className="mt-12 mb-12 text-4xl text-center dark:text-white">
          Hello and Welcome 👋&nbsp;
          <span className="whitespace-nowrap">
            I'm <span className="font-bold">Khizar</span>
          </span>
          <div className='mt-12 mb-12 text-xl text-center dark:text-white'>
            <p>As a Software Engineer I thrive on solving intricate challenges while embracing perpetual learning. Lets connect @</p>
            <br />
          </div>
          <div className="flex flex-row justify-center space-x-6 align-middle dark:text-white">
            <Link href="https://www.linkedin.com/in/k-amin07" target="_blank"><FaLinkedin size={48}/></Link>
            <Link href="mailto:khizaramin95@gmail.com" target="_blank"><FaEnvelope size={48} /></Link>
            <Link href="https://www.github.com/k-amin07" target="_blank"><FaGithub size={48} /></Link>
            <Link href="https://medium.com/@khizaramin95" target="_blank"><FaMedium size={48} /></Link>
          </div>
          <div className="mt-12 mb-12 text-sm text-center dark:text-white">
            <p className=" overflow-hidden whitespace-nowrap pr-5 text-xs text-white">Warning: Risk of getting stuck in an infinite loop! The navbar on the top points to my Resume which points back to this website. Proceed with caution!</p>
          </div>
        </div>
      </div>
    </main>
  )
}
