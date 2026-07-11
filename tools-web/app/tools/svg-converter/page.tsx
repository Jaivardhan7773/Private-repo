import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import SvgConverterTool from "./SvgConverterTool";

export const metadata: Metadata = {
  title: "SVG Converter — Free Online Tool",
  description: "Convert SVG to PNG or JPG instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/svg-converter" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "SVG Converter", description: "Convert SVG to PNG or JPG", url: "https://tools.trendingtopics.space/tools/svg-converter" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "SVG Converter", url: "https://tools.trendingtopics.space/tools/svg-converter" }]),
      ]} />
      <SvgConverterTool />
    </>
  );
}
