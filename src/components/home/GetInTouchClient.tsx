"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import { DEFAULT_CONTACT } from "@/lib/site-contact";

type Props = {
  email: string;
  phone?: string;
  linkedin: string;
  location: string;
};

export function GetInTouchClient({
  email = DEFAULT_CONTACT.email,
  phone = DEFAULT_CONTACT.phone,
  linkedin,
  location,
}: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const links = [
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${email}`,
      detail: email,
      color: "#E8536A",
    },
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      href: `tel:${phone.replace(/\s+/g, "")}`,
      detail: phone,
      color: "#10B981",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: linkedin || "https://linkedin.com",
      detail: "Connect on LinkedIn",
      color: "#D4A853",
    },
    {
      icon: MapPin,
      label: "Location",
      href: "#",
      detail: location || "Islamabad, Pakistan",
      color: "#1B2A4A",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "Homepage inquiry",
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
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
    <section id="get-in-touch" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-accent-gold/5 to-accent-secondary/5 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-3">
              Let&apos;s build something <span className="gradient-text">together</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Have an idea, project, or role you&apos;d like to discuss? Send me a message below and I&apos;ll get back to you promptly.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionReveal direction="left">
            <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-text-primary mb-2">
                  Direct Contact
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  Feel free to reach out directly through any of these channels.
                </p>
                <div className="space-y-3">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-3 p-3 rounded-xl glass glass-hover group border border-border-custom"
                    >
                      <span
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${link.color}18` }}
                      >
                        <link.icon
                          className="w-4 h-4"
                          style={{ color: link.color }}
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                          {link.label}
                        </span>
                        <span className="block text-xs text-text-secondary truncate">
                          {link.detail}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border-custom text-xs text-text-secondary">
                <span className="font-semibold text-text-primary">Response time:</span> Usually within 24 hours.
              </div>
            </GlassCard>
          </SectionReveal>

          <SectionReveal direction="right">
            <GlassCard className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-accent-emerald mb-3" />
                    <p className="text-lg font-semibold text-text-primary">
                      Message sent successfully
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      Thanks for reaching out! I&apos;ll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Your Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border-custom text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all"
                        placeholder="e.g. Alex Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border-custom text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all"
                        placeholder="alex@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border-custom text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-all resize-none"
                        placeholder="Tell me about your project or role..."
                      />
                    </div>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-400">Message couldn&apos;t be sent</p>
                          <p className="text-xs text-red-400/70 mt-0.5">
                            Please check your connection or email me directly at{" "}
                            <a href={`mailto:${email}`} className="underline hover:text-red-300">{email}</a>.
                          </p>
                        </div>
                      </motion.div>
                    )}
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-gold text-white font-semibold disabled:opacity-60 shadow-lg hover:shadow-accent-primary/25 transition-all"
                      >
                        {status === "loading" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {status === "loading" ? "Sending…" : "Send Message"}
                      </button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
