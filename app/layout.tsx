import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

// Absolute base for all social/OG image URLs. In production, set
// NEXT_PUBLIC_SITE_URL to your deployed domain (e.g. https://havenbridge.org).
// Locally we fall back to the dev server so previews don't break.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HavenBridge - Bridge Children to Safety',
    template: '%s | HavenBridge',
  },
  description: 'HavenBridge helps fund licensed foster homes, developmental programs, and life-changing care so children can grow in safe environments and discover their potential.',
  keywords: ['foster care', 'nonprofit', 'child support', 'foster homes', 'donations', 'child welfare'],
  authors: [{ name: 'HavenBridge' }],
  creator: 'HavenBridge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'HavenBridge',
    title: 'HavenBridge - Bridge Children to Safety',
    description: 'Help children in foster care access safe, healthy, supportive homes and development resources.',
    images: [{ url: '/logo.png', width: 1080, height: 1080, alt: 'HavenBridge Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HavenBridge - Bridge Children to Safety',
    description: 'Help children in foster care access safe, healthy, supportive homes and development resources.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0EA5E9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <ScrollToTop />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
