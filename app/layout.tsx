import type { Metadata } from "next";
import { Calistoga, Montserrat } from "next/font/google";
import "./globals.css";
import React from "react";
import { CabinetLocationProvider } from "@/app/context/CabinetLocationContext";
import { Footer } from "@/app/components/Footer";

const calistoga = Calistoga({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-topbar",
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
        className={`${calistoga.variable} ${montserrat.variable} antialiased font-body`}
      >
        <CabinetLocationProvider>{children}</CabinetLocationProvider>
        <Footer />
      </body>
    </html>
  );
}
