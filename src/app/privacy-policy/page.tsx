import type { Metadata } from "next"
import Link from "next/link"

const title = "Privacy Policy"
const description =
  "Learn how Butcher and the Rye collects, uses, and protects information submitted through this website."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/privacy-policy",
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicy() {
  return (
    <main className="bg-charcoal pt-28 text-cream md:pt-36">
      <article className="mx-auto max-w-4xl px-8 py-16 md:px-16 md:py-24">
        <header className="border-b border-cream/10 pb-12">
          <p className="text-sm text-amber uppercase">Legal</p>
          <h1 className="heading-emboss mt-5 font-display text-5xl md:text-7xl">Privacy Policy</h1>
          <p className="mt-6 text-sm text-tan/70">Effective September 15, 2026</p>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-tan">
            This policy explains how Butcher and the Rye and Richard DeShantz Restaurant Group
            collect, use, and share information when you use butcherandtherye.com or contact us
            through the website.
          </p>
        </header>

        <div className="space-y-14 pt-14 text-base leading-8 text-tan">
          <PolicySection title="Information we collect">
            <p>We collect information you choose to provide, including:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Your name, email address, phone number, and message when you use our contact form.
              </li>
              <li>
                A display name and the content of a review when you submit feedback about a menu
                item. Reviews are held for moderation and may be displayed publicly after approval.
              </li>
              <li>
                Your menu-item likes. Your browser stores a local preference so the site can
                remember which items you liked.
              </li>
            </ul>
            <p className="mt-4">
              Like most websites, our website and the services that deliver it may also process
              technical information such as IP address, browser type, device information, requested
              pages, and timestamps for security, reliability, and basic operation.
            </p>
          </PolicySection>

          <PolicySection title="How we use information">
            <p>We use information to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Respond to questions, requests, and restaurant inquiries.</li>
              <li>Review, moderate, and publish guest reviews.</li>
              <li>Operate, secure, maintain, and improve the website.</li>
              <li>Comply with legal obligations and protect our guests, business, and services.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Service providers and external services">
            <p>
              We use service providers to operate parts of the website. Convex provides website data
              and application services, and Resend delivers messages submitted through our contact
              form. These providers may process information on our behalf under their own terms and
              privacy commitments.
            </p>
            <p className="mt-4">
              Reservation links take you to OpenTable, and private-event inquiry links take you to
              Tripleseat. Social-media, map, restaurant-group, and agency links may also take you to
              other websites. Information you provide after leaving our website is governed by the
              privacy policy of that external service. We encourage you to review those policies.
            </p>
          </PolicySection>

          <PolicySection title="Local storage and cookies">
            <p>
              The menu-like feature uses your browser&rsquo;s local storage to remember your choice
              on that device. The website&rsquo;s platform and authentication systems may use
              cookies or similar technologies that are necessary for security, session management,
              and site operation. You can control cookies and clear local storage through your
              browser, but some functions may no longer work as expected.
            </p>
          </PolicySection>

          <PolicySection title="How we share information">
            <p>
              We do not share personal information except with service providers that help us run
              the website and respond to you; when required by law or legal process; to protect
              rights, safety, and security; or as part of a business reorganization, financing,
              merger, or sale. Approved reviews and their submitted display names may be shown
              publicly on the website.
            </p>
          </PolicySection>

          <PolicySection title="Data retention and security">
            <p>
              We retain information for as long as reasonably necessary for the purposes described
              in this policy, including responding to inquiries, moderating reviews, maintaining
              business records, resolving disputes, and meeting legal obligations. We use reasonable
              administrative, technical, and organizational safeguards, but no method of online
              transmission or storage is completely secure.
            </p>
          </PolicySection>

          <PolicySection title="Your choices and privacy requests">
            <p>
              You may ask to access, correct, or delete personal information you have provided to
              us. Depending on where you live, applicable law may give you additional privacy
              rights. We may need to verify your identity before completing a request, and some
              information may be retained where permitted or required by law.
            </p>
          </PolicySection>

          <PolicySection title="Children&rsquo;s privacy">
            <p>
              This website is not directed to children under 13, and we do not knowingly collect
              personal information from children under 13. If you believe a child has provided
              personal information through the site, please contact us so we can review the matter.
            </p>
          </PolicySection>

          <PolicySection title="Changes to this policy">
            <p>
              We may update this policy as our website or practices change. The effective date at
              the top of this page shows when the policy was last revised. Material changes will be
              posted on this page.
            </p>
          </PolicySection>

          <PolicySection title="Contact us">
            <p>
              For questions or privacy requests, contact Butcher and the Rye through our{" "}
              <Link
                href="/contact"
                className="text-amber underline underline-offset-4 hover:text-cream"
              >
                contact page
              </Link>
              , call (412) 391-2752, or write to 212 6th Street, Pittsburgh, PA 15222.
            </p>
          </PolicySection>
        </div>
      </article>
    </main>
  )
}

function PolicySection({
  title: sectionTitle,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-subhead text-2xl text-cream md:text-3xl">{sectionTitle}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
