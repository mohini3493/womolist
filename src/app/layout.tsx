import type { Metadata } from "next";
import { Inter } from "next/font/google";
import EmbedResizeReporter from "@/components/EmbedResizeReporter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Womopreneur Directory",
  description: "A directory of women entrepreneurs — filter by nationality, region, industry, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        {children}
        <EmbedResizeReporter />
      </body>
    </html>
  );
}
