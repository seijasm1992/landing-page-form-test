import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Westy – Creative Digital Agency',
  description:
    'Westy is an award-winning digital agency specializing in creative design and development for modern brands.',
  metadataBase: new URL('https://westy.agency'),
  openGraph: {
    title: 'Westy – Creative Digital Agency',
    description:
      'Westy is an award-winning digital agency specializing in creative design and development for modern brands.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Westy – Creative Digital Agency',
    description:
      'Westy is an award-winning digital agency specializing in creative design and development for modern brands.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
