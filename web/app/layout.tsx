import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ScrollRestoration } from "../components/common/ScrollRestoration";
import { ThemeProvider } from "../components/layout/ThemeProvider";
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
  metadataBase: new URL("https://blearthyseni.com"),

  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  title: "Bleart Hyseni - Full Stack Developer",
  description:
    "Personal portfolio of Bleart Hyseni, a Full Stack Web Developer focused on modern web applications, FastAPI, React, Next.js and PostgreSQL.",

  openGraph: {
    title: "Bleart Hyseni - Full Stack Developer",
    description:
      "Personal portfolio of Bleart Hyseni, a Full Stack Web Developer focused on modern web applications.",
    url: "https://blearthyseni.com",
    siteName: "Bleart Hyseni",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bleart Hyseni - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bleart Hyseni - Full Stack Developer",
    description:
      "Personal portfolio of Bleart Hyseni, a Full Stack Web Developer.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ScrollRestoration />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
