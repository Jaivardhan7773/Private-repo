import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://tools.trendingtopics.space"),
  title: {
    default: "TrendingTopics Tools — Free Online Image, PDF & Document Converter",
    template: "%s | TrendingTopics Tools",
  },
  description:
    "Free online tools to convert images (JPEG, PNG, WebP, AVIF), merge & compress PDFs, convert DOCX to PDF, generate QR codes and more. No signup. No upload to server. 100% private.",
  keywords: [
    "image converter", "jpeg to webp", "png to pdf", "pdf merger", "pdf maker",
    "docx to pdf", "pdf to docx", "qr code generator", "image compressor",
    "background remover", "free online tools", "image to pdf", "pdf compressor",
  ],
  authors: [{ name: "TrendingTopics", url: "https://trendingtopics.space" }],
  creator: "TrendingTopics",
  publisher: "TrendingTopics",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website", locale: "en_US",
    url: "https://tools.trendingtopics.space",
    siteName: "TrendingTopics Tools",
    title: "TrendingTopics Tools — Free Online Image, PDF & Document Converter",
    description: "Convert images, merge PDFs, generate QR codes — 100% free, no signup, processed locally in your browser.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TrendingTopics Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendingTopics Tools — Free Online Image, PDF & Document Converter",
    description: "Convert images, merge PDFs, generate QR codes — 100% free, processed in your browser.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://tools.trendingtopics.space" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f0f4ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* AdSense placeholder — add your publisher ID when approved:
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" strategy="afterInteractive" />
        */}
      </body>
    </html>
  );
}
