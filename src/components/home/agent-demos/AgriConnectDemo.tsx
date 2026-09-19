"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Leaf,
  Tractor,
  ShoppingBag,
  Wrench,
  CheckCircle2,
  X,
  Wallet,
  Package,
  User,
  Bot,
  Users,
} from "lucide-react";
import type { AgentDemoProps } from "@/lib/agent-showcase";

type Action =
  | "idle"
  | "scan"
  | "buy"
  | "rent"
  | "labour"
  | "popup-order"
  | "popup-tractor"
  | "popup-labour";

const TOOLS = [
  { id: "get_products", label: "Find crop listing" },
  { id: "buy_crop", label: "Place crop order" },
  { id: "settle_payment", label: "Settle AGRI wallet" },
  { id: "get_machine_listings", label: "Search tractors" },
  { id: "rent_machine", label: "Request rental" },
  { id: "hire_labour", label: "Request harvest crew" },
];

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function OutcomePopup({
  kind,
  onClose,
}: {
  kind: "order" | "tractor" | "labour";
  onClose: () => void;
}) {
  const config = {
    order: {
      icon: ShoppingBag,
      title: "Order booked",
      subtitle: "Premium Basmati · 20kg",
      detail: "#AC-2841 · 252 AGRI settled",
      color: "#34d399",
    },
    tractor: {
      icon: Tractor,
      title: "Tractor booked",
      subtitle: "Tractor Pro 100 · Lahore",
      detail: "Weekend · 1,602 AGRI/hour",
      color: "#fbbf24",
    },
    labour: {
      icon: Users,
      title: "Crew requested",
      subtitle: "Harvest Group · 5 workers",
      detail: "Wheat field · pending accept",
      color: "#60a5fa",
    },
  }[kind];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center p-3 bg-black/50 backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20, rotate: -2 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
        className="relative w-full max-w-[240px] rounded-2xl border border-emerald-400/30 overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #0e2624, #071512)",
          boxShadow: `0 0 36px ${config.color}33`,
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3 relative"
            style={{ background: `${config.color}18` }}
          >
            <Icon className="w-7 h-7" style={{ color: config.color }} />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#0e2624]">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </span>
          </motion.div>
          <p className="text-[9px] uppercase tracking-[0.16em] text-emerald-400/80 mb-1">
            Agent finished it
          </p>
          <h3 className="text-sm font-bold text-white">{config.title}</h3>
          <p className="text-[11px] text-white/70">{config.subtitle}</p>
          <p className="text-[10px] text-white/45 mt-1 mb-2">{config.detail}</p>
          <p className="text-[8px] text-white/35 flex items-center justify-center gap-1">
            <Wallet className="w-3 h-3 text-emerald-400" /> Same rules as the website
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AgriConnectDemo({ onCycleComplete }: AgentDemoProps = {}) {
  const [action, setAction] = useState<Action>("idle");
  const [toolIdx, setToolIdx] = useState(-1);
  const [highlight, setHighlight] = useState<"crop" | "machine" | "crew" | null>(
    null
  );
  const [popup, setPopup] = useState<"order" | "tractor" | "labour" | null>(null);
  const [agentPulse, setAgentPulse] = useState(false);
  const onCompleteRef = useRef(onCycleComplete);
  onCompleteRef.current = onCycleComplete;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setAction("idle");
        setToolIdx(-1);
        setHighlight(null);
        setPopup(null);
        setAgentPulse(false);
        await wait(280);
        if (cancelled) return;

        setAgentPulse(true);
        setAction("scan");
        setHighlight("crop");
        await wait(480);

        setAction("buy");
        for (let i = 0; i < 3; i++) {
          if (cancelled) return;
          setToolIdx(i);
          await wait(280);
        }
        setPopup("order");
        await wait(1100);
        if (cancelled) return;
        setPopup(null);

        setHighlight("machine");
        setAction("rent");
        for (let i = 3; i < 5; i++) {
          if (cancelled) return;
          setToolIdx(i);
          await wait(290);
        }
        setPopup("tractor");
        await wait(1100);
        if (cancelled) return;
        setPopup(null);

        setHighlight("crew");
        setAction("labour");
        setToolIdx(5);
        await wait(420);
        setPopup("labour");
        await wait(1100);
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
    <div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-[#0e2624] shadow-lg flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-white text-[11px] font-bold leading-tight">
              AgriConnect market
            </p>
            <p className="text-[9px] text-emerald-300/75 truncate">
              Your agent buys, rents, and hires from the catalog
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="flex flex-col items-center">
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/15">
              <User className="w-3 h-3 text-white/70" />
            </span>
            <span className="text-[6px] text-white/40">You</span>
          </span>
          <motion.span
            animate={agentPulse ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center border border-emerald-400/40">
              <Bot className="w-3 h-3 text-emerald-300" />
            </span>
            <span className="text-[6px] text-emerald-400/80">Agent</span>
          </motion.span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-[1.2fr_0.8fr] min-h-[190px]">
        <div className="p-2.5 space-y-1.5 border-r border-white/10 overflow-hidden">
          <p className="text-[7px] uppercase tracking-wider text-white/35">
            Live listings
          </p>
          {(
            [
              {
                key: "crop" as const,
                icon: Package,
                title: "Premium Basmati Rice",
                sub: "20kg · Farmer · Punjab",
                price: "252 AGRI",
                color: "#34d399",
              },
              {
                key: "machine" as const,
                icon: Tractor,
                title: "Tractor Pro 100",
                sub: "Lahore · weekend slots",
                price: "1,602 AGRI/hr",
                color: "#fbbf24",
              },
              {
                key: "crew" as const,
                icon: Users,
                title: "Harvest Group",
                sub: "5 workers · wheat",
                price: "Hire request",
                color: "#60a5fa",
              },
            ] as const
          ).map((card) => {
            const Icon = card.icon;
            const on = highlight === card.key;
            return (
              <motion.div
                key={card.key}
                className={`rounded-xl border p-2 flex gap-2 ${
                  on
                    ? "border-emerald-400/50 bg-emerald-500/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
                animate={on ? { scale: [1, 1.025, 1], x: [0, 2, 0] } : { scale: 1 }}
                transition={{ duration: 0.9, repeat: on ? Infinity : 0 }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${card.color}22` }}
                >
                  <Icon className="w-4 h-4" style={{ color: card.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-white truncate">
                    {card.title}
                  </p>
                  <p className="text-[8px] text-white/45">{card.sub}</p>
                  <p
                    className="text-[9px] font-mono mt-0.5"
                    style={{ color: card.color }}
                  >
                    {card.price}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-2.5 flex flex-col">
          <p className="text-[7px] uppercase tracking-wider text-white/35 mb-2 flex items-center gap-1">
            <Wrench className="w-2.5 h-2.5" /> Agent steps
          </p>
          <div className="space-y-1 flex-1 overflow-hidden">
            {TOOLS.map((t, i) => (
              <motion.div
                key={t.id}
                animate={
                  toolIdx === i
                    ? { backgroundColor: "rgba(16,185,129,0.18)", x: 3 }
                    : toolIdx > i
                      ? { backgroundColor: "rgba(16,185,129,0.08)", x: 0 }
                      : { backgroundColor: "transparent", x: 0 }
                }
                className="flex items-center gap-1.5 text-[9px] px-1.5 py-1 rounded"
              >
                {toolIdx > i ? (
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                ) : toolIdx === i ? (
                  <motion.span
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                  >
                    <Wrench className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                  </motion.span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0" />
                )}
                <span
                  className={`truncate ${
                    toolIdx >= i ? "text-emerald-100" : "text-white/30"
                  }`}
                >
                  {t.label}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-[8px] text-white/35 mt-1 flex items-center gap-1">
            <Bot className="w-3 h-3 text-emerald-400" />
            {action === "buy" && "Buying crop for you…"}
            {action === "rent" && "Renting machine…"}
            {action === "labour" && "Hiring harvest crew…"}
            {action === "scan" && "Scanning catalog…"}
            {(action === "idle" || action.startsWith("popup")) && "Ready"}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {popup && <OutcomePopup kind={popup} onClose={() => setPopup(null)} />}
      </AnimatePresence>
    </div>
  );
}
