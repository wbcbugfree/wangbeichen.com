import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beichen Wang | Soil Scientist & Knowledge Engineer",
  description:
    "Academic homepage of Beichen Wang — PhD researcher working at the intersection of soil science, knowledge graphs, and semantic web technologies.",
  authors: [{ name: "Beichen Wang" }],
  keywords: [
    "Beichen Wang",
    "soil science",
    "knowledge graphs",
    "semantic web",
    "ontology",
    "SKOS",
    "PhD researcher",
  ],
  openGraph: {
    title: "Beichen Wang",
    description:
      "PhD researcher in soil science and knowledge engineering. Building knowledge graphs and ontologies for soil data interoperability.",
    type: "website",
    url: "https://wangbeichen.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {/* pt-12 accounts for the fixed 48px (h-12) navbar */}
        <div className="pt-12">{children}</div>
      </body>
    </html>
  );
}
