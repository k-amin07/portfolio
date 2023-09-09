import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata:Metadata = {
  title: 'Khizar Amin',
  description: 'Khizar Amin\'s Portfolio',
  openGraph: {
    title: 'Khizar Amin',
    description: 'Khizar Amin\'s Portfolio',
  },
  metadataBase: new URL(process.env.SITE_URL!)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900">
        <Navbar />
        <main className="px-4 md:px-6 mx-auto text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
