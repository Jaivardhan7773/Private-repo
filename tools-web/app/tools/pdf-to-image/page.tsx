import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import PdfToImageTool from "./PdfToImageTool";

export const metadata: Metadata = {
  title: "PDF to Image — Free Online Tool",
  description: "Extract PDF pages to images instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/pdf-to-image" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "PDF to Image", description: "Extract PDF pages to images", url: "https://tools.trendingtopics.space/tools/pdf-to-image" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "PDF to Image", url: "https://tools.trendingtopics.space/tools/pdf-to-image" }]),
      ]} />
      <PdfToImageTool />
    </>
  );
}
