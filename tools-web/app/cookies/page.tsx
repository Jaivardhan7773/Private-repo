import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | TrendingTopics Tools',
  description:
    'Cookie Policy for TrendingTopics Tools (tools.trendingtopics.space). Learn which cookies we use, why we use them (primarily Google AdSense), and how to manage or opt out.',
  openGraph: {
    title: 'Cookie Policy | TrendingTopics Tools',
    description:
      'Understand how TrendingTopics Tools uses cookies — primarily for Google AdSense ads — and how to control your cookie preferences.',
    url: 'https://tools.trendingtopics.space/cookies',
    siteName: 'TrendingTopics Tools',
    type: 'website',
  },
};

export default function CookiePolicyPage() {
  return (
    <main className="section-hero">
      <div className="container">
        <div className="glass-card">
          <h1>Cookie Policy</h1>
          <p className="meta">
            <strong>Last Updated:</strong> July 1, 2026 &nbsp;|&nbsp;{' '}
            <strong>Effective Date:</strong> July 1, 2026
          </p>
          <p>
            This Cookie Policy explains how <strong>TrendingTopics Tools</strong>{' '}
            (
            <a href="https://tools.trendingtopics.space">
              tools.trendingtopics.space
            </a>
            ) uses cookies and similar tracking technologies when you visit our
            website. By continuing to use our website, you consent to the use of
            cookies as described in this policy.
          </p>

          <hr />

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device
            (computer, tablet, or smartphone) when you visit a website. Cookies
            are widely used to make websites work more efficiently, provide
            functionality, and give website owners useful information about how
            their site is being used.
          </p>
          <p>Cookies can be:</p>
          <ul>
            <li>
              <strong>Session Cookies</strong> — Temporary cookies that are
              deleted when you close your browser.
            </li>
            <li>
              <strong>Persistent Cookies</strong> — Cookies that remain on your
              device for a set period of time or until you delete them.
            </li>
            <li>
              <strong>First-party Cookies</strong> — Cookies set by the website
              you are visiting.
            </li>
            <li>
              <strong>Third-party Cookies</strong> — Cookies set by a domain
              other than the website you are visiting (e.g., Google AdSense).
            </li>
          </ul>

          <hr />

          <h2>2. Cookies We Use</h2>

          <h3>2.1 Strictly Necessary Cookies</h3>
          <p>
            These cookies are essential for the website to function correctly.
            They enable core features such as remembering your cookie consent
            preference. These cookies do not collect any personally identifiable
            information and cannot be disabled without affecting site
            functionality.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>cookie_consent</td>
                <td>Stores your cookie consent preference</td>
                <td>1 year</td>
              </tr>
            </tbody>
          </table>

          <h3>2.2 Google AdSense Cookies (Advertising)</h3>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements on
            our website. Google AdSense is an advertising service provided by
            Google LLC. AdSense uses cookies to serve ads based on your visits to
            this and other websites on the internet. These are third-party
            cookies set by Google.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Provider</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>__gads</td>
                <td>Google</td>
                <td>
                  Registers user actions and reports them for anti-fraud and ad
                  measurement purposes
                </td>
                <td>13 months</td>
              </tr>
              <tr>
                <td>__gpi</td>
                <td>Google</td>
                <td>
                  Stores user advertising preferences and ensures ads are not
                  shown repeatedly
                </td>
                <td>13 months</td>
              </tr>
              <tr>
                <td>IDE</td>
                <td>Google DoubleClick</td>
                <td>
                  Used to register and report actions after viewing or clicking
                  an advertisement to measure its effectiveness
                </td>
                <td>13 months</td>
              </tr>
              <tr>
                <td>NID</td>
                <td>Google</td>
                <td>
                  Used to remember user preferences and for ad personalization
                </td>
                <td>6 months</td>
              </tr>
              <tr>
                <td>DSID</td>
                <td>Google</td>
                <td>Used to identify a signed-in user on non-Google sites</td>
                <td>2 weeks</td>
              </tr>
              <tr>
                <td>ANID</td>
                <td>Google</td>
                <td>
                  Used for advertising personalization across Google services
                </td>
                <td>13 months</td>
              </tr>
              <tr>
                <td>AID</td>
                <td>Google</td>
                <td>Links activity across different devices for ad targeting</td>
                <td>13 months</td>
              </tr>
            </tbody>
          </table>
          <p>
            For more information about how Google uses cookies in advertising,
            visit:{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              How Google Uses Cookies in Advertising
            </a>
            .
          </p>

          <h3>2.3 Analytics Cookies</h3>
          <p>
            We may use analytics cookies (such as Google Analytics) to
            understand how visitors interact with our website. These cookies
            collect aggregated and anonymized information about page views,
            session duration, traffic sources, and user behavior.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Provider</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Google Analytics</td>
                <td>
                  Registers a unique ID used to generate statistical data on
                  website usage
                </td>
                <td>2 years</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>Google Analytics</td>
                <td>
                  Registers a unique ID used to generate statistical data on
                  website usage
                </td>
                <td>24 hours</td>
              </tr>
              <tr>
                <td>_gat</td>
                <td>Google Analytics</td>
                <td>Used to throttle request rate</td>
                <td>1 minute</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>3. What Cookies Do NOT Do on Our Site</h2>
          <p>
            To be clear about what we do <strong>not</strong> do with cookies on
            TrendingTopics Tools:
          </p>
          <ul>
            <li>
              We do <strong>not</strong> use cookies to collect or store the
              content of any files you process using our tools.
            </li>
            <li>
              We do <strong>not</strong> use cookies to create personal profiles
              or track you across unrelated websites (beyond what Google AdSense
              does as described above).
            </li>
            <li>
              We do <strong>not</strong> sell cookie data to third parties.
            </li>
            <li>
              We do <strong>not</strong> store sensitive personal information in
              cookies.
            </li>
          </ul>

          <hr />

          <h2>4. How to Control and Opt Out of Cookies</h2>
          <p>
            You have the right to control whether cookies are set on your device.
            Here are several ways to manage cookies:
          </p>

          <h3>4.1 Browser Settings</h3>
          <p>
            You can configure your browser to refuse all cookies or to indicate
            when a cookie is being sent. Note that some features of our website
            may not function properly if you disable cookies. Instructions for
            major browsers:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome — Cookie Settings
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox — Cookie Settings
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Safari — Cookie Settings
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge — Cookie Settings
              </a>
            </li>
          </ul>

          <h3>4.2 Opt Out of Google AdSense Personalized Ads</h3>
          <p>
            To opt out of personalized advertising by Google, you can visit:
          </p>
          <ul>
            <li>
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google My Ad Center — Ads Personalization Settings
              </a>
            </li>
            <li>
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Digital Advertising Alliance — Opt Out Tool
              </a>
            </li>
            <li>
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Network Advertising Initiative — Opt Out Tool
              </a>
            </li>
            <li>
              <a
                href="https://www.youronlinechoices.eu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Your Online Choices (EU)
              </a>
            </li>
          </ul>
          <p>
            Please note that opting out of personalized ads does not mean you
            will no longer see advertisements. You will still see ads, but they
            will not be tailored to your interests.
          </p>

          <h3>4.3 Opt Out of Google Analytics</h3>
          <p>
            To prevent Google Analytics from collecting data about your visits,
            you can install the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <hr />

          <h2>5. Do Not Track</h2>
          <p>
            Some browsers have a &quot;Do Not Track&quot; feature that signals
            to websites that you do not want to be tracked. There is currently
            no industry-wide standard for how websites should respond to these
            signals. We currently do not alter our data collection and use
            practices in response to Do Not Track signals.
          </p>

          <hr />

          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes
            in our practices or applicable regulations. We will notify you of
            material changes by updating the &quot;Last Updated&quot; date at the
            top of this page. We encourage you to review this policy periodically.
          </p>

          <hr />

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie
            Policy, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:aizenxblogs@gmail.com">aizenxblogs@gmail.com</a>
            </li>
            <li>
              <strong>Website:</strong>{' '}
              <a href="https://tools.trendingtopics.space">
                tools.trendingtopics.space
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
