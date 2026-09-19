"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Leaf,
  Briefcase,
  Gamepad2,
  Stethoscope,
  FileText,
  Share2,
  Mic,
  Sparkles,
  Plane,
} from "lucide-react";
import { getShowcaseBySlug } from "@/lib/agent-showcase";

const iconBySlug: Record<string, typeof Bot> = {
  agriconnect: Leaf,
  dualhire: Briefcase,
  modagent: Gamepad2,
  "medcare-clinic-agent": Stethoscope,
  "resume-builder-agent": FileText,
  "linkedin-content-agent": Share2,
  "voice-content-pipeline": Mic,
  "online-makeup-store": Sparkles,
  "airline-reservation-system": Plane,
};

interface ProjectThumbnailProps {
  src?: string | null;
  title: string;
  accentColor: string;
  slug?: string;
  className?: string;
  variant?: "square" | "wide";
  /** Prefer animated agent preview over static image when a demo exists. Default true. */
  preferDemo?: boolean;
}

export function ProjectThumbnail({
  src,
  title,
  accentColor,
  slug,
  className = "",
  variant = "wide",
  preferDemo = true,
}: ProjectThumbnailProps) {
  const slide = preferDemo ? getShowcaseBySlug(slug) : undefined;
  const Demo = slide?.Demo;
  const Icon = (slug && iconBySlug[slug]) || Bot;
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [src]);

  useEffect(() => {
    if (!Demo || !hostRef.current) return;
    const el = hostRef.current;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [Demo]);

  if (Demo) {
    return (
      <div
        ref={hostRef}
        className={`overflow-hidden w-full h-[220px] sm:h-[260px] rounded-t-2xl bg-[#0a0a0f] ${className}`}
      >
        <div className="h-full p-2 pointer-events-none select-none">
          {visible ? (
            <Demo />
          ) : (
            <div
              className="h-full rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}33 0%, ${accentColor}11 50%, transparent 100%)`,
              }}
            >
              <Icon
                className="w-8 h-8 opacity-60"
                style={{ color: accentColor }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  const sizeClass =
    variant === "square"
      ? "w-20 h-20 sm:w-24 sm:h-24 rounded-xl"
      : "w-full aspect-[16/9] max-h-[160px] rounded-t-2xl";

  if (src && !imgFailed) {
    return (
      <div className={`overflow-hidden ${sizeClass} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${title} preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden flex items-center justify-center ${sizeClass} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${accentColor}33 0%, ${accentColor}11 50%, transparent 100%)`,
      }}
    >
      <Icon
        className="w-8 h-8 sm:w-10 sm:h-10 opacity-70 transition-transform duration-500 group-hover:scale-110"
        style={{ color: accentColor }}
      />
    </div>
  );
}
