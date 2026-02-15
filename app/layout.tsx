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
  title: "GeekyZindagi",
  description: "Your platform for technology and lifestyle",
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
