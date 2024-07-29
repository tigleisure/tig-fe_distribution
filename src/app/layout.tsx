import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import ReactQueryProvider from '@providers/ReactQueryProvider';
import GoogleAnalytics from '@lib/GoogleAnalytics';
import ObserveRouteLogin from '@components/all/ObserveRouteLogin';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TIG | 티그',
  description: '쉽고 편리한 여가 예약 플랫폼',
  icons: {
    icon: '/svg/tig.svg',
  },
  openGraph: {
    title: '티그',
    images: [
      {
        url: 'https://tigleisure.com/png/tigOpenGraphImg.png',
      },
    ],
    type: 'website',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ObserveRouteLogin />
      </body>
    </html>
  );
}
