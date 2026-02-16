import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import React from "react";
import { CabinetLocationProvider } from "@/app/context/CabinetLocationContext";
import { Footer } from "@/app/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cabinet Sandrine Rombaut",
  description: "Cabinet d'ergotherapie a Carvin et Haisnes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased font-body`}
      >
        <CabinetLocationProvider>{children}</CabinetLocationProvider>
        <Footer />
      </body>
    </html>
  );
}
