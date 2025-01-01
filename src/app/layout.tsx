import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import ReactQueryProvider from '@providers/ReactQueryProvider';
import GoogleAnalytics from '@lib/GoogleAnalytics';
import ObserveRouteLogin from '@components/all/ObserveRouteLogin';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '티그',
  description: '쉽고 편리한 여가 예약 플랫폼, 티그',
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
    url: 'https://tigleisure.com',
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
  verification: {
    google: 'KQwY2GiXDthatwkTYIgC_dR9eeNVpbitvB6RZOYqdk8',
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
    <html lang="ko">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Suspense>
          <ObserveRouteLogin />
        </Suspense>
      </body>
    </html>
  );
}
