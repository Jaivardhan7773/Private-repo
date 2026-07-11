"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Wrench, Home, Image as ImageIcon, FileText, FileEdit, Info, Mail, LayoutGrid } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#image", label: "Image Tools" },
  { href: "/#pdf", label: "PDF Tools" },
  { href: "/#doc", label: "Doc Tools" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          {/* Logo */}
          <Link href="/" className="header__logo" onClick={() => setMobileOpen(false)}>
            <div className="header__logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2px', background: 'var(--glass-white)' }}>
              <img src="/logo.png" alt="TT Tools Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }} />
            </div>
            <span>TT&nbsp;Tools</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const isHashLink = href.startsWith("/#") && pathname === "/";
              const targetHref = isHashLink ? href.replace("/", "") : href;
              
              if (isHashLink) {
                return (
                  <a
                    key={href}
                    href={targetHref}
                    className="header__nav-link"
                  >
                    {label}
                  </a>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  className="header__nav-link"
                  style={pathname === href ? { color: "var(--accent-violet)", background: "rgba(124,58,237,0.07)" } : {}}
                >
                  {label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn btn--primary btn--sm" style={{ marginLeft: "8px" }}>
              Contact
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span style={mobileOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
            <span style={mobileOpen ? { opacity: 0 } : {}} />
            <span style={mobileOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <nav
            className="glass-card animate-scaleIn"
            aria-label="Mobile navigation"
            style={{ marginTop: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "2px" }}
          >
            {[
              { href: "/", label: "Home", icon: <Home size={18} /> },
              { href: "/#tools", label: "Browse All Tools", icon: <LayoutGrid size={18} /> },
              { href: "/#image", label: "Image Tools", icon: <ImageIcon size={18} /> },
              { href: "/#pdf", label: "PDF Tools", icon: <FileText size={18} /> },
              { href: "/#doc", label: "Document Tools", icon: <FileEdit size={18} /> },
              { href: "/about", label: "About", icon: <Info size={18} /> },
              { href: "/contact", label: "Contact", icon: <Mail size={18} /> },
            ].map(({ href, label, icon }) => {
              const isHashLink = href.startsWith("/#") && pathname === "/";
              const targetHref = isHashLink ? href.replace("/", "") : href;
              
              const linkStyle = {
                  display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px",
                  borderRadius: "10px", color: "var(--text-primary)",
                  fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none",
                  transition: "background var(--transition-fast)",
                  background: pathname === href ? "rgba(124,58,237,0.07)" : "transparent",
              };

              if (isHashLink) {
                return (
                  <a
                    key={href}
                    href={targetHref}
                    onClick={() => setMobileOpen(false)}
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.07)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    {icon} {label}
                  </a>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.07)")}
                  onMouseLeave={e => (e.currentTarget.style.background = pathname === href ? "rgba(124,58,237,0.07)" : "transparent")}
                >
                  {icon} {label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
