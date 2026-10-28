import type { Metadata, Viewport } from 'next';
import './globals.css';

const description = 'One scan to swap everything. One place to remember everyone. Join the goen beta.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goen-landing.vercel.app'),
  title: 'goen — Get more out of your relationships',
  description,
  openGraph: {
    title: 'goen — Get more out of your relationships',
    description,
    images: [{ url: '/img/hero-grey.webp', width: 1536, height: 1024, alt: 'Friends gathered and talking in a bright studio' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'goen — Get more out of your relationships', description, images: ['/img/hero-grey.webp'] },
};

export const viewport: Viewport = { themeColor: '#f5f1e8' };

// Adds the `motion` class before first paint so reveal-on-scroll elements start hidden without a flash.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="preload"
          as="image"
          href="/img/hero-grey.webp"
          imageSrcSet="/img/hero-grey-sm.webp 900w, /img/hero-grey.webp 1536w"
          imageSizes="100vw"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
