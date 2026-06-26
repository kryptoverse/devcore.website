import './globals.css'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import Providers from '../providers/Provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ammad Waseem — Backend, Blockchain & Game Developer',
  description: "Portfolio of Ammad Waseem, a backend, blockchain, and game developer. I build production REST APIs, secure Solidity smart contracts and Web3 dApps, full-stack web apps, and immersive 3D games in Unreal Engine 5. Available for freelance and hire.",
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
