import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import BulkConverterTool from "./BulkConverterTool";

export const metadata: Metadata = {
  title: "Bulk Converter — Free Online Tool",
  description: "Batch convert images instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/bulk-converter" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Bulk Converter", description: "Batch convert images", url: "https://tools.trendingtopics.space/tools/bulk-converter" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Bulk Converter", url: "https://tools.trendingtopics.space/tools/bulk-converter" }]),
      ]} />
      <BulkConverterTool />
    </>
  );
}
