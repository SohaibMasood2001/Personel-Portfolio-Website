import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { getPublicContactSettings } from "@/lib/get-public-contact";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Terms of Service | Personal Portfolio",
  description: "Terms for using this personal portfolio website.",
};

export default async function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-text-secondary text-sm mb-10">
              Last updated: September 2026
            </p>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <GlassCard className="p-8 space-y-6 text-text-secondary leading-relaxed border border-border-custom">
              <p>
                By visiting and using this portfolio website, you agree to these terms. If you do not agree with any part, please refrain from using the site.
              </p>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  Portfolio Content
                </h2>
                <p>
                  This site showcases software engineering projects, design systems, and technical skills created by {ownerName}. Content is provided for informational and portfolio review purposes.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  Intellectual Property
                </h2>
                <p>
                  Unless otherwise noted, the text, visual design, custom components, and original code displayed in this portfolio are owned by {ownerName} or licensed appropriately. Open-source demo code remains subject to its respective open-source licenses.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  Acceptable Use
                </h2>
                <p>
                  You agree not to misuse contact forms, attempt unauthorized access to the admin system, or transmit malicious code through this website.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold font-heading text-text-primary mb-2">
                  Inquiries & Questions
                </h2>
                <p>
                  For any inquiries regarding these terms, please contact me directly at{" "}
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
