import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import CsvToJsonTool from "./CsvToJsonTool";

export const metadata: Metadata = {
  title: "CSV to JSON — Free Online Tool",
  description: "Convert CSV file to JSON instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/csv-to-json" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "CSV to JSON", description: "Convert CSV file to JSON", url: "https://tools.trendingtopics.space/tools/csv-to-json" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "CSV to JSON", url: "https://tools.trendingtopics.space/tools/csv-to-json" }]),
      ]} />
      <CsvToJsonTool />
    </>
  );
}
