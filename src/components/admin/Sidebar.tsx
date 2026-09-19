"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink,
  Home,
  Cpu,
  BookOpen,
  Bot,
  X,
} from "lucide-react";

export const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/tech", label: "Tech Stack", icon: Cpu },
  { href: "/admin/about-content", label: "About", icon: BookOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-surface border-r border-border-custom">
      <div className="p-5 border-b border-border-custom flex items-center justify-between">
        <Link
          href="/admin"
          onClick={onClose}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-emerald flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold font-heading text-text-primary text-base">
            Portfolio Admin
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {adminLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-accent-primary/15 text-accent-primary font-semibold border border-accent-primary/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              }`}
            >
              <link.icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border-custom space-y-1">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          <span>View Public Site</span>
        </Link>
        <button
          onClick={async () => {
            if (onClose) onClose();
            await signOut({ redirect: false });
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-text-secondary hover:text-red-500 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 min-h-screen shrink-0 sticky top-0 h-screen">
      <SidebarContent />
    </aside>
  );
}
