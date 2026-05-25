import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Beichen Wang | PhD Candidate & Knowledge Graph Researcher",
  description:
    "Academic homepage of Beichen Wang, a PhD candidate at Wageningen University & Research working on soil health knowledge graphs, LLMs, NLP, and semantic web technologies.",
  authors: [{ name: "Beichen Wang" }],
  keywords: [
    "Beichen Wang",
    "Wageningen University & Research",
    "SoilWise",
    "soil science",
    "knowledge graphs",
    "large language models",
    "NLP",
    "semantic web",
    "ontology",
    "RDF",
    "SPARQL",
    "RAG",
    "PhD candidate",
  ],
  openGraph: {
    title: "Beichen Wang",
    description:
      "PhD candidate at Wageningen University & Research working on soil health knowledge graphs, controlled vocabularies, and RAG-based question answering.",
    type: "website",
    url: "https://wangbeichen.com",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://wangbeichen.com/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Computed at build time (static export — new Date() is the build timestamp)
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {/* pt-12 accounts for the fixed 48px (h-12) navbar */}
        <div className="pt-12">{children}</div>
        <Footer lastUpdated={lastUpdated} />
      </body>
    </html>
  );
}
