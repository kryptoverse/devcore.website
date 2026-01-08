import './globals.css'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import Providers from '../providers/Provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevCore - Innovative Web & Blockchain Solutions',
  description: 'DevCore specializes in UI/UX design, website development, blockchain development, game development, and AI automation. Transform your business with cutting-edge technology.',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
