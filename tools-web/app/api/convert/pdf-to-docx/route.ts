import { NextRequest, NextResponse } from "next/server";

const rateMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 10;
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }
  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  entry.count++;
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (file.size > 50 * 1024 * 1024) return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF using pdf-parse
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParseModule = require("pdf-parse") as (buffer: Buffer, options?: Record<string, unknown>) => Promise<{ text: string; numpages: number }>;
    const pdfData = await pdfParseModule(buffer);

    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

    // Build DOCX paragraphs from extracted text
    const paragraphs = pdfData.text
      .split(/\n{2,}/)
      .map((block: string) => block.trim())
      .filter((block: string) => block.length > 0)
      .map((block: string) => {
        const lines = block.split("\n").map((l: string) => l.trim()).filter(Boolean);
        return new Paragraph({
          children: lines.map((line: string, i: number) => [
            new TextRun({ text: line, break: i > 0 ? 1 : 0 }),
          ]).flat(),
          spacing: { after: 200 },
        });
      });

    // If no paragraphs, add a placeholder
    if (paragraphs.length === 0) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "No extractable text found in this PDF." })],
        })
      );
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Converted from PDF",
              heading: HeadingLevel.HEADING_1,
              spacing: { after: 300 },
            }),
            ...paragraphs,
          ],
        },
      ],
    });

    const docxBuffer = await Packer.toBuffer(doc);

    return new NextResponse(Buffer.from(docxBuffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${file.name.replace(/\.pdf$/i, "")}.docx"`,
        "Content-Length": String(docxBuffer.length),
      },
    });
  } catch (err) {
    console.error("PDF to DOCX error:", err);
    return NextResponse.json({ error: "Conversion failed. Please try a different file." }, { status: 500 });
  }
}
