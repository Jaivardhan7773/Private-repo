import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/components/seo/JsonLd";
import PdfMergerTool from "./PdfMergerTool";

export const metadata: Metadata = {
  title: "Merge PDF Files Online for Free — Combine PDFs",
  description: "Merge multiple PDF files into one document instantly. 100% free, no signup required. Processed locally in your browser for maximum privacy.",
  openGraph: { title: "Free PDF Merger Online", description: "Combine PDF files in your browser. Fast, private, free.", images: [{ url: "/og-image.png" }] },
  alternates: { canonical: "https://tools.trendingtopics.space/tools/pdf-merger" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "PDF Merger", description: "Merge multiple PDF files into one", url: "https://tools.trendingtopics.space/tools/pdf-merger" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "PDF Merger", url: "https://tools.trendingtopics.space/tools/pdf-merger" }]),
        buildFaqSchema([
          { question: "Are my PDFs safe?", answer: "Yes, your files never leave your device. The merging is done in your browser using WebAssembly." },
          { question: "Is there a limit on how many PDFs I can merge?", answer: "You can merge up to 50 PDFs at once. For very large files, your browser may run out of memory, but there is no hard limit on our end." },
        ]),
      ]} />
      <PdfMergerTool />
    </>
  );
}
