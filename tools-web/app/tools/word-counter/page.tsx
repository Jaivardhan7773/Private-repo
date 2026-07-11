import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import WordCounterTool from "./WordCounterTool";

export const metadata: Metadata = {
  title: "Word Counter — Free Online Tool",
  description: "Count words and characters instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/word-counter" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Word Counter", description: "Count words and characters", url: "https://tools.trendingtopics.space/tools/word-counter" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Word Counter", url: "https://tools.trendingtopics.space/tools/word-counter" }]),
      ]} />
      <WordCounterTool />
    </>
  );
}
