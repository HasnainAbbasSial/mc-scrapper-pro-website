import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MC Scrapper Pro - Advanced SaferWeb & FMCSA Data Scraper",
  description: "The ultimate tool for dispatchers and brokers to scrape MC and DOT data automatically from SaferWeb. Fast, secure, and efficient.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "MC Scrapper Pro",
    description: "Automate your lead generation with MC Scrapper Pro.",
    url: "https://mcscrap.eptasky.com",
    siteName: "MC Scrapper Pro",
    images: [
      {
        url: "/hero-dashboard.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        {/* Global Dynamic Background */}
        <div className="fixed inset-0 -z-10 bg-[#0f172a] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
