import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Hrishikesh R | Computer Science & AI/ML",
  description:
    "Portfolio of Hrishikesh R, a Computer Science and Engineering student focused on AI/ML, Generative AI, software engineering, and Data Structures & Algorithms.",
  keywords: [
    "Hrishikesh R",
    "Computer Science",
    "AI/ML",
    "Machine Learning",
    "Generative AI",
    "Software Engineering",
    "Portfolio",
    "LPU",
    "Lovely Professional University",
  ],
  authors: [{ name: "Hrishikesh R" }],
  openGraph: {
    title: "Hrishikesh R | Computer Science & AI/ML",
    description:
      "Portfolio of Hrishikesh R, a Computer Science and Engineering student focused on AI/ML, Generative AI, software engineering, and Data Structures & Algorithms.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrishikesh R | Computer Science & AI/ML",
    description:
      "Portfolio of Hrishikesh R — CS student focused on AI/ML and Software Engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
