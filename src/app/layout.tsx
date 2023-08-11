import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hero Tickets',
  description: 'Crie seu evento rápido e fácil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ToastContainer />
        <Navbar />
        <Sidebar />
        <div className="mb-8 mt-16 mr-14">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
