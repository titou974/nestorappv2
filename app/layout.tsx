import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { siteConfig } from "@/constants/site";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: siteConfig.metadataBase,
  title: {
    ...siteConfig.title,
  },
  description: siteConfig.description,
  openGraph: {
    ...siteConfig.openGraph,
  },
  twitter: {
    ...siteConfig.twitter,
  },
};

console.log("metadata", metadata);

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
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
