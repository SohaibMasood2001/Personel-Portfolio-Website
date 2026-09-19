"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { Send, CheckCircle, Mail, Phone, MapPin, Loader2, AlertTriangle } from "lucide-react";
import { LinkedinIcon, XIcon } from "@/components/ui/SocialIcons";

const inquiryTypes = [
  "Project Inquiry",
  "Full-Time / Contract Role",
  "AI Integration & Consulting",
  "General Discussion",
];

type Props = {
  contact: {
    email: string;
    phone?: string;
    linkedinUrl: string;
    location: string;
    companyName: string;
    xUrl?: string;
  };
};

export function ContactPageClient({ contact }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "Project Inquiry",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const phone = contact.phone || "(+92) 342 5156705";

  const socials = [
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${contact.email}`,
      color: "#E8536A",
      detail: contact.email,
    },
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      href: `tel:${phone.replace(/\s+/g, "")}`,
      color: "#E8536A",
      detail: phone,
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: contact.linkedinUrl || "https://linkedin.com",
      color: "#D4A853",
      detail: "Connect on LinkedIn",
    },
    {
      icon: MapPin,
      label: "Location",
      href: "#",
      color: "#1B2A4A",
      detail: contact.location || "Islamabad, Pakistan · Available Worldwide",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const subject =
        formData.inquiryType !== "General Discussion"
          ? `[${formData.inquiryType}] ${formData.subject}`
          : formData.subject;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          inquiryType: "Project Inquiry",
        });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
                Contact Me
              </p>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-primary mb-6">
                Let&apos;s <span className="gradient-text">Connect</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Have an idea, project, or role you&apos;d like to discuss? Send me a message and I will get back to you promptly with clear next steps.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <SectionReveal className="lg:col-span-3" direction="left">
              <GlassCard className="p-8 border border-border-custom shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Your Name
                      </label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border-custom text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all"
                        placeholder="Alex Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border-custom text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all"
                        placeholder="alex@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Inquiry Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, inquiryType: type })
                          }
                          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            formData.inquiryType === type
                              ? "bg-accent-primary text-white shadow-md"
                              : "bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-custom"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Subject
                    </label>
                    <input
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border-custom text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all"
                      placeholder="e.g. Next.js App Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border-custom text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all resize-none"
                      placeholder="Tell me about your project, timeline, and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-gold text-white font-semibold hover:opacity-95 shadow-lg hover:shadow-accent-primary/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <AnimatePresence mode="wait">
                      {status === "loading" ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </motion.div>
                      ) : status === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                          Message Sent!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Send Message
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-400">Message couldn&apos;t be sent</p>
                        <p className="text-xs text-red-400/70 mt-0.5">
                          Please check your connection or email me directly at{" "}
                          <a href={`mailto:${contact.email}`} className="underline hover:text-red-300">{contact.email}</a>.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </form>
              </GlassCard>
            </SectionReveal>

            <SectionReveal className="lg:col-span-2" direction="right">
              <div className="space-y-4">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="block"
                  >
                    <GlassCard className="p-5 flex items-center gap-4 group cursor-pointer border border-border-custom">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background: `${s.color}15` }}
                      >
                        <s.icon className="w-6 h-6" style={{ color: s.color }} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">{s.label}</p>
                        <p className="text-sm text-text-secondary">{s.detail}</p>
                      </div>
                    </GlassCard>
                  </motion.a>
                ))}

                <GlassCard className="p-6 mt-4 border border-border-custom">
                  <h3 className="font-bold font-heading text-text-primary mb-2">
                    Current Availability
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Open for high-impact full-stack development, agentic automation systems, and engineering consulting.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-accent-emerald">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Q3/Q4 Projects
                  </div>
                </GlassCard>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
