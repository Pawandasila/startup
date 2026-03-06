import type { Metadata, Viewport } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/shared/navbar";
import { Footer } from "@/components/layout/shared/footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffefa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Luxe Rental — Rent Designer Fashion",
    template: "%s | Luxe Rental",
  },
  description:
    "A digital sanctuary for the modern connoisseur. Rent designer fashion from Prada, Loewe, Khaite, Celine, and more. Curating excellence in sustainable luxury.",
  keywords: [
    "luxury fashion rental",
    "designer dress rental",
    "rent designer clothes",
    "sustainable fashion",
    "haute couture rental",
  ],
  authors: [{ name: "Luxe Rental" }],
  creator: "Luxe Rental",
  metadataBase: new URL("https://luxerental.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Luxe Rental",
    title: "Luxe Rental — Rent Designer Fashion",
    description:
      "Rent designer fashion from the world\u0027s most sought-after houses. Sustainable luxury for every occasion.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Rental — Rent Designer Fashion",
    description:
      "Rent designer fashion from the world\u0027s most sought-after houses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${inter.variable} font-sans antialiased mobile-view`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
