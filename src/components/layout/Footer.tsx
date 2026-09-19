"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { LinkedinIcon, XIcon, GithubIcon } from "@/components/ui/SocialIcons";
import { DEFAULT_CONTACT } from "@/lib/site-contact";

type Props = {
  ownerName?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  xUrl?: string;
  location?: string;
};

export function Footer({
  ownerName = DEFAULT_CONTACT.companyName,
  email = DEFAULT_CONTACT.email,
  linkedinUrl = DEFAULT_CONTACT.linkedinUrl,
  githubUrl = DEFAULT_CONTACT.githubUrl,
  xUrl = DEFAULT_CONTACT.xUrl,
  location = DEFAULT_CONTACT.location,
}: Props) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const socialLinks = [
    ...(githubUrl ? [{ href: githubUrl, icon: GithubIcon, label: "GitHub" }] : []),
    { href: linkedinUrl, icon: LinkedinIcon, label: "LinkedIn" },
    ...(xUrl ? [{ href: xUrl, icon: XIcon, label: "X" as const }] : []),
    { href: `mailto:${email}`, icon: Mail, label: "Email" },
  ];

  // Get initials for the logo badge
  const initials = ownerName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <footer className="border-t border-border-custom bg-surface/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold font-heading gradient-text mb-2 flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-accent-primary to-accent-emerald flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              {ownerName}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              AI Engineer specializing in agentic systems, voice AI, LLM
              architectures, and intelligent automation pipelines.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {["Home", "Projects", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-text-secondary hover:text-accent-primary hover:scale-110 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-text-secondary flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-emerald" />
              <span>{location}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} {ownerName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
