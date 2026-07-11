"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Globe, CheckCircle2, XCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <main className="tool-page" aria-label="Contact">
      <div className="container--narrow">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Contact</span>
        </nav>

        {/* Header */}
        <div className="tool-page__header">
          <span className="tool-page__icon"><Mail size={48} className="text-accent-violet" /></span>
          <h1 className="tool-page__title">Get in Touch</h1>
          <p className="tool-page__desc">
            Have a question, suggestion, or found a bug? We&apos;d love to hear from you.
            We typically respond within 24–48 hours.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "32px" }}>
          {/* Info Cards */}
          {[
            { icon: <Mail size={24} className="text-accent-blue" />, title: "Email Us", desc: "aizenxblogs@gmail.com", sub: "We reply within 48 hours" },
            { icon: <Globe size={24} className="text-accent-violet" />, title: "Main Blog", desc: "trendingtopics.space", sub: "Visit our blog for articles" },
          ].map((c) => (
            <div key={c.title} className="glass-card" style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", background: "rgba(124,58,237,0.1)", borderRadius: "12px" }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "4px" }}>{c.title}</div>
                <div style={{ color: "var(--accent-violet)", fontWeight: 600, fontSize: "0.875rem" }}>{c.desc}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="glass-card" style={{ padding: "32px" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.25rem", margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            Send a Message
          </h2>

          {status === "success" ? (
            <div className="alert alert--success animate-scaleIn" style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <CheckCircle2 size={32} className="text-accent-green" style={{ flexShrink: 0 }} />
              <div>
                <strong>Message sent!</strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.875rem" }}>
                  We&apos;ve received your message and you should get an auto-reply confirmation shortly.
                  We&apos;ll be in touch within 24–48 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">Subject</label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="form-select"
                  value={form.subject}
                  onChange={handleChange}
                >
                  <option value="">Select a topic...</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Tool Suggestion">Tool Suggestion</option>
                  <option value="Partnership">Partnership</option>
                  <option value="DMCA / Copyright">DMCA / Copyright</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message * <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({form.message.length}/5000)</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  maxLength={5000}
                  rows={6}
                />
              </div>

              {status === "error" && (
                <div className="alert alert--error" style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <XCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn--primary btn--lg w-full"
                disabled={status === "loading"}
                id="contact-submit"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
              >
                {status === "loading" ? (
                  <><span className="spinner"></span> Sending...</>
                ) : (
                  <>Send Message <Mail size={18} /></>
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "12px" }}>
                By submitting, you agree to our{" "}
                <Link href="/privacy-policy" style={{ color: "var(--accent-violet)" }}>Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
