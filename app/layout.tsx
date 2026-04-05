import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'ProductHub - Product Management',
  description: 'Professional Inventory Management System',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-50 dark:bg-gray-950">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 md:ml-64 min-h-screen p-6 md:p-10">
            {children}
          </main>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}