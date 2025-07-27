import type React from "react";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { profile } from "console";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Karan Chawla - Personal Website",
  description: "Personal website and portfolio",
  icons: {
    icon: "/profile.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className={`${nunitoSans.className} antialiased`}>{children}</body>
    </html>
  );
}
