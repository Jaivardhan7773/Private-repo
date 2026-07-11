import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | TrendingTopics Tools',
  description:
    'Learn about TrendingTopics Tools — a free, privacy-first suite of online image conversion and document tools. No signup, no uploads, all processing happens in your browser.',
  openGraph: {
    title: 'About TrendingTopics Tools',
    description:
      'Free, privacy-first browser-based tools for image conversion and document processing. No signup required. Built by the TrendingTopics.space team.',
    url: 'https://tools.trendingtopics.space/about',
    siteName: 'TrendingTopics Tools',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="section-hero">
      <div className="container">

        {/* Hero Section */}
        <div className="glass-card">
          <h1>About TrendingTopics Tools</h1>
          <p>
            <strong>TrendingTopics Tools</strong> is a free, privacy-first suite
            of online utilities built by the{' '}
            <a
              href="https://trendingtopics.space"
              target="_blank"
              rel="noopener noreferrer"
            >
              TrendingTopics.space
            </a>{' '}
            team. We believe powerful tools should be accessible to everyone —
            no subscriptions, no accounts, no compromise on your privacy.
          </p>
        </div>

        {/* What We Do */}
        <div className="glass-card">
          <h2>What We Do</h2>
          <p>
            We provide a growing collection of browser-based tools designed to
            make everyday file tasks fast and effortless:
          </p>
          <ul>
            <li>
              <strong>Image Converters</strong> — Convert between PNG, JPEG,
              WebP, AVIF, SVG, GIF, and more in seconds.
            </li>
            <li>
              <strong>Document Tools</strong> — Process, compress, and
              manipulate PDF and document files.
            </li>
            <li>
              <strong>Image Optimizers</strong> — Compress images without
              sacrificing quality.
            </li>
            <li>
              <strong>And more</strong> — We are constantly adding new tools
              based on what our users need.
            </li>
          </ul>
          <p>
            Every tool on TrendingTopics Tools is designed to be intuitive,
            instant, and completely free.
          </p>
        </div>

        {/* Privacy First */}
        <div className="glass-card">
          <h2>Privacy-First by Design</h2>
          <p>
            Your files are <strong>yours</strong>. We built TrendingTopics Tools
            from the ground up with privacy as a core principle, not an
            afterthought.
          </p>
          <ul>
            <li>
              <strong>All processing happens in your browser.</strong> Your
              files never leave your device. We use modern browser APIs
              (Canvas, WebAssembly, File API, etc.) to perform all conversions
              and transformations locally on your machine.
            </li>
            <li>
              <strong>No server uploads.</strong> We operate zero file-processing
              servers. There is no backend receiving your documents or images.
            </li>
            <li>
              <strong>No storage.</strong> We never save copies of your files.
              Once you close the tab or download the result, it&apos;s gone —
              from our perspective, it was never there.
            </li>
            <li>
              <strong>No login required.</strong> You don&apos;t need an account,
              an email address, or any personal information to use any of our
              tools.
            </li>
          </ul>
          <p>
            The only data we collect is anonymized analytics (page views, etc.)
            and standard advertising cookies via Google AdSense to support the
            free service. See our{' '}
            <a href="/privacy-policy">Privacy Policy</a> and{' '}
            <a href="/cookies">Cookie Policy</a> for full details.
          </p>
        </div>

        {/* Why We Built This */}
        <div className="glass-card">
          <h2>Why We Built This</h2>
          <p>
            The web is full of &quot;free&quot; tools that charge you with your
            data — requiring sign-ups, uploading your files to unknown servers,
            or burying features behind paywalls. We got frustrated with this and
            decided to build something better.
          </p>
          <p>
            Our mission is simple: <strong>give people great tools without
            asking anything in return.</strong> No email. No credit card. No
            hidden costs. Just tools that work.
          </p>
          <p>
            We sustain TrendingTopics Tools through unobtrusive display
            advertising via Google AdSense. This allows us to cover hosting and
            development costs while keeping everything free and open for you.
          </p>
        </div>

        {/* Key Features */}
        <div className="glass-card">
          <h2>Why Choose TrendingTopics Tools?</h2>
          <ul>
            <li>
              ✅ <strong>100% Free</strong> — Every tool, every feature, every
              time.
            </li>
            <li>
              🔒 <strong>Privacy First</strong> — In-browser processing. Your
              files never touch our servers.
            </li>
            <li>
              ⚡ <strong>Fast</strong> — No upload/download roundtrips to a
              server. Processing is instant.
            </li>
            <li>
              🚫 <strong>No Signup</strong> — Use everything without creating
              an account.
            </li>
            <li>
              📱 <strong>Mobile Friendly</strong> — Fully responsive design that
              works on any device.
            </li>
            <li>
              🌍 <strong>Accessible</strong> — Designed to work for everyone,
              everywhere.
            </li>
            <li>
              🔄 <strong>Always Growing</strong> — We regularly add new tools
              and improve existing ones.
            </li>
          </ul>
        </div>

        {/* Who We Are */}
        <div className="glass-card">
          <h2>Who We Are</h2>
          <p>
            TrendingTopics Tools is a project by the{' '}
            <a
              href="https://trendingtopics.space"
              target="_blank"
              rel="noopener noreferrer"
            >
              TrendingTopics.space
            </a>{' '}
            team — a small, independent group of developers and designers
            passionate about building useful things for the web.
          </p>
          <p>
            TrendingTopics.space covers topics at the intersection of
            technology, productivity, and digital tools. This tools subdomain is
            our way of putting our beliefs into practice — making quality
            software freely available to everyone.
          </p>
          <p>
            We&apos;re a small team, so we truly appreciate your support.
            Allowing ads, sharing our tools with friends and colleagues, and
            sending us feedback all help us keep the lights on and keep building.
          </p>
        </div>

        {/* Contact */}
        <div className="glass-card">
          <h2>Get in Touch</h2>
          <p>
            Have a question, suggestion, or found a bug? We&apos;d love to hear
            from you. Our team tries to respond to all messages within 48 hours.
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:aizenxblogs@gmail.com">aizenxblogs@gmail.com</a>
            </li>
            <li>
              <strong>Website:</strong>{' '}
              <a
                href="https://tools.trendingtopics.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                tools.trendingtopics.space
              </a>
            </li>
            <li>
              <strong>Parent Site:</strong>{' '}
              <a
                href="https://trendingtopics.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                trendingtopics.space
              </a>
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}
