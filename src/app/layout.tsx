import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/smooth-scrolling";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Socrates Studio | Creative & Branding Agency",
  description: "The content system behind the brands your industry talks about. End-to-end branding, cinematic media, and socials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
