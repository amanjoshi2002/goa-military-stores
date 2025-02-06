import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getCookie } from 'cookies-next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Goa Military Store',
  description: 'Established in 1995, Goa Military Store offers a wide range of military products and accessories. Explore our collection of quality items for all your military needs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
