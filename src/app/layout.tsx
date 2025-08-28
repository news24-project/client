import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FooterLayout, NavbarLayout } from "@/layout";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News 24",
  description:
    "Stay updated with News 24 — breaking news, politics, sports, technology, and culture from Uzbekistan and around the globe.",
  icons: {
    icon: "/images/news24-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <NavbarLayout />
          {children}
          <FooterLayout />
        </Providers>
      </body>
    </html>
  );
}
