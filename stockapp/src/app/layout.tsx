import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'StockPulse — Real-time Stock & Crypto Tracker',
  description: 'Track stocks and cryptocurrencies with live charts, portfolio analytics, and market insights.',
  keywords: ['stocks', 'crypto', 'portfolio tracker', 'market analysis', 'bitcoin', 'finance'],
  openGraph: {
    title: 'StockPulse',
    description: 'Real-time Stock & Crypto Tracker',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0f1117] text-[#e2e8f0] antialiased`}>
        <AuthProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 overflow-y-auto pt-16 transition-all duration-300" id="main-content">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
