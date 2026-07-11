import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import PdfSplitterTool from "./PdfSplitterTool";

export const metadata: Metadata = {
  title: "PDF Splitter — Free Online Tool",
  description: "Split PDF pages instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/pdf-splitter" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "PDF Splitter", description: "Split PDF pages", url: "https://tools.trendingtopics.space/tools/pdf-splitter" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "PDF Splitter", url: "https://tools.trendingtopics.space/tools/pdf-splitter" }]),
      ]} />
      <PdfSplitterTool />
    </>
  );
}
