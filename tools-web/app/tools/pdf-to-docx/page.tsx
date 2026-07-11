import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import PdfToDocxTool from "./PdfToDocxTool";

export const metadata: Metadata = {
  title: "PDF to DOCX — Free Online Tool",
  description: "Convert PDF to Word DOCX instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/pdf-to-docx" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "PDF to DOCX", description: "Convert PDF to Word DOCX", url: "https://tools.trendingtopics.space/tools/pdf-to-docx" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "PDF to DOCX", url: "https://tools.trendingtopics.space/tools/pdf-to-docx" }]),
      ]} />
      <PdfToDocxTool />
    </>
  );
}
