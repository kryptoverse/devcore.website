import './globals.css'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import Providers from '../providers/Provider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'DevCore - Web Development, Blockchain & AI Solutions',
    template: '%s | DevCore'
  },
  description: 'DevCore provides cutting-edge web development, blockchain development, game development, UI/UX design, and AI & automation solutions. Transform your digital presence with our expert team.',
  keywords: ['web development', 'blockchain development', 'game development', 'UI/UX design', 'AI automation', 'software development', 'DevCore', 'digital solutions'],
  authors: [{ name: 'DevCore Team' }],
  creator: 'DevCore',
  publisher: 'DevCore',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://devcore.website'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devcore.website',
    siteName: 'DevCore',
    title: 'DevCore - Web Development, Blockchain & AI Solutions',
    description: 'DevCore provides cutting-edge web development, blockchain development, game development, UI/UX design, and AI & automation solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevCore - Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCore - Web Development, Blockchain & AI Solutions',
    description: 'DevCore provides cutting-edge web development, blockchain development, game development, UI/UX design, and AI & automation solutions.',
    images: ['/twitter-image.png'],
    creator: '@devcore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
