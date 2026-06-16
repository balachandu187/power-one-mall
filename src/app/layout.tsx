import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CursorGlow from '@/components/ui/CursorGlow';
import SmoothScroll from '@/components/layout/SmoothScroll';
import BackgroundAnimation from '@/components/ui/BackgroundAnimation';
import LoadingScreen from '@/components/ui/LoadingScreen';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Power One Mall | Vijayawada\'s Premier Retail & Lifestyle Destination',
  description: 'Experience premium shopping, dining, and world-class cinema at Power One Mall, Vijayawada, India. Featuring 170,000+ sq ft of luxury brands, a vibrant food court, and multiplex entertainment.',
  keywords: 'Power One Mall, Vijayawada Mall, Shopping in Vijayawada, Food Court Vijayawada, Inox Movies Vijayawada, Andhra Pradesh Shopping Mall',
  openGraph: {
    title: 'Power One Mall | Vijayawada\'s Premier Destination',
    description: 'Explore the ultimate hub for global brands, fine dining, and family entertainment in Vijayawada, India.',
    url: 'https://poweronemall.com',
    siteName: 'Power One Mall',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="true" />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ShoppingCenter',
              'name': 'Power One Mall',
              'url': 'https://poweronemall.com',
              'logo': 'https://poweronemall.com/logo.png',
              'image': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800',
              'description': 'Power One Mall is Vijayawada\'s ultimate destination for premium shopping, dining, and immersive family entertainment.',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'MG Road, Labbipet',
                'addressLocality': 'Vijayawada',
                'addressRegion': 'Andhra Pradesh',
                'postalCode': '520010',
                'addressCountry': 'IN',
              },
              'telephone': '+91 866 6691100',
              'openingHoursSpecification': {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
                ],
                'opens': '10:00',
                'closes': '22:00'
              }
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden max-w-full">
        <LoadingScreen />
        <SmoothScroll>
          <BackgroundAnimation />
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          {/* Padding top to push layout below fixed header */}
          <main className="flex-grow pt-[72px] relative z-10 overflow-x-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
