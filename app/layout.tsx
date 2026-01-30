import type React from "react";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

const siteUrl = "https://www.karan-chawla.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Karan Chawla - Personal Website",
    template: "%s | Karan Chawla",
  },
  description: "Engineering Science student at the University of Toronto. Passionate about robotics, software engineering, and building innovative solutions. Explore my projects, experience, and journey in technology.",
  keywords: [
    "Karan Chawla",
    "Karan Chawla Dora",
    "University of Toronto",
    "UofT",
    "Engineering Science",
    "Robotics",
    "Software Engineer",
    "Student",
    "Portfolio",
    "Personal Website",
    "FIRST Robotics",
    "FRC",
    "Computer Vision",
    "Control Theory",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Java",
  ],
  authors: [{ name: "Karan Chawla" }],
  creator: "Karan Chawla",
  publisher: "Karan Chawla",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/profile.png",
    apple: "/profile.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Karan Chawla - Personal Website",
    title: "Karan Chawla - Engineering Science @ UofT",
    description: "Engineering Science student at the University of Toronto. Passionate about robotics, software engineering, and building innovative solutions.",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Karan Chawla - Profile Picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Chawla - Engineering Science @ UofT",
    description: "Engineering Science student at the University of Toronto. Passionate about robotics, software engineering, and building innovative solutions.",
    images: ["/profile.png"],
    creator: "@KaranChawlaD",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Portfolio",
};

// Structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karan Chawla",
  alternateName: "Karan Chawla Dora",
  url: "https://www.karan-chawla.com",
  image: "https://www.karan-chawla.com/profile.png",
  jobTitle: "Engineering Science Student",
  worksFor: {
    "@type": "EducationalOrganization",
    name: "University of Toronto",
    url: "https://www.utoronto.ca",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of Toronto",
  },
  email: "karan.chawlad@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressCountry: "CA",
  },
  sameAs: [
    "https://github.com/karanchawlad",
    "https://linkedin.com/in/karan-chawla-dora",
    "https://www.instagram.com/_karan.chawla",
    "https://x.com/KaranChawlaD",
  ],
  knowsAbout: [
    "Robotics",
    "Software Engineering",
    "Computer Vision",
    "Control Theory",
    "Web Development",
    "Machine Learning",
    "FIRST Robotics Competition",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className={`${nunitoSans.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
