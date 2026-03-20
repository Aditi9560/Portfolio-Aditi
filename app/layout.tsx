import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

const SITE_URL = "https://aditiverma.dev";
const OG_DESCRIPTION =
  "Full-Stack Developer based in Bangalore, India — building enterprise apps with React, Node.js, .NET and Spring Boot. Open to new opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aditi Verma | Full-Stack Developer",
    template: "%s | Aditi Verma",
  },
  description: OG_DESCRIPTION,
  keywords: [
    "Aditi Verma",
    "Full-Stack Developer",
    "React Developer",
    "Node.js",
    "Next.js",
    "Spring Boot",
    ".NET",
    "Bangalore",
    "Software Engineer",
    "Portfolio",
    "Enterprise Apps",
  ],
  authors: [{ name: "Aditi Verma", url: SITE_URL }],
  creator: "Aditi Verma",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Aditi Verma | Full-Stack Developer",
    description: OG_DESCRIPTION,
    siteName: "Aditi Verma Portfolio",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aditi Verma — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditi Verma | Full-Stack Developer",
    description: OG_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Accessibility: skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
