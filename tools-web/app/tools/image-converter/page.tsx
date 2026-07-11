import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/components/seo/JsonLd";
import ImageConverterTool from "./ImageConverterTool";

export const metadata: Metadata = {
  title: "Free Image Converter — JPEG to WebP, PNG to AVIF & More",
  description: "Convert images between JPEG, PNG, WebP, AVIF, GIF, and BMP formats instantly. Free, no signup, processed 100% in your browser. No file uploads.",
  openGraph: { title: "Free Image Converter Online", description: "Convert JPEG, PNG, WebP, AVIF — instant, private, free.", images: [{ url: "/og-image.png" }] },
  alternates: { canonical: "https://tools.trendingtopics.space/tools/image-converter" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Image Format Converter", description: "Convert images between JPEG, PNG, WebP, AVIF, GIF and BMP formats", url: "https://tools.trendingtopics.space/tools/image-converter" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Image Converter", url: "https://tools.trendingtopics.space/tools/image-converter" }]),
        buildFaqSchema([
          { question: "Which image formats can I convert to?", answer: "You can convert to WebP, JPEG, PNG, AVIF, GIF, and BMP. Upload any of these formats and choose your output." },
          { question: "Is my image uploaded to a server?", answer: "No. All conversion happens in your browser using the HTML5 Canvas API. Your images never leave your device." },
          { question: "Does converting to WebP reduce quality?", answer: "WebP uses lossy compression by default. You can control quality with the slider (1-100). At 85+ quality, WebP is visually identical to JPEG but 25-34% smaller." },
          { question: "What is AVIF format?", answer: "AVIF is the newest image format offering the best compression. It can be 50% smaller than JPEG at the same quality. Supported in all modern browsers." },
          { question: "Can I convert GIF files?", answer: "Yes, but note that animated GIFs lose their animation when converted — only the first frame is kept." },
        ]),
      ]} />
      <ImageConverterTool />
    </>
  );
}
