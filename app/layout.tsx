import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ReduxProvider } from "@/store/provider";
import { Toaster } from "@/components/ui/sonner";
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
  MicrosoftClarity,
} from "@/components/analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.geekyzindagi.com"),
  title: {
    default: "geekyZindagi | Technology meets Lifestyle",
    template: "%s | geekyZindagi",
  },
  description: "curated platform for tech implementation, creative building, and purposeful living. Join the geekyZindagi community to Build, Learn, and Grow.",
  keywords: ["technology", "lifestyle", "coding", "productivity", "wellness", "geekyZindagi"],
  authors: [{ name: "geekyZindagi Tribe" }],
  creator: "geekyZindagi",
  publisher: "geekyZindagi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "geekyZindagi | Technology meets Lifestyle",
    description: "curated platform for tech implementation, creative building, and purposeful living.",
    url: "https://www.geekyzindagi.com",
    siteName: "geekyZindagi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "geekyZindagi | Technology meets Lifestyle",
    description: "curated platform for tech implementation, creative building, and purposeful living.",
    creator: "@geekyzindagi",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager />
        <MicrosoftClarity />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerNoscript />
        <AuthProvider>
          <ReduxProvider>
            {children}
            <Toaster />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
