import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/smooth-scrolling";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${archivoBlack.variable} antialiased`}>
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
