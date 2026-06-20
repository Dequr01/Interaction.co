import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { InkBackground } from '@/components/molecules/InkBackground';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { HashReset } from '@/components/providers/HashReset';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Interaction',
  description: 'Your vision, our Innovation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${interTight.variable} font-sans text-text-primary antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HashReset />
          <InkBackground />
          <ThemeToggle />
          <div id="main-scroll-container" className="h-screen w-full overflow-y-auto overflow-x-hidden relative z-0">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
