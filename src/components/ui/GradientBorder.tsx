"use client";

import { type ReactNode } from "react";

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
}

export function GradientBorder({ children, className = "" }: GradientBorderProps) {
  return (
    <div className={`gradient-border ${className}`}>
      {children}
    </div>
  );
}
