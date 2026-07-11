"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center", padding: "64px 24px" }}>
        <div className="glass-card animate-scaleIn" style={{ maxWidth: 480, margin: "0 auto", padding: "48px 32px" }}>
          <p style={{ fontSize: "4rem", marginBottom: "16px" }}>⚠️</p>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "12px" }}>
            Something went wrong
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "8px", lineHeight: 1.7 }}>
            An unexpected error occurred. Please try again.
          </p>
          {error.message && (
            <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginBottom: "24px", fontFamily: "monospace" }}>
              {error.message}
            </p>
          )}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={reset} className="btn btn--primary">
              Try Again
            </button>
            <Link href="/" className="btn btn--glass">
              ← Back to Tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
