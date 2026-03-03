import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";
import { VignetteOverlay } from "@/components/VignetteOverlay";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2a221b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Portrait Photography | Timeless Portraits",
    template: "%s | Portrait Photography",
  },
  description:
    "Fine art portrait photography with a timeless, cinematic aesthetic. Warm sepia tones and temple-inspired elegance for lasting memories.",
  keywords: [
    "portrait photography",
    "fine art portraits",
    "vintage photography",
    "cinematic portraits",
    "timeless portraits",
  ],
  authors: [{ name: "Portrait Photography" }],
  creator: "Portrait Photography",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Portrait Photography",
    title: "Portrait Photography | Timeless Portraits",
    description:
      "Fine art portrait photography with a timeless, cinematic aesthetic.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portrait Photography | Timeless Portraits",
    description: "Fine art portrait photography with a timeless, cinematic aesthetic.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-screen antialiased font-sans">
        <Nav />
        {children}
        <VignetteOverlay />
        <GrainOverlay />
      </body>
    </html>
  );
}
