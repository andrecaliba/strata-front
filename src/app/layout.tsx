import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/components/custom/QueryProvider";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Strata",
  description: "Productivity Web Application",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
