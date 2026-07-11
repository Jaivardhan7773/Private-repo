import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebAppSchema, buildBreadcrumbSchema } from "@/components/seo/JsonLd";
import PasswordGeneratorTool from "./PasswordGeneratorTool";

export const metadata: Metadata = {
  title: "Password Generator — Free Online Tool",
  description: "Generate strong passwords instantly in your browser. 100% free.",
  alternates: { canonical: "https://tools.trendingtopics.space/tools/password-generator" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        buildWebAppSchema({ name: "Password Generator", description: "Generate strong passwords", url: "https://tools.trendingtopics.space/tools/password-generator" }),
        buildBreadcrumbSchema([{ name: "Home", url: "https://tools.trendingtopics.space" }, { name: "Password Generator", url: "https://tools.trendingtopics.space/tools/password-generator" }]),
      ]} />
      <PasswordGeneratorTool />
    </>
  );
}
