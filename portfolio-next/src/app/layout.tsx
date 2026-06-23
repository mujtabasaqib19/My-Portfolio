import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  // width=device-width, initial-scale=1 are applied by Next's default;
  // we keep pinch-zoom enabled for accessibility and just colour the
  // mobile browser chrome to match the dark site.
  themeColor: "#011013",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Mujtaba Saqib — Data Engineer & AI Specialist",
  description:
    "Portfolio of Mujtaba Saqib — Data Engineer & AI Specialist building scalable ETL pipelines, data warehouses, and AI-powered analytics systems.",
  keywords: "Data Engineer, ETL, Snowflake, Airflow, dbt, Python, Machine Learning, LLMs",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
