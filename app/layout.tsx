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
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
