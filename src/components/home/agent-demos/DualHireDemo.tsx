"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Lock,
  Check,
  Calendar,
  Clock,
  MapPin,
  Video,
  Sparkles,
  X,
  User,
  Bot,
  Send,
  Briefcase,
  FileText,
  ArrowRight,
} from "lucide-react";
import type { AgentDemoProps } from "@/lib/agent-showcase";

const AVA = "#3388ff";
const ORION = "#e8b95a";
const LIVE = "#3ddc84";

type Phase = "job" | "handoff" | "negotiate" | "booked";

type LogEntry = {
  time: string;
  actor: string;
  color: string;
  message: string;
  isAgent?: boolean;
};

const STEPS = [
  { label: "You hit Apply", side: "You" },
  { label: "Packet sent to Ava", side: "Agent" },
  { label: "Ava opens the job board", side: "Agent" },
  { label: "Handoff to Orion", side: "Link" },
  { label: "Orion scores the fit", side: "Agent" },
  { label: "Negotiate interview slot", side: "Link" },
  { label: "Confirm on Northbridge", side: "Agent" },
];

const LOGS: LogEntry[] = [
  {
    time: "12:04:18",
    actor: "YOU",
    color: "#94a3b8",
    message: "Clicked Apply on Senior Backend Engineer.",
  },
  {
    time: "12:04:19",
    actor: "AVA · AGENT",
    color: AVA,
    message: "Got your packet. Loading board requirements…",
    isAgent: true,
  },
  {
    time: "12:04:21",
    actor: "AVA · AGENT",
    color: AVA,
    message: "Application JOB-1050 submitted on Northbridge.",
    isAgent: true,
  },
  {
    time: "12:04:22",
    actor: "SECURE LINK",
    color: LIVE,
    message: "Secure handoff Ava → Orion started.",
    isAgent: true,
  },
  {
    time: "12:04:23",
    actor: "ORION · AGENT",
    color: ORION,
    message: "Reviewing package against role must-haves.",
    isAgent: true,
  },
  {
    time: "12:04:25",
    actor: "ORION · AGENT",
    color: ORION,
    message: "Fit 94%. Offering Thu 10:30 Zoom slot.",
    isAgent: true,
  },
  {
    time: "12:04:26",
    actor: "AVA · AGENT",
    color: AVA,
    message: "Accepted. Booking on the career site now.",
    isAgent: true,
  },
];

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function PersonAvatar({
  accent,
  label,
  sub,
  active,
  kind,
}: {
  accent: string;
  label: string;
  sub: string;
  active: boolean;
  kind: "human" | "agent";
}) {
  return (
    <motion.div
      animate={
        active
          ? { boxShadow: [`0 0 0 ${accent}00`, `0 0 22px ${accent}55`, `0 0 0 ${accent}00`] }
          : { boxShadow: "0 0 0 transparent" }
      }
      transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
      className="rounded-xl p-2 border backdrop-blur-sm h-full flex flex-col items-center"
      style={{
        background: "rgba(8,20,45,0.78)",
        borderColor: `${accent}45`,
      }}
    >
      <div className="flex items-center gap-1 mb-1.5 self-start">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: active ? LIVE : accent,
            boxShadow: `0 0 6px ${active ? LIVE : accent}`,
          }}
        />
        <span className="text-[7px] uppercase tracking-widest text-slate-400">
          {kind === "agent" ? "AI agent" : "Human"}
        </span>
      </div>

      <div className="relative w-11 h-11 mx-auto">
        {active && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `${accent}66` }}
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: accent }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
        <div
          className="absolute inset-1.5 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${accent}bb, #030712)`,
            boxShadow: `0 0 16px ${accent}55`,
          }}
        >
          {kind === "agent" ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>
        {kind === "agent" && (
          <span
            className="absolute -bottom-0.5 -right-0.5 text-[6px] font-bold px-1 py-0.5 rounded-full border"
            style={{
              background: "#030712",
              borderColor: accent,
              color: accent,
            }}
          >
            AGENT
          </span>
        )}
      </div>

      <p className="text-center text-[11px] font-semibold text-white mt-2">
        {label}
      </p>
      <p className="text-center text-[8px]" style={{ color: accent }}>
        {sub}
      </p>
      <div
        className="mt-auto pt-1.5 text-[7px] text-center py-0.5 px-2 rounded-full font-semibold uppercase tracking-wider"
        style={{ background: `${accent}18`, color: accent }}
      >
        {active ? "Working" : "Standby"}
      </div>
    </motion.div>
  );
}

function InterviewPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center p-3 bg-black/55 backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="relative w-full max-w-[280px] rounded-2xl border overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(8,20,45,0.98), rgba(3,7,18,0.98))",
          borderColor: `${LIVE}55`,
          boxShadow: `0 0 40px ${LIVE}33, 0 20px 50px rgba(0,0,0,0.5)`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${AVA}, ${LIVE}, ${ORION})`,
          }}
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="p-4 pt-5 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.15, stiffness: 400 }}
            className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
            style={{
              background: `${LIVE}22`,
              boxShadow: `0 0 24px ${LIVE}44`,
            }}
          >
            <Check className="w-7 h-7" style={{ color: LIVE }} strokeWidth={3} />
          </motion.div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/80 mb-1">
            Agents finished the job
          </p>
          <h3 className="text-sm font-bold text-white mb-1">
            Interview is scheduled
          </h3>
          <p className="text-[10px] text-slate-400 mb-3">
            Senior Backend Engineer · Northbridge
          </p>

          <div className="space-y-1.5 text-left rounded-xl border border-white/10 bg-white/5 p-2.5 mb-3">
            <div className="flex items-center gap-2 text-[10px] text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Thu, Aug 7, 2026
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              10:30 AM to 11:15 AM (PKT)
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-200">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              Zoom · Meeting ID 847-220-193
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              Remote · Orion + hiring panel
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-[8px] text-slate-400">
            <span className="flex items-center gap-1">
              <Bot className="w-3 h-3" style={{ color: AVA }} /> Ava
            </span>
            <ArrowRight className="w-3 h-3 text-slate-600" />
            <span className="flex items-center gap-1">
              <Bot className="w-3 h-3" style={{ color: ORION }} /> Orion
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Animated pointer that moves to Apply and “clicks” it. */
function ApplyClickHand({
  visible,
  pressing,
}: {
  visible: boolean;
  pressing: boolean;
}) {
  if (!visible) return null;
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{ right: "8%", bottom: "2%" }}
      initial={{ opacity: 0, x: 36, y: 48, scale: 0.85 }}
      animate={
        pressing
          ? { opacity: 1, x: 4, y: 10, scale: 0.88 }
          : {
              opacity: 1,
              x: [36, 18, 4],
              y: [48, 22, 14],
              scale: [0.85, 1, 1],
            }
      }
      transition={
        pressing
          ? { duration: 0.12, ease: "easeOut" }
          : { duration: 1.35, ease: [0.22, 1, 0.36, 1], times: [0, 0.55, 1] }
      }
      aria-hidden
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)]"
      >
        <path
          d="M9 11.5V6.2a1.7 1.7 0 0 1 3.4 0V11M12.4 11V4.8a1.7 1.7 0 0 1 3.4 0V11M15.8 11.2V6.5a1.7 1.7 0 0 1 3.4 0v7.3c0 3.2-2.1 5.7-5.4 5.7h-1.3c-1.7 0-3.2-.6-4.3-1.7l-3.6-3.7a1.55 1.55 0 0 1 2.2-2.2l1.4 1.4V11.5A1.7 1.7 0 0 1 9 9.8"
          fill="#fff"
          stroke="#0f172a"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M9 11.5V6.2a1.7 1.7 0 0 1 3.4 0V11"
          fill="#e2e8f0"
          stroke="#0f172a"
          strokeWidth="1.1"
        />
      </svg>
      {pressing && (
        <motion.span
          className="absolute left-1 top-1 w-5 h-5 rounded-full border-2 border-blue-300"
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.45 }}
        />
      )}
    </motion.div>
  );
}

export function DualHireDemo({ onCycleComplete }: AgentDemoProps = {}) {
  const [phase, setPhase] = useState<Phase>("job");
  const [logCount, setLogCount] = useState(0);
  const [stepDone, setStepDone] = useState(0);
  const [typed, setTyped] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [beam, setBeam] = useState(false);
  const [packetFly, setPacketFly] = useState(false);
  const [applyPulse, setApplyPulse] = useState(true);
  const [showHand, setShowHand] = useState(false);
  const [handPress, setHandPress] = useState(false);
  const runId = useRef(0);
  const handSeq = useRef(0);
  const cancelledRef = useRef(false);
  const onCompleteRef = useRef(onCycleComplete);
  onCompleteRef.current = onCycleComplete;

  const runNegotiation = useCallback(async (id: number) => {
    setPhase("handoff");
    setPacketFly(true);
    setStepDone(1);
    await wait(550);
    if (cancelledRef.current || runId.current !== id) return;

    setPacketFly(false);
    setStepDone(2);
    setPhase("negotiate");
    setBeam(true);

    for (let i = 0; i < LOGS.length; i++) {
      if (cancelledRef.current || runId.current !== id) return;
      setStepDone(Math.min(i + 2, STEPS.length));
      const msg = LOGS[i].message;
      setTyped("");
      for (let c = 0; c <= msg.length; c++) {
        if (cancelledRef.current || runId.current !== id) return;
        setTyped(msg.slice(0, c));
        await wait(7);
      }
      setLogCount(i + 1);
      await wait(260);
    }

    setStepDone(STEPS.length);
    setBeam(false);
    setPhase("booked");
    await wait(220);
    if (cancelledRef.current || runId.current !== id) return;
    setShowPopup(true);
    await wait(1600);
    if (cancelledRef.current || runId.current !== id) return;
    setShowPopup(false);
    if (cancelledRef.current || runId.current !== id) return;

    onCompleteRef.current?.();
    if (onCompleteRef.current) return;

    await wait(400);
    if (cancelledRef.current || runId.current !== id) return;

    setPhase("job");
    setLogCount(0);
    setStepDone(0);
    setTyped("");
    setApplyPulse(true);
  }, []);

  const startApply = useCallback(() => {
    if (phase !== "job") return;
    runId.current += 1;
    const id = runId.current;
    handSeq.current += 1; // cancel pending hand-click timers
    setShowHand(false);
    setHandPress(false);
    setApplyPulse(false);
    setLogCount(0);
    setTyped("");
    setShowPopup(false);
    void runNegotiation(id);
  }, [phase, runNegotiation]);

  // Hand moves to Apply, clicks, then A2A starts
  useEffect(() => {
    cancelledRef.current = false;
    if (phase !== "job") return;

    const seq = ++handSeq.current;
    const stillThis = () =>
      !cancelledRef.current && handSeq.current === seq && phase === "job";

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    let t3: ReturnType<typeof setTimeout> | undefined;

    if (reduced) {
      t1 = setTimeout(() => {
        if (stillThis()) startApply();
      }, 500);
      return () => clearTimeout(t1);
    }

    setShowHand(false);
    setHandPress(false);

    t1 = setTimeout(() => {
      if (!stillThis()) return;
      setShowHand(true);
    }, 400);

    t2 = setTimeout(() => {
      if (!stillThis()) return;
      setHandPress(true);
    }, 400 + 800);

    t3 = setTimeout(() => {
      if (!stillThis()) return;
      startApply();
    }, 400 + 800 + 160);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase, startApply]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const newest = LOGS[Math.max(0, logCount - 1)];
  const avaActive = phase === "handoff" || phase === "negotiate" || phase === "booked";
  const orionActive = phase === "negotiate" || phase === "booked";

  return (
    <div
      className="relative h-full rounded-xl overflow-hidden border border-blue-500/20 text-white"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, rgba(51,136,255,0.12), transparent 50%), radial-gradient(ellipse at 80% 0%, rgba(232,185,90,0.1), transparent 45%), #030712",
      }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-black/30">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-white leading-tight">
            DualHire hiring desk
          </p>
          <p className="text-[8px] text-slate-400 truncate">
            You apply. Your agent Ava talks to Orion. Interview lands.
          </p>
        </div>
        <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-semibold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {phase === "job" ? "Waiting for Apply" : "Agents working"}
        </span>
      </div>

      <div className="p-2 space-y-1.5 relative min-h-[280px]">
        <AnimatePresence mode="wait">
          {phase === "job" ? (
            <motion.div
              key="job"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
            >
              <div className="flex items-start gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-white">
                    Senior Backend Engineer
                  </p>
                  <p className="text-[9px] text-slate-400">
                    Northbridge Careers · Remote · Full time
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {["Node.js", "Postgres", "Agents"].map((t) => (
                      <span
                        key={t}
                        className="text-[7px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-8 h-8 rounded-full bg-slate-700/80 flex items-center justify-center border border-white/10">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="text-[6px] text-slate-500">You</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3 text-[8px] text-slate-400">
                <FileText className="w-3 h-3 text-blue-300" />
                Resume + cover note ready in your DualHire packet
              </div>

              <div className="relative">
                <motion.button
                  type="button"
                  onClick={startApply}
                  animate={
                    handPress
                      ? { scale: 0.94 }
                      : applyPulse
                        ? {
                            scale: [1, 1.04, 1],
                            boxShadow: [
                              `0 0 0 0 ${AVA}00`,
                              `0 0 0 8px ${AVA}33`,
                              `0 0 0 0 ${AVA}00`,
                            ],
                          }
                        : { scale: 1 }
                  }
                  transition={
                    handPress
                      ? { duration: 0.12 }
                      : { duration: 1.4, repeat: Infinity }
                  }
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-2.5 rounded-xl font-semibold text-[12px] text-white flex items-center justify-center gap-2 cursor-pointer relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${AVA}, #1d4ed8)`,
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  Apply with DualHire
                </motion.button>
                <ApplyClickHand visible={showHand} pressing={handPress} />
              </div>
              <p className="text-[8px] text-center text-slate-500 mt-1.5">
                Watch the hand hit Apply — then Ava and Orion take over
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="agents"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 px-0.5">
                <span
                  className="text-[8px] px-2 py-0.5 rounded-full border font-medium"
                  style={{
                    borderColor: `${AVA}55`,
                    background: `${AVA}15`,
                    color: "#93c5fd",
                  }}
                >
                  {phase === "handoff"
                    ? "Submitting to Ava"
                    : phase === "negotiate"
                      ? "Agents negotiating"
                      : "Interview booked"}
                </span>
                <span className="text-[7px] text-slate-500 flex items-center gap-1">
                  <Bot className="w-3 h-3" style={{ color: AVA }} />
                  Agent to agent
                </span>
              </div>

              <div className="relative grid grid-cols-[0.9fr_1.15fr_0.9fr] gap-1.5 items-stretch">
                {/* Flying packet */}
                <AnimatePresence>
                  {packetFly && (
                    <motion.div
                      initial={{ left: "12%", top: "40%", opacity: 0, scale: 0.6 }}
                      animate={{
                        left: ["12%", "28%", "42%"],
                        top: ["55%", "30%", "20%"],
                        opacity: [0, 1, 1],
                        scale: [0.6, 1.1, 0.85],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85, ease: "easeInOut" }}
                      className="absolute z-20 pointer-events-none"
                      style={{ position: "absolute" }}
                    >
                      <div
                        className="flex items-center gap-1 px-2 py-1 rounded-lg border text-[7px] font-semibold text-white shadow-lg"
                        style={{
                          background: "#0b1a33",
                          borderColor: `${AVA}66`,
                          boxShadow: `0 0 16px ${AVA}55`,
                        }}
                      >
                        <FileText className="w-3 h-3 text-blue-300" />
                        Packet → Ava
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* A2A beams */}
                {beam && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    aria-hidden
                  >
                    <motion.line
                      x1="22%"
                      y1="35%"
                      x2="78%"
                      y2="35%"
                      stroke={LIVE}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <motion.circle
                      r="3"
                      fill={AVA}
                      animate={{
                        cx: ["22%", "78%", "22%"],
                        cy: ["35%", "35%", "35%"],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
                )}

                <PersonAvatar
                  accent={AVA}
                  label="Ava"
                  sub="Your seeker agent"
                  active={avaActive}
                  kind="agent"
                />

                <div className="flex flex-col items-center gap-1 relative z-0">
                  <motion.div
                    animate={beam ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-center gap-1 text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{ borderColor: `${LIVE}44`, color: LIVE }}
                  >
                    <Lock className="w-2.5 h-2.5" />
                    Secure link
                  </motion.div>

                  <div className="relative w-9 h-9 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: `${ORION}66` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{
                        background: `linear-gradient(145deg, ${ORION}, #a67c2a)`,
                        color: "#1a1205",
                        boxShadow: `0 0 12px ${ORION}66`,
                      }}
                    >
                      DH
                    </div>
                  </div>

                  <div
                    className="w-full rounded-lg border p-1.5 flex-1"
                    style={{
                      background: "rgba(8,20,45,0.85)",
                      borderColor: "rgba(51,136,255,0.25)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-semibold text-slate-200">
                        Pipeline
                      </span>
                      <span className="text-[7px] text-emerald-400 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        {stepDone}/{STEPS.length}
                      </span>
                    </div>
                    <div className="space-y-0.5 max-h-[88px] overflow-hidden">
                      {STEPS.map((s, i) => {
                        const done = i < stepDone;
                        const current = i === stepDone - 1;
                        return (
                          <motion.div
                            key={s.label}
                            initial={false}
                            animate={{
                              opacity: done || current ? 1 : 0.35,
                              x: current ? 2 : 0,
                            }}
                            className="flex items-center gap-1"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full flex items-center justify-center shrink-0"
                              style={{
                                background: done
                                  ? `${LIVE}33`
                                  : "rgba(255,255,255,0.06)",
                                color: done ? LIVE : "#64748b",
                              }}
                            >
                              {done ? <Check className="w-1.5 h-1.5" /> : null}
                            </span>
                            <span
                              className="text-[7px] truncate flex-1"
                              style={{
                                color: done ? "#e2e8f0" : "#64748b",
                              }}
                            >
                              {s.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <PersonAvatar
                  accent={ORION}
                  label="Orion"
                  sub="Company hiring agent"
                  active={orionActive}
                  kind="agent"
                />
              </div>

              <div
                className="rounded-lg border p-1.5 min-h-[62px]"
                style={{
                  background: "rgba(0,0,0,0.35)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-[7px] uppercase tracking-widest text-slate-500 mb-1">
                  Agent activity
                </p>
                <div className="space-y-0.5 font-mono">
                  <AnimatePresence initial={false}>
                    {LOGS.slice(0, Math.max(0, logCount - 1)).map((e) => (
                      <motion.div
                        key={e.time + e.message}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-[auto_auto_1fr] gap-1 text-[7px] leading-tight"
                      >
                        <span className="text-slate-600">{e.time}</span>
                        <span style={{ color: e.color }} className="flex items-center gap-0.5">
                          {e.isAgent ? <Bot className="w-2 h-2" /> : <User className="w-2 h-2" />}
                          [{e.actor}]
                        </span>
                        <span className="text-slate-300 truncate">{e.message}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {logCount > 0 && newest && (
                    <div className="grid grid-cols-[auto_auto_1fr] gap-1 text-[7px] leading-tight">
                      <span className="text-slate-600">{newest.time}</span>
                      <span style={{ color: newest.color }} className="flex items-center gap-0.5">
                        {newest.isAgent ? (
                          <Bot className="w-2 h-2" />
                        ) : (
                          <User className="w-2 h-2" />
                        )}
                        [{newest.actor}]
                      </span>
                      <span className="text-slate-200">
                        {typed}
                        <span className="demo-caret inline-block w-1 h-2 bg-blue-400 ml-0.5 align-middle" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPopup && <InterviewPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </div>
  );
}
