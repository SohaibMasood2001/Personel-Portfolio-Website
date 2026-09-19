"use client";

import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl ${hover ? "glass-hover" : ""} transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
