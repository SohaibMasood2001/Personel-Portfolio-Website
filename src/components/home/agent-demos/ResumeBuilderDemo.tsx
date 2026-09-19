"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload,
  FileJson,
  CheckCircle2,
  X,
  FileText,
  Sparkles,
  User,
  Bot,
} from "lucide-react";
import type { AgentDemoProps } from "@/lib/agent-showcase";

type Phase = "idle" | "drop" | "parsing" | "filling" | "polish" | "ready" | "popup";

const META = {
  name: "Jordan Lee",
  title: "Software Engineer",
  email: "jordan.dev@example.com",
  phone: "+92 · · · · · ·",
  education: "BSSE, Software Engineering",
  experience: [
    "Shipped hiring and agriculture products with live agent tools",
    "Built a clinic phone assistant for visits and medicine refills",
    "Desktop tooling for careful game mod installs",
  ],
  skills: ["Java", "React", "Django", "Agent tools", "SQL", "PDF"],
};

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function ExportPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center p-3 bg-black/55 backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ scale: 0.8, y: 28, rotate: -2 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="relative w-full max-w-[240px] rounded-2xl border border-amber-400/35 overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #1c1408, #0c0a06)",
          boxShadow: "0 0 40px #f59e0b44",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-white/40 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="p-4 text-center">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-14 h-16 mx-auto rounded-md bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mb-3 relative"
          >
            <FileText className="w-7 h-7 text-amber-400" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25 }}
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#1c1408]"
            >
              <CheckCircle2 className="w-3 h-3 text-white" />
            </motion.span>
          </motion.div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-amber-400/80 mb-1">
            Ready to download
          </p>
          <h3 className="text-sm font-bold text-white">resume_jordan_lee.pdf</h3>
          <p className="text-[10px] text-white/45 mt-1">
            Built from your metadata file
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ResumeBuilderDemo({ onCycleComplete }: AgentDemoProps = {}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [fill, setFill] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [paperLift, setPaperLift] = useState(false);
  const onCompleteRef = useRef(onCycleComplete);
  onCompleteRef.current = onCycleComplete;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase("idle");
        setFill(0);
        setShowPopup(false);
        setPaperLift(false);
        await wait(280);
        if (cancelled) return;

        setPhase("drop");
        await wait(700);
        if (cancelled) return;

        setPhase("parsing");
        await wait(500);
        if (cancelled) return;

        setPhase("filling");
        for (let i = 1; i <= 5; i++) {
          if (cancelled) return;
          setFill(i);
          await wait(280);
        }

        setPhase("polish");
        setPaperLift(true);
        await wait(520);
        if (cancelled) return;

        setPhase("ready");
        await wait(380);
        if (cancelled) return;

        setPhase("popup");
        setShowPopup(true);
        await wait(1400);
        if (cancelled) return;
        setShowPopup(false);

        const done = onCompleteRef.current;
        done?.();
        if (done) return;

        await wait(380);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0906] shadow-lg flex flex-col">
      <div className="px-3 py-2 border-b border-white/10 bg-amber-500/5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold text-white">Resume Studio</p>
            <p className="text-[9px] text-amber-300/75">
              Drop a profile file, watch the CV fill in
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex flex-col items-center">
              <span className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                <User className="w-3 h-3 text-white/70" />
              </span>
              <span className="text-[6px] text-white/40">You</span>
            </span>
            <motion.span
              animate={
                phase === "parsing" || phase === "filling" || phase === "polish"
                  ? { scale: [1, 1.12, 1] }
                  : {}
              }
              transition={{ duration: 1, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="w-6 h-6 rounded-full bg-amber-500/30 border border-amber-400/40 flex items-center justify-center">
                <Bot className="w-3 h-3 text-amber-200" />
              </span>
              <span className="text-[6px] text-amber-300/80">Builder</span>
            </motion.span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-[0.88fr_1.12fr] min-h-[200px]">
        <div className="border-r border-white/10 p-2.5 flex flex-col relative overflow-hidden">
          <AnimatePresence>
            {phase === "drop" && (
              <motion.div
                initial={{ opacity: 0, y: -18, rotate: -6 }}
                animate={{ opacity: 1, y: 28, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-1/2 top-2 z-10 -translate-x-1/2 pointer-events-none"
              >
                <div className="rounded-md border border-amber-400/40 bg-amber-500/20 px-2 py-1 flex items-center gap-1.5 shadow-lg shadow-amber-900/40">
                  <FileJson className="w-3.5 h-3.5 text-amber-200" />
                  <span className="text-[8px] text-amber-100 font-medium">
                    profile.json
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[7px] uppercase tracking-wider text-white/35 mb-2">
            Your metadata
          </p>

          <motion.div
            className={`flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 px-2 text-center ${
              phase === "drop"
                ? "border-amber-400/80 bg-amber-500/15"
                : phase === "parsing" || fill > 0
                  ? "border-emerald-500/45 bg-emerald-500/8"
                  : "border-white/15 bg-white/[0.03]"
            }`}
            animate={
              phase === "drop"
                ? {
                    boxShadow: [
                      "0 0 0 rgba(245,158,11,0)",
                      "0 0 24px rgba(245,158,11,0.35)",
                      "0 0 0 rgba(245,158,11,0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.1, repeat: phase === "drop" ? Infinity : 0 }}
          >
            {phase === "idle" || phase === "drop" ? (
              <>
                <motion.div
                  animate={phase === "drop" ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  <Upload
                    className={`w-7 h-7 ${phase === "drop" ? "text-amber-300" : "text-white/35"}`}
                  />
                </motion.div>
                <p className="text-[10px] text-white/70 font-medium">
                  Drop profile.json
                </p>
                <p className="text-[8px] text-white/35">
                  name, school, jobs, skills
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0.6, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  <FileJson className="w-7 h-7 text-emerald-400" />
                </motion.div>
                <p className="text-[10px] text-emerald-300 font-medium">
                  profile.json
                </p>
                <p className="text-[8px] text-white/40">
                  {phase === "parsing" ? "Reading fields…" : "Mapped to the page"}
                </p>
              </>
            )}
          </motion.div>

          <div className="mt-2 space-y-1">
            {[
              "identity",
              "education",
              "experience",
              "skills",
              "layout",
              "photo crop",
              "PDF export",
            ].map((step, i) => (
              <motion.div
                key={step}
                initial={false}
                animate={{
                  opacity: fill > i || (phase === "ready" && i < 7) || phase === "popup" ? 1 : 0.28,
                  x: fill > i ? 0 : -4,
                }}
                className="flex items-center gap-1.5 text-[8px] text-amber-100/90"
              >
                {fill > i ||
                ((phase === "ready" || phase === "popup" || phase === "polish") &&
                  i >= 4) ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  </motion.span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" />
                )}
                <span className="capitalize">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-2.5 bg-gradient-to-br from-[#ebe4d6] via-[#f7f4ee] to-[#e8dfd0] relative overflow-hidden">
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #f59e0b33, transparent 40%), radial-gradient(circle at 80% 70%, #0ea5e922, transparent 35%)",
            }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            className="relative h-full rounded-[3px] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] border border-stone-200/90 p-2.5 overflow-hidden origin-top"
            animate={{
              y: paperLift ? -4 : 0,
              rotateZ: paperLift ? -0.6 : 0,
              scale: paperLift ? 1.02 : 1,
              boxShadow: paperLift
                ? "0 18px 36px rgba(0,0,0,0.22)"
                : "0 12px 28px rgba(0,0,0,0.18)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <AnimatePresence mode="wait">
              {fill < 1 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  <p className="text-[9px] text-stone-400 text-center px-4">
                    Blank page waiting for your file
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="filled"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260 }}
                  >
                    <h3 className="text-[12px] font-bold text-stone-900 leading-tight">
                      {META.name}
                    </h3>
                    <p className="text-[8px] text-amber-800/90 font-medium">
                      {META.title}
                    </p>
                    <p className="text-[7px] text-stone-500 mb-2">
                      {META.email} · {META.phone}
                    </p>
                  </motion.div>

                  {fill >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, clipPath: "inset(0 0 100% 0)" }}
                      animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                      transition={{ duration: 0.45 }}
                      className="mb-1.5"
                    >
                      <p className="text-[7px] font-bold uppercase tracking-wider text-stone-800 border-b border-amber-700/30 pb-0.5 mb-0.5">
                        Education
                      </p>
                      <p className="text-[8px] text-stone-700">{META.education}</p>
                    </motion.div>
                  )}

                  {fill >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mb-1.5"
                    >
                      <p className="text-[7px] font-bold uppercase tracking-wider text-stone-800 border-b border-amber-700/30 pb-0.5 mb-0.5">
                        Experience
                      </p>
                      <ul className="space-y-0.5">
                        {META.experience.map((line, i) => (
                          <motion.li
                            key={line}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="text-[7.5px] text-stone-600 leading-snug pl-1.5 relative before:content-['•'] before:absolute before:left-0 before:text-amber-700"
                          >
                            {line}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {fill >= 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-[7px] font-bold uppercase tracking-wider text-stone-800 border-b border-amber-700/30 pb-0.5 mb-1">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {META.skills.map((s, i) => (
                          <motion.span
                            key={s}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: i * 0.05,
                              type: "spring",
                              stiffness: 380,
                            }}
                            className="text-[7px] px-1.5 py-0.5 rounded bg-amber-50 text-stone-700 border border-amber-200/80"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {fill >= 5 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="mt-2 h-0.5 origin-left bg-gradient-to-r from-amber-600/70 to-transparent"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && <ExportPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </div>
  );
}
