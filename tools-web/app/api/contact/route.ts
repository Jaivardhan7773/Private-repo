import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiter (per IP, 5 requests per hour)
const rateMap = new Map<string, { count: number; reset: number }>();

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const entry = rateMap.get(key);

  if (!entry || now > entry.reset) {
    rateMap.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = getRateLimitKey(req);
  const { allowed, retryAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  // Parse body
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message too long (max 5000 characters)." }, { status: 400 });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to owner
  const ownerMailOptions = {
    from: `"TT Tools Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECIPIENT,
    replyTo: email,
    subject: `[TT Tools Contact] ${subject || "New message"} — from ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 1.25rem;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 0.875rem;">tools.trendingtopics.space</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 600; color: #64748b; font-size: 0.875rem; width: 100px;">Name</td>
            <td style="padding: 12px 16px; color: #0f172a;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 600; color: #64748b; font-size: 0.875rem;">Email</td>
            <td style="padding: 12px 16px; color: #0f172a;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 600; color: #64748b; font-size: 0.875rem;">Subject</td>
            <td style="padding: 12px 16px; color: #0f172a;">${subject || "No subject"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-weight: 600; color: #64748b; font-size: 0.875rem; vertical-align: top;">Message</td>
            <td style="padding: 12px 16px; color: #0f172a; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>

        <p style="margin-top: 16px; font-size: 0.75rem; color: #94a3b8; text-align: center;">
          Sent from tools.trendingtopics.space contact form • IP: ${ip}
        </p>
      </div>
    `,
  };

  // Auto-reply to sender
  const autoReplyOptions = {
    from: `"TrendingTopics Tools" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We received your message — TrendingTopics Tools",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 1.25rem;">Thanks for reaching out! 🛠️</h1>
        </div>
        <p style="color: #334155;">Hi ${name},</p>
        <p style="color: #334155;">We've received your message and will get back to you within 24–48 hours.</p>
        <p style="color: #334155;">In the meantime, feel free to explore our free tools at <a href="https://tools.trendingtopics.space" style="color: #7c3aed;">tools.trendingtopics.space</a>.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 0.8125rem;">
          TrendingTopics Tools — <a href="https://tools.trendingtopics.space" style="color: #7c3aed;">tools.trendingtopics.space</a>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(autoReplyOptions);
    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
