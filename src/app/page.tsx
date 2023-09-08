import MyProfilePic from './components/MyProfilePic'
import Socials from './components/Socials'

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <MyProfilePic />
      <div className="w-full display-flex flex-column justify-center align-center text-align-center">
        <div className="mt-12 mb-6 text-4xl text-center dark:text-white">
          Hello 👋&nbsp;
          <span className="whitespace-nowrap">
            I&apos;m <span className="font-bold">Khizar</span>
          </span>
          <div className='mt-12 mb-4 text-xl text-center dark:text-white'>
            <p>As a Software Engineer I thrive on solving intricate challenges while embracing perpetual learning. Lets connect @</p>
            <br />
          </div>
          <Socials/>
        </div>
      </div>
    </main>
  )
}
