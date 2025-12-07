import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { siteConfig } from "@/constants/site";

// with template %
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
