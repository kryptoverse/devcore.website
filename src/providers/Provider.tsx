'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '../app/components/scroll-to-top'
import { Toaster } from 'react-hot-toast'
import SocketProvider from './SocketProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
                <SocketProvider>
                    {children}
                    <ScrollToTop />
                    <Toaster />
                </SocketProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}
