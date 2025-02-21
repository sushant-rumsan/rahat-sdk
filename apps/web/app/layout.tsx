import {Geist, Geist_Mono} from 'next/font/google';

import {Providers} from '@/components/providers';
import '@rumsan/shadcn-ui/globals.css';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

//TODO: Update app metadata
export const metadata = {
  title: '[App Name]',
  description:
    'This is a Rumsan sample app. Update this description for SEO friendliness.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
