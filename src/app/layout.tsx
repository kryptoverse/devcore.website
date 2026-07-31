import './globals.css'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import Providers from '../providers/Provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ammad Waseem — MERN Stack AI and Android/iOS App Engineer',
  description: "Portfolio of Ammad Waseem, a MERN stack AI engineer and Android/iOS app developer. I build intelligent full-stack web applications powered by AI, robust REST APIs, secure Solidity smart contracts, Web3 dApps, and modern mobile applications. Available for freelance and hire.",
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
