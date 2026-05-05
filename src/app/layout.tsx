import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fabrik19 ServiceFlow Concept",
  description:
    "A product-style front-end concept inspired by Fabrik19's low-code platforms, signage, white-label apps, and booking flows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full', 'antialiased', spaceGrotesk.variable, geistMono.variable, 'font-sans')}
    >
      <body className="min-h-full flex flex-col bg-[#06111d] text-white">{children}</body>
    </html>
  );
}
