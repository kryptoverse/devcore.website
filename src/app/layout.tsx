import './globals.css'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import Providers from '../providers/Provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ammad Waseem — Full-Stack AI Developer | Android & iOS App Engineer',
  description: "Portfolio of Ammad Waseem, a full-stack AI developer and Android/iOS app engineer. I build AI-powered products and automation systems, mobile apps, full-stack web platforms and CRMs, robust REST APIs, and secure Solidity smart contracts and Web3 dApps. Available for freelance and hire.",
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
