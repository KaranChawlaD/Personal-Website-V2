import type React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap", // Prevents invisible text during font load
  preload: true, // Preloads the font for better performance
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
    description: "Engineering Science student at the University of Toronto. Passionate about robotics, software engineering, and building innovative solutions. Explore my projects, experience, and journey in technology.",
    images: [
      {
        url: `${siteUrl}/profile.png`,
        width: 1200,
        height: 1200,
        alt: "Karan Chawla - Engineering Science student at University of Toronto",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karan Chawla - Engineering Science @ UofT",
    description: "Engineering Science student at the University of Toronto. Passionate about robotics, software engineering, and building innovative solutions. Explore my projects, experience, and journey in technology.",
    images: [`${siteUrl}/profile.png`],
    creator: "@KaranChawlaD",
    site: "@KaranChawlaD",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Portfolio",
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  other: {
    "dns-prefetch": "https://webring.skule.ca",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Structured data for SEO
const personJsonLd = {
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
    addressRegion: "Ontario",
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
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "Java",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Engineering Science Student",
    occupationLocation: {
      "@type": "City",
      name: "Toronto",
    },
  },
};

// Website structured data
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Karan Chawla - Personal Website",
  url: "https://www.karan-chawla.com",
  description: "Engineering Science student at the University of Toronto. Passionate about robotics, software engineering, and building innovative solutions.",
  author: {
    "@type": "Person",
    name: "Karan Chawla",
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.karan-chawla.com/?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Structured data for projects and experience - moved from page.tsx
const projects = [
  {
    title: "Echo — Agentic Voice AI to Get Help",
    description:
      "End-to-end full-stack app to automate outbound phone communications using autonomous voice agents. Integrated Twilio + VAPI for real-time audio streaming, transcription, and LLM-based decision-making during active calls.",
    link: "https://github.com/KaranChawlaD/Echo",
  },
  {
    title: "LipsLipsRevolution",
    description:
      "2x prize-winning project at HacktheNorth 2024. A hackathon-wide lip-syncing challenge.",
    link: "https://devpost.com/software/lipslips-revolution",
  },
  {
    title: "ConvoAI",
    description:
      "ConvoAI is an AI natural language processing tool that listens in on interviews to give you an edge over your competitors.",
    link: "https://dorahacks.io/buidl/13383",
  },
  {
    title: "FRC Code 2022-2025",
    description:
      "2x Provincial Finalists as Software Lead. Code organization for team 8729's FRC Robots.",
    link: "https://github.com/Spark-Youth-Robotics-Club-8729",
  },
];

const experience = [
  {
    title: "State Estimation Developer (C++/Python)",
    company: "SAE AutoDrive- Toronto Autonomous Vehicle Team",
    period: "Sep. 2025– Present",
  },
  {
    title: "Frontend Developer",
    company: "UofTHacks",
    period: "Oct. 2025– Present",
  },
  {
    title: "Autonomous Space Robotics Lab (ASRL) — Researcher",
    company:
      "University of Toronto Institute for Aerospace Studies (UTIAS)",
    period: "May 2026 - Aug 2026",
  },
  {
    title: "FIRST Robotics Competition — Robotics Team Captain & Software Lead",
    company: "FIRST Robotics Competition",
    period: "2021 - 2025",
  },
  {
    title: "Bruce Lab — Software Lab Assistant",
    company: "University of Ottawa",
    period: "2024",
  },
  {
    title: "Canadian Robotics & AI Ethics Design Lab — Research Assistant",
    company: "University of Ottawa",
    period: "2024",
  },
];

// Structured data for projects
const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projects.map((project, index) => ({
    "@type": "SoftwareApplication",
    position: index + 1,
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    ...(project.link ? { url: project.link } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  })),
};

// Structured data for experience
const experienceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: experience.map((exp, index) => ({
    "@type": "JobPosting",
    position: index + 1,
    title: exp.title,
    hiringOrganization: {
      "@type": "Organization",
      name: exp.company,
    },
    datePosted: exp.period.split(" - ")[0],
    validThrough: exp.period.includes(" - ") ? exp.period.split(" - ")[1] : exp.period,
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunitoSans.variable} suppressHydrationWarning>
      <body className={`${nunitoSans.className} antialiased`}>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  // Default to dark mode
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
