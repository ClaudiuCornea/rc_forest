import React from "react";
import { Bebas_Neue, Barlow_Condensed, Barlow } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-cond",
  weight: ["400", "700"],
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        bebasNeue.variable,
        barlowCondensed.variable,
        barlow.variable
      )}
      suppressHydrationWarning
    >
      <head />
      <body
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
