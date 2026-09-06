import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Ammad Waseem - Full-Stack AI & Automation Engineer',
    template: '%s | Ammad Waseem',
  },
  description:
    'Full-Stack AI & Automation Engineer experienced in building scalable web applications, AI-powered platforms, REST APIs, RAG chatbots, and workflow automation.',
  keywords: [
    'Ammad Waseem',
    'Web Developer',
    'AI Engineer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'Python',
    'MERN Stack',
    'Portfolio',
  ],
  authors: [
    {
      name: 'Ammad Waseem',
    },
  ],
  creator: 'Ammad Waseem',
  metadataBase: new URL('https://devcore.website'),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/logo.webp',
  },
  openGraph: {
    title: 'Ammad Waseem - Full-Stack AI & Automation Engineer',
    description:
      'Portfolio of Ammad Waseem, Full-Stack AI & Automation Engineer specializing in MERN stack, Next.js, and AI-powered platforms.',
    url: 'https://devcore.website',
    siteName: 'Ammad Waseem Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ammad Waseem - Full-Stack AI & Automation Engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ammad Waseem - Full-Stack AI & Automation Engineer',
    description:
      'Portfolio of Ammad Waseem, Full-Stack AI & Automation Engineer specializing in MERN stack, Next.js, and AI-powered platforms.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

