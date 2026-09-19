"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles, ExternalLink } from "lucide-react";
import { Sidebar, SidebarContent, adminLinks } from "@/components/admin/Sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  if (isLogin) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // Get current active section name for mobile header
  const currentLink = adminLinks.find((l) =>
    l.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(l.href)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Fixed Sidebar */}
      <Sidebar />

      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-border-custom px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-surface-elevated border border-border-custom text-text-primary hover:text-accent-primary focus:outline-none transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold font-heading text-text-primary text-sm">
              {currentLink ? currentLink.label : "Admin"}
            </span>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-xs flex items-center gap-1.5"
          title="View public site"
        >
          <span className="hidden sm:inline">Site</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </header>

      {/* Mobile Slide-over Drawer & Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] shadow-2xl z-10"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
