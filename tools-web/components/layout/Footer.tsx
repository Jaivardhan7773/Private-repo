import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <Link href="/" style={{display:'flex',alignItems:'center',gap:'8px',textDecoration:'none',color:'var(--text-primary)',fontWeight:800,fontSize:'1.0625rem',letterSpacing:'-0.02em',marginBottom:'8px'}}>
              <span style={{fontSize:'1.25rem'}}>🛠️</span>
              TrendingTopics Tools
            </Link>
            <p>Free, fast, and private online tools for everyone. No uploads to server — everything runs in your browser.</p>
            <p style={{marginTop:'12px'}}>
              <a href="https://trendingtopics.space" style={{color:'var(--accent-violet)',fontWeight:600}}>
                ↗ Visit our Blog
              </a>
            </p>
          </div>

          {/* Image Tools */}
          <div>
            <div className="footer__col-title">Image Tools</div>
            <ul className="footer__links">
              <li><Link href="/tools/image-converter">Image Converter</Link></li>
              <li><Link href="/tools/image-resizer">Image Resizer</Link></li>
              <li><Link href="/tools/image-compressor">Image Compressor</Link></li>
              <li><Link href="/tools/bg-remover">Background Remover</Link></li>
              <li><Link href="/tools/bulk-converter">Bulk Converter</Link></li>
            </ul>
          </div>

          {/* PDF Tools */}
          <div>
            <div className="footer__col-title">PDF Tools</div>
            <ul className="footer__links">
              <li><Link href="/tools/image-to-pdf">Image to PDF</Link></li>
              <li><Link href="/tools/pdf-merger">PDF Merger</Link></li>
              <li><Link href="/tools/pdf-compressor">PDF Compressor</Link></li>
              <li><Link href="/tools/docx-to-pdf">DOCX to PDF</Link></li>
              <li><Link href="/tools/pdf-to-docx">PDF to DOCX</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="footer__col-title">Company</div>
            <ul className="footer__links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
              <li><Link href="/dmca">DMCA</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p>© {year} TrendingTopics Tools. All rights reserved.</p>
          <p style={{display:'flex',gap:'16px',flexWrap:'wrap',justifyContent:'center'}}>
            <Link href="/privacy-policy" style={{color:'var(--text-muted)',textDecoration:'none'}}>Privacy</Link>
            <Link href="/terms-of-service" style={{color:'var(--text-muted)',textDecoration:'none'}}>Terms</Link>
            <Link href="/cookies" style={{color:'var(--text-muted)',textDecoration:'none'}}>Cookies</Link>
          </p>
          <p>
            <span className="badge badge--free">🔒 Privacy First</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
