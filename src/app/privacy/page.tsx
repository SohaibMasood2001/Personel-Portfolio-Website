import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { getPublicContactSettings } from "@/lib/get-public-contact";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Privacy Policy | Personal Portfolio",
  description: "How personal information and inquiries are handled on this portfolio website.",
};

export default async function PrivacyPage() {
  const contact = await getPublicContactSettings();
  const ownerName = contact.companyName || "Portfolio Owner";

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-primary mb-3">
              Privacy Policy
            </h1>
            <p className="text-text-secondary text-sm mb-10">
              Last updated: September 2026
            </p>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <GlassCard className="p-8 space-y-6 text-text-secondary leading-relaxed border border-border-custom">
              <p>
                This portfolio website is operated by {ownerName}. This policy explains what information is collected and how it is used.
              </p>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  Information Collected
                </h2>
                <p>
                  When you submit an inquiry through the contact form, your name, email address, subject, and message are received solely for the purpose of communicating and responding to your inquiry. Your personal data is never sold, shared with third parties, or used for unsolicited marketing.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  Cookies & Local Storage
                </h2>
                <p>
                  This site uses browser local storage strictly for functional preferences (such as your preferred dark or light visual theme). No invasive third-party tracking cookies or advertising pixels are used.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  External Links
                </h2>
                <p>
                  This portfolio may contain links to external third-party websites (such as GitHub, LinkedIn, or live project demonstrations). I am not responsible for the privacy practices or content of third-party websites.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  Contact
                </h2>
                <p>
                  If you have questions regarding this privacy policy, you may get in touch directly at{" "}
                  <a href={`mailto:${contact.email}`} className="text-accent-primary underline hover:text-accent-glow">
                    {contact.email}
                  </a>.
                </p>
              </div>

              <div className="pt-4 border-t border-border-custom">
                <Link
                  href="/"
                  className="text-sm font-semibold text-accent-primary hover:text-accent-glow"
                >
                  ← Back to Home
                </Link>
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
