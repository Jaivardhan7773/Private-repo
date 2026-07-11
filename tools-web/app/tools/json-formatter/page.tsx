import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import JsonFormatterTool from "./JsonFormatterTool";

export const metadata: Metadata = {
  title: "JSON Formatter — Free Online Tool",
  description: "Format and validate JSON instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/json-formatter" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "JSON Formatter", description: "Format and validate JSON", url: "https://tools.trendingtopics.space/tools/json-formatter" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "JSON Formatter", url: "https://tools.trendingtopics.space/tools/json-formatter" }]),
      ]} />
      <JsonFormatterTool />
    </>
  );
}
