import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aleke Kingsley Udochukwu | Doctor, Developer & Entrepreneur",
  description:
    "The personal portfolio of Aleke Kingsley Udochukwu, a medical graduate, software developer, AI and machine learning enthusiast, and entrepreneur.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <ScrollProgress/>

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}