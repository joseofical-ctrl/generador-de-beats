import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Beat Maker – Generador de Beats',
  description:
    'Crea y reproduce tus propios ritmos con Beat Maker, un secuenciador interactivo de beats en el navegador.',
  keywords: ['beat maker', 'drum machine', 'sequencer', 'music', 'rhythm'],
  authors: [{ name: 'Beat Maker' }],
  openGraph: {
    title: 'Beat Maker – Generador de Beats',
    description: 'Crea y reproduce ritmos con esta drum machine interactiva.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-gray-950 text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
