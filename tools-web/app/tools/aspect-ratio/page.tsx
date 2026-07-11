import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import AspectRatioTool from "./AspectRatioTool";

export const metadata: Metadata = {
  title: "Aspect Ratio Calc — Free Online Tool",
  description: "Calculate aspect ratios instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/aspect-ratio" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Aspect Ratio Calc", description: "Calculate aspect ratios", url: "https://tools.trendingtopics.space/tools/aspect-ratio" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Aspect Ratio Calc", url: "https://tools.trendingtopics.space/tools/aspect-ratio" }]),
      ]} />
      <AspectRatioTool />
    </>
  );
}
