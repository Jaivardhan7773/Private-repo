import { NextRequest, NextResponse } from "next/server";

const rateMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 min
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
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dynamic import to keep server bundle lean
    const mammoth = await import("mammoth");
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

    // Convert DOCX to HTML, then embed text into PDF
    const result = await mammoth.convertToHtml({ buffer });
    const htmlContent = result.value;

    // Strip HTML tags to get plain text
    const plainText = htmlContent
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/h[1-6]>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim();

    // Build PDF
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 11;
    const lineHeight = fontSize * 1.5;
    const margin = 50;

    const lines = plainText.split("\n");
    let page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();
    let y = height - margin;

    for (const rawLine of lines) {
      // Word-wrap long lines
      const maxWidth = width - margin * 2;
      const words = rawLine.split(" ");
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (textWidth > maxWidth && currentLine) {
          if (y < margin + lineHeight) {
            page = pdfDoc.addPage([595, 842]);
            y = height - margin;
          }
          page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
          y -= lineHeight;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage([595, 842]);
          y = height - margin;
        }
        page.drawText(currentLine, { x: margin, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
        y -= lineHeight;
      }

      if (!rawLine.trim()) y -= lineHeight * 0.3; // paragraph gap
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${file.name.replace(/\.docx$/i, "")}.pdf"`,
        "Content-Length": String(pdfBytes.length),
      },
    });
  } catch (err) {
    console.error("DOCX to PDF error:", err);
    return NextResponse.json({ error: "Conversion failed. Please try a different file." }, { status: 500 });
  }
}
