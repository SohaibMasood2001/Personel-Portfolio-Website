"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  PhoneOff,
  Mic,
  Calendar,
  Pill,
  Stethoscope,
  CheckCircle2,
  X,
  RefreshCw,
  ClipboardList,
  Bell,
  User,
  Bot,
} from "lucide-react";
import type { AgentDemoProps } from "@/lib/agent-showcase";

type CallPhase =
  | "idle"
  | "ringing"
  | "listening"
  | "working"
  | "done";

type TaskId =
  | "answer"
  | "triage"
  | "lookup"
  | "rx"
  | "refill"
  | "book"
  | "notify"
  | "summary";

const TASKS: { id: TaskId; label: string; icon: typeof Pill }[] = [
  { id: "answer", label: "Pick up clinic line", icon: Phone },
  { id: "triage", label: "Check symptoms", icon: ClipboardList },
  { id: "lookup", label: "Pull clinical notes", icon: Stethoscope },
  { id: "rx", label: "Suggest medicine", icon: Pill },
  { id: "refill", label: "Queue refill", icon: RefreshCw },
  { id: "book", label: "Book visit", icon: Calendar },
  { id: "notify", label: "Alert doctor", icon: Bell },
  { id: "summary", label: "Send call summary", icon: ClipboardList },
];

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function DonePopup({
  kind,
  onClose,
}: {
  kind: "visit" | "refill";
  onClose: () => void;
}) {
  const visit = kind === "visit";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center p-3 bg-black/55 backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ scale: 0.88, y: 18, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
        className="relative w-full max-w-[255px] rounded-2xl border border-sky-400/30 overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #0c1f2e, #071018)",
          boxShadow: "0 0 40px #0ea5e944",
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
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-14 h-14 mx-auto rounded-full bg-sky-500/20 flex items-center justify-center mb-3 relative"
          >
            {visit ? (
              <Calendar className="w-7 h-7 text-sky-300" />
            ) : (
              <RefreshCw className="w-7 h-7 text-emerald-300" />
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#071018]">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </span>
          </motion.div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-sky-400/80 mb-1">
            Handled on the call
          </p>
          <h3 className="text-sm font-bold text-white mb-0.5">
            {visit ? "Visit booked" : "Refill approved"}
          </h3>
          <p className="text-[11px] text-white/70">
            {visit
              ? "Dr. A. Khan, tomorrow 10:30"
              : "Salbutamol inhaler, 30 days"}
          </p>
          <p className="text-[10px] text-white/40 mt-2">
            Clinic assistant closed the loop
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MedCareClinicDemo({ onCycleComplete }: AgentDemoProps = {}) {
  const [phase, setPhase] = useState<CallPhase>("idle");
  const [doneTasks, setDoneTasks] = useState<TaskId[]>([]);
  const [activeTask, setActiveTask] = useState<TaskId | null>(null);
  const [caption, setCaption] = useState("");
  const [popup, setPopup] = useState<"visit" | "refill" | null>(null);
  const [timer, setTimer] = useState("00:00");
  const onCompleteRef = useRef(onCycleComplete);
  onCompleteRef.current = onCycleComplete;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase("idle");
        setDoneTasks([]);
        setActiveTask(null);
        setCaption("");
        setPopup(null);
        setTimer("00:00");
        await wait(250);
        if (cancelled) return;

        setPhase("ringing");
        setCaption("Patient calling the clinic…");
        await wait(650);
        if (cancelled) return;

        setPhase("listening");
        setCaption("Fever, cough, and low on inhaler");
        setTimer("00:05");
        await wait(580);

        setPhase("working");
        const script: { id: TaskId; line: string; time: string }[] = [
          { id: "answer", line: "Clinic assistant answers the call", time: "00:03" },
          { id: "triage", line: "Checking fever, cough, chest pain", time: "00:08" },
          { id: "lookup", line: "Pulling matching clinical notes", time: "00:12" },
          { id: "rx", line: "Suggesting Salbutamol inhaler", time: "00:16" },
          { id: "refill", line: "Sending refill to the pharmacy", time: "00:20" },
          { id: "book", line: "Finding Dr. Khan tomorrow morning", time: "00:25" },
          { id: "notify", line: "Doctor gets a short summary", time: "00:29" },
          { id: "summary", line: "Call wrap-up saved to the chart", time: "00:33" },
        ];

        for (const step of script) {
          if (cancelled) return;
          setActiveTask(step.id);
          setCaption(step.line);
          setTimer(step.time);
          await wait(450);
          setDoneTasks((prev) => [...prev, step.id]);
          setActiveTask(null);
          await wait(100);
        }

        setPhase("done");
        setPopup("refill");
        await wait(900);
        if (cancelled) return;
        setPopup("visit");
        await wait(1200);
        if (cancelled) return;
        setPopup(null);

        const done = onCompleteRef.current;
        done?.();
        if (done) return;

        await wait(400);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-[#050d14] shadow-lg flex flex-col">
      <div className="px-3 py-2 border-b border-white/10 bg-sky-500/5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold text-white tracking-tight">
              MedCare Clinic
            </p>
            <p className="text-[9px] text-sky-300/80">
              Phone assistant for visits, meds, and refills
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex flex-col items-center">
              <span className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                <User className="w-3 h-3 text-white/70" />
              </span>
              <span className="text-[6px] text-white/40">Patient</span>
            </span>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="w-6 h-6 rounded-full bg-sky-500/35 border border-sky-400/45 flex items-center justify-center">
                <Bot className="w-3 h-3 text-sky-200" />
              </span>
              <span className="text-[6px] text-sky-300">Agent</span>
            </motion.span>
            <span className="flex flex-col items-center">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                <Stethoscope className="w-3 h-3 text-emerald-300" />
              </span>
              <span className="text-[6px] text-emerald-400/70">Doctor</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-[0.95fr_1.05fr] min-h-[200px]">
        <div className="flex flex-col items-center justify-center p-3 border-r border-white/10 bg-gradient-to-b from-sky-950/50 to-transparent">
          <div className="relative mb-3">
            {(phase === "ringing" || phase === "listening" || phase === "working") && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border border-sky-400/40"
                  animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-sky-300/25"
                  animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.35 }}
                />
              </>
            )}
            <div className="relative w-16 h-16 rounded-full bg-sky-600/35 border border-sky-400/45 flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-sky-100" />
            </div>
          </div>

          <p className="text-[11px] font-semibold text-white">Clinic line</p>
          <p className="text-[9px] text-sky-300/80 font-mono mb-2">{timer}</p>

          <div className="flex items-center gap-2 mb-2">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                phase === "done" || phase === "idle"
                  ? "bg-white/10 text-white/35"
                  : "bg-emerald-500/85 text-white"
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
            </span>
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                phase === "done"
                  ? "bg-rose-500 text-white"
                  : "bg-sky-600 text-white"
              }`}
            >
              {phase === "done" ? (
                <PhoneOff className="w-3.5 h-3.5" />
              ) : (
                <Phone className="w-3.5 h-3.5" />
              )}
            </span>
          </div>

          {(phase === "listening" || phase === "working") && (
            <div className="flex items-end gap-0.5 h-5 mb-2">
              {[5, 9, 13, 7, 11, 6, 10].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-sky-400"
                  animate={{ height: [3, h, 3] }}
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    delay: i * 0.06,
                  }}
                />
              ))}
            </div>
          )}

          <p className="text-[9px] text-white/55 text-center leading-snug min-h-[32px] px-1">
            {caption}
          </p>
        </div>

        <div className="p-2.5 flex flex-col">
          <p className="text-[7px] uppercase tracking-wider text-white/35 mb-2">
            What the assistant is doing
          </p>
          <div className="space-y-1 flex-1 overflow-y-auto max-h-[168px] pr-0.5">
            {TASKS.map((task) => {
              const done = doneTasks.includes(task.id);
              const active = activeTask === task.id;
              const Icon = task.icon;
              return (
                <motion.div
                  key={task.id}
                  animate={
                    active
                      ? { scale: 1.02, backgroundColor: "rgba(14,165,233,0.16)" }
                      : done
                        ? { scale: 1, backgroundColor: "rgba(16,185,129,0.1)" }
                        : { scale: 1, backgroundColor: "rgba(255,255,255,0.03)" }
                  }
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-2 py-1.5"
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      done
                        ? "text-emerald-400"
                        : active
                          ? "text-sky-300"
                          : "text-white/30"
                    }`}
                  />
                  <span
                    className={`text-[10px] flex-1 ${
                      done || active ? "text-white" : "text-white/35"
                    }`}
                  >
                    {task.label}
                  </span>
                  {done ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : active ? (
                    <motion.span
                      className="w-2 h-2 rounded-full bg-sky-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {popup && <DonePopup kind={popup} onClose={() => setPopup(null)} />}
      </AnimatePresence>
    </div>
  );
}
