import Link from "next/link";


export default function NotFound() {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center", padding: "64px 24px" }}>
        <div className="glass-card animate-scaleIn" style={{ maxWidth: 480, margin: "0 auto", padding: "48px 32px" }}>
          <p style={{ fontSize: "4rem", marginBottom: "16px" }}>🔍</p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "12px" }}>
            Page Not Found
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "28px", lineHeight: 1.7 }}>
            The page you&apos;re looking for doesn&apos;t exist. It may have been moved or deleted.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn--primary">
              ← Back to Tools
            </Link>
            <Link href="/contact" className="btn btn--glass">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
