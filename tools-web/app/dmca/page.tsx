import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMCA Policy | TrendingTopics Tools',
  description:
    'DMCA Copyright Takedown Policy for TrendingTopics Tools (tools.trendingtopics.space). Learn how to submit a DMCA takedown notice and how we respond to copyright infringement claims.',
  openGraph: {
    title: 'DMCA Policy | TrendingTopics Tools',
    description:
      'How to submit a DMCA takedown request to TrendingTopics Tools. We respect intellectual property rights and respond promptly to valid notices.',
    url: 'https://tools.trendingtopics.space/dmca',
    siteName: 'TrendingTopics Tools',
    type: 'website',
  },
};

export default function DmcaPage() {
  return (
    <main className="section-hero">
      <div className="container">
        <div className="glass-card">
          <h1>DMCA Copyright Policy</h1>
          <p className="meta">
            <strong>Last Updated:</strong> July 1, 2026 &nbsp;|&nbsp;{' '}
            <strong>Effective Date:</strong> July 1, 2026
          </p>
          <p>
            <strong>TrendingTopics Tools</strong> (
            <a href="https://tools.trendingtopics.space">
              tools.trendingtopics.space
            </a>
            ) respects the intellectual property rights of others and expects
            users of our Service to do the same. In accordance with the Digital
            Millennium Copyright Act of 1998 (&quot;DMCA&quot;), we will respond
            promptly to claims of copyright infringement that are reported to our
            designated copyright agent.
          </p>

          <hr />

          <h2>1. Our Service and User Content</h2>
          <p>
            TrendingTopics Tools is a browser-based file processing platform.{' '}
            <strong>
              We do not store, host, or serve any user-uploaded files on our
              servers.
            </strong>{' '}
            All file processing occurs locally within the user&apos;s browser.
            Files are never transmitted to or retained by us.
          </p>
          <p>
            Content on our website that is subject to copyright includes, but is
            not limited to:
          </p>
          <ul>
            <li>Website design, layout, and source code</li>
            <li>Text content, articles, and documentation</li>
            <li>Graphics, icons, and UI elements</li>
            <li>Tool algorithms and software (to the extent protectable)</li>
          </ul>

          <hr />

          <h2>2. Reporting Copyright Infringement</h2>
          <p>
            If you believe that content on our website infringes your copyright,
            please submit a DMCA takedown notice to our designated agent. To be
            effective under the DMCA (17 U.S.C. § 512), your notice must include
            the following information:
          </p>
          <ol>
            <li>
              <strong>Identification of the copyrighted work</strong> — A
              description of the copyrighted work that you claim has been
              infringed, or if multiple works are covered by a single notice, a
              representative list of such works.
            </li>
            <li>
              <strong>Identification of the infringing material</strong> — A
              description of the material that you claim is infringing, including
              sufficient information to allow us to locate the material on our
              website (e.g., the URL of the specific page).
            </li>
            <li>
              <strong>Your contact information</strong> — Your full name, mailing
              address, telephone number, and email address.
            </li>
            <li>
              <strong>Good faith statement</strong> — A statement that you have a
              good faith belief that use of the material in the manner complained
              of is not authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              <strong>Accuracy statement</strong> — A statement that the
              information in the notification is accurate, and under penalty of
              perjury, that you are the copyright owner or are authorized to act
              on behalf of the copyright owner.
            </li>
            <li>
              <strong>Physical or electronic signature</strong> — A physical or
              electronic signature of the person authorized to act on behalf of
              the owner of the copyright interest.
            </li>
          </ol>

          <hr />

          <h2>3. How to Submit a DMCA Notice</h2>
          <p>
            Send your complete DMCA takedown notice to our designated copyright
            agent via email:
          </p>
          <div className="glass-card">
            <p>
              <strong>Designated Copyright Agent:</strong> TrendingTopics.space
              Team
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:aizenxblogs@gmail.com">aizenxblogs@gmail.com</a>
            </p>
            <p>
              <strong>Subject Line:</strong> DMCA Takedown Notice — [Your Name /
              Organization]
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href="https://tools.trendingtopics.space">
                tools.trendingtopics.space
              </a>
            </p>
          </div>
          <p>
            We strongly recommend sending notices via email for the fastest
            response. We aim to acknowledge all valid DMCA notices within{' '}
            <strong>3 business days</strong> and to take appropriate action
            within <strong>10 business days</strong>.
          </p>

          <hr />

          <h2>4. Our Response to DMCA Notices</h2>
          <p>
            Upon receipt of a valid DMCA takedown notice, we will:
          </p>
          <ul>
            <li>
              Promptly review the notice to verify it meets the requirements
              outlined in Section 2.
            </li>
            <li>
              Remove or disable access to the allegedly infringing material as
              expeditiously as reasonably possible, if applicable to content we
              host or control.
            </li>
            <li>
              Notify the alleged infringer (if identifiable) that the material
              has been removed or access disabled.
            </li>
            <li>
              Document the notice for our records as required by the DMCA safe
              harbor provisions.
            </li>
          </ul>
          <p>
            Please note: Since our Service does not store or host user files, the
            vast majority of DMCA notices related to user-processed files will not
            be applicable to our platform.
          </p>

          <hr />

          <h2>5. Counter-Notification Procedure</h2>
          <p>
            If you believe that your material was removed or disabled as a result
            of a mistake or misidentification, you may submit a counter-notice
            pursuant to 17 U.S.C. § 512(g). To be effective, a counter-notice
            must include:
          </p>
          <ol>
            <li>
              Your physical or electronic signature.
            </li>
            <li>
              Identification of the material that has been removed or disabled
              and the location at which the material appeared before it was
              removed or disabled.
            </li>
            <li>
              A statement under penalty of perjury that you have a good faith
              belief that the material was removed or disabled as a result of
              mistake or misidentification.
            </li>
            <li>
              Your name, address, telephone number, and email address.
            </li>
            <li>
              A statement that you consent to the jurisdiction of the federal
              court for the judicial district in which your address is located,
              or if outside the United States, any judicial district in which the
              service provider may be found.
            </li>
            <li>
              A statement that you will accept service of process from the person
              who provided the original DMCA notice or their agent.
            </li>
          </ol>
          <p>
            Send counter-notifications to the same contact email listed in
            Section 3.
          </p>
          <p>
            Upon receipt of a valid counter-notification, we will forward it to
            the original complainant. If the original complainant does not notify
            us within 10-14 business days that they have filed a court action, we
            may restore the removed material.
          </p>

          <hr />

          <h2>6. Repeat Infringer Policy</h2>
          <p>
            In appropriate circumstances and at our sole discretion, we may
            terminate or restrict access to our Service for users or parties who
            are found to be repeat infringers of copyright. We reserve the right
            to make this determination and take action without prior notice.
          </p>

          <hr />

          <h2>7. Misuse of the DMCA Process</h2>
          <p>
            Please be aware that under 17 U.S.C. § 512(f), any person who
            knowingly materially misrepresents that material or activity is
            infringing may be subject to liability for damages, including costs
            and attorneys&apos; fees incurred by the alleged infringer, the
            copyright owner, or a license holder, or by a service provider who
            relies on the misrepresentation. If you are unsure whether material
            infringes your copyright, we recommend consulting with a qualified
            attorney before submitting a notice.
          </p>

          <hr />

          <h2>8. Contact for Copyright Matters</h2>
          <p>
            For all copyright-related inquiries, including DMCA notices and
            counter-notices, please contact:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:aizenxblogs@gmail.com">aizenxblogs@gmail.com</a>
              &nbsp;(Subject: &quot;DMCA Notice&quot;)
            </li>
            <li>
              <strong>Response Time:</strong> Within 3 business days for
              acknowledgement; up to 10 business days for action.
            </li>
            <li>
              <strong>Website:</strong>{' '}
              <a href="https://tools.trendingtopics.space">
                tools.trendingtopics.space
              </a>
            </li>
          </ul>

          <hr />

          <h2>9. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this DMCA policy at any time. Changes
            will be effective immediately upon posting to this page with an
            updated &quot;Last Updated&quot; date.
          </p>
        </div>
      </div>
    </main>
  );
}
