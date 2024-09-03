import '@/styles/globals.css';
import '@/styles/gold.css';

import { type Metadata } from 'next';
import { getContactInfo, getRoutes } from '@/lib/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import Accessibility from '@/components/Accessibility';
import { rubik } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME!,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS!,
  other: {
    'google-site-verification': 'oLou05k7JXCvfbsQl-8YhBq73nsGZwf6lViRe6E4lwI',
  },
};

export default async function RootLayout({
  children,
  Modal,
}: {
  children: React.ReactNode;
  Modal: React.ReactNode;
}) {
  const [contactInfo, routes] = await Promise.all([getContactInfo, getRoutes]);

  if (routes[0].name !== 'בית') {
    const homeIndex = routes.findIndex(route => route.name === 'בית');
    [routes[0], routes[homeIndex]] = [routes[homeIndex], routes[0]]; // Swap the first route with the home route
  }

  return (
    <html
      lang="he"
      dir="rtl"
      suppressHydrationWarning
      style={{ colorScheme: 'dark' }}>
      <head>
        <GoogleTagManager />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_URL} />
      </head>
      <body
        className={cn('bg-neutral-50 dark:bg-neutral-800', rubik.className)}>
        <ThemeProvider>
          <GoogleTagManagerNoscript />
          <Navbar routes={routes} contact={contactInfo} />

          <main>
            {children}
            {Modal}
          </main>

          <Footer routes={routes} contact={contactInfo} />
        </ThemeProvider>

        <Accessibility />
      </body>
    </html>
  );
}
