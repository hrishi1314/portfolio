import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* FOUT prevention: set data-theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio_theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
