import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BookVerse | Discover Books You'll Love",
  description: "Browse thousands of books across different genres with a clean and enjoyable reading experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background selection:bg-primary/10 font-body-main antialiased min-h-screen flex flex-col">
        <QueryProvider>
          <Navbar />
          <main className="w-full flex-grow">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
