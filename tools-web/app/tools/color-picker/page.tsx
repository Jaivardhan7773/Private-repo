import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import ColorPickerTool from "./ColorPickerTool";

export const metadata: Metadata = {
  title: "Color Picker — Free Online Tool",
  description: "Pick and convert colors instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/color-picker" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Color Picker", description: "Pick and convert colors", url: "https://tools.trendingtopics.space/tools/color-picker" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Color Picker", url: "https://tools.trendingtopics.space/tools/color-picker" }]),
      ]} />
      <ColorPickerTool />
    </>
  );
}
