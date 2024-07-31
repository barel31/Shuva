import '@/styles/globals.css';

import { type Metadata } from 'next';
import { getContactInfo, getRoutes } from '@/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Accessibility from '@/components/Accessibility';
import { Rubik } from 'next/font/google';
import { cn } from '@/lib/utils';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME!,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
  keywords: process.env.NEXT_PUBLIC_SITE_KEYWORDS!,

  // NEED TO IMPLEMENT GOOGLE INDEX FOR THE WEBSITE
  // other: {
  //   'google-site-verification': 'oLou05k7JXCvfbsQl-8YhBq73nsGZwf6lViRe6E4lwI',
  // },
};

export default async function RootLayout({
  children,
  Modal,
}: {
  children: React.ReactNode;
  Modal: React.ReactNode;
}) {
  const [contactInfo, routes] = await Promise.all([getContactInfo, getRoutes]);

  console.log({routes});
  
  
  if (routes[0].name !== 'בית') {
    const homeIndex = routes.findIndex(route => route.name === 'בית');
    [routes[0], routes[homeIndex]] = [routes[homeIndex], routes[0]]; // Swap the first route with the home route
  }

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_PRODUCTION_URL} />
      </head>
      <body className={cn('bg-slate-50 dark:bg-slate-800', rubik.className)}>
        <ThemeProvider>
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
