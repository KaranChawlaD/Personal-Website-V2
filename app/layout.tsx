import type React from "react";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Karan Chawla - Personal Website",
  description: "Engineering Science @ University of Toronto. Passioned by Robotics.",
  keywords: "UofT, University of Toronto, Engineer, Student, Engineering Science, Karan Chawla, Karan Chawla Dora, Robotics, Personal Website, Portfolio",
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
