import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Inter, Poppins } from 'next/font/google';
import { AuthProvider } from '@/components/providers/auth-provider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'SwiftRoute Logistics',
  description: 'Reliable, Fast, Secure. Your Global Logistics Partner.',
  icons: {
    icon: '/logo.svg',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ Fetch session server-side for instant hydration
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialSession={session}>
            <div className="flex min-h-screen flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
