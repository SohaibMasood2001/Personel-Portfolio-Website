"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Package,
  ChevronDown,
  ChevronRight,
  Car,
  User,
  CheckCircle2,
  Sparkles,
  X,
  Gamepad2,
  Bot,
} from "lucide-react";
import type { AgentDemoProps } from "@/lib/agent-showcase";

type Line = {
  at: string;
  text: string;
  kind: "ok" | "error" | "info";
  tool?: string;
  request?: string;
  response?: string;
};

const DEMO_LINES: Omit<Line, "at">[] = [
  { kind: "info", text: "user dropped: rancher_xl_pack.zip" },
  { kind: "info", text: "agent: detect_game_installs" },
  {
    kind: "ok",
    text: "detect_game_installs",
    tool: "detect_game_installs",
    request: '{ "roots": ["Steam","Rockstar"] }',
    response: '{ "edition": "Legacy", "ok": true }',
  },
  { kind: "info", text: "agent: classify_mod_package" },
  {
    kind: "ok",
    text: "classify_mod_package",
    tool: "classify_mod_package",
    request: '{ "staging_id": "stg_rx_01" }',
    response: '{ "domains": ["vehicle","ped"] }',
  },
  { kind: "info", text: "agent: create_snapshot" },
  {
    kind: "ok",
    text: "create_snapshot",
    tool: "create_snapshot",
    request: '{ "label": "pre_rancher" }',
    response: '{ "snapshot_id": "snap_44" }',
  },
  { kind: "info", text: "agent: rpf_replace_entry" },
  {
    kind: "ok",
    text: "rpf_replace_entry",
    tool: "rpf_replace_entry",
    request: '{ "entry": "rancherxl.yft" }',
    response: '{ "ok": true }',
  },
  {
    kind: "ok",
    text: "rpf_verify_integrity",
    tool: "rpf_verify_integrity",
    request: '{ "rpf": "vehicles.rpf" }',
    response: '{ "ok": true }',
  },
  { kind: "ok", text: "done: verified_success, assets mirrored to mods/" },
];

function prefix(kind: Line["kind"], tool?: string) {
  if (kind === "error") return "ERR";
  if (kind === "ok") return "OK";
  if (tool) return "Tool";
  return ">>";
}

function prefixColor(kind: Line["kind"]) {
  if (kind === "error") return "#ff3d5a";
  if (kind === "ok") return "#3dffb5";
  return "#ff5eb1";
}

/** Stylized “in-game fetched” vehicle card */
function VehicleCard() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-pink-500/30 bg-gradient-to-br from-[#1a0a18] via-[#0d1520] to-[#061018]">
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 40%, rgba(0,232,209,0.35), transparent 45%), radial-gradient(circle at 20% 80%, rgba(255,45,140,0.3), transparent 40%)",
        }}
      />
      {/* Fake game viewport chrome */}
      <div className="relative px-2 py-1 flex items-center justify-between border-b border-white/10 bg-black/40">
        <span className="text-[7px] font-mono text-teal-300/80">INGAME · STREAMED ASSET</span>
        <span className="text-[7px] text-pink-400">yft · ytd</span>
      </div>
      <div className="relative h-[72px] flex items-end justify-center pb-1">
        {/* Silhouette car built from CSS shapes */}
        <div className="relative w-[78%] h-10">
          <div
            className="absolute bottom-0 left-[8%] right-[8%] h-5 rounded-t-[40%] rounded-b-sm"
            style={{
              background:
                "linear-gradient(180deg, #5affea 0%, #00a896 40%, #0a3040 100%)",
              boxShadow: "0 0 20px rgba(0,232,209,0.45)",
            }}
          />
          <div
            className="absolute bottom-4 left-[22%] right-[22%] h-4 rounded-t-2xl"
            style={{
              background: "linear-gradient(180deg, #9af7ef, #1a6b66)",
            }}
          />
          <div className="absolute bottom-0.5 left-[14%] w-3.5 h-3.5 rounded-full bg-[#111] border-2 border-pink-400/80" />
          <div className="absolute bottom-0.5 right-[14%] w-3.5 h-3.5 rounded-full bg-[#111] border-2 border-pink-400/80" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[7px] font-bold tracking-widest text-white/90 drop-shadow">
            RANCHER XL
          </div>
        </div>
        <Car className="absolute top-2 right-2 w-4 h-4 text-teal-300/50" />
      </div>
      <div className="relative px-2 pb-2 flex items-center justify-between">
        <span className="text-[8px] text-teal-200/90 font-mono">vehicles.rpf / rancherxl.yft</span>
        <span className="text-[7px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          LIVE IN GAME
        </span>
      </div>
    </div>
  );
}

function PedCard() {
  return (
    <div className="relative rounded-xl overflow-hidden border border-violet-500/30 bg-gradient-to-b from-[#1a1028] to-[#08060f]">
      <div className="px-2 py-1 border-b border-white/10 bg-black/30 flex justify-between">
        <span className="text-[7px] font-mono text-violet-300/80">PED MODEL</span>
        <span className="text-[7px] text-pink-400">ydd · yft</span>
      </div>
      <div className="h-[64px] flex items-center justify-center relative">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 60%, rgba(168,85,247,0.35), transparent 55%)",
          }}
        />
        {/* Simple character silhouette */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-5 h-5 rounded-full"
            style={{
              background: "linear-gradient(145deg, #ffb4d9, #ff2d8c)",
              boxShadow: "0 0 12px rgba(255,45,140,0.5)",
            }}
          />
          <div
            className="w-7 h-8 mt-0.5 rounded-t-lg"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #2e1065)",
            }}
          />
          <div className="flex gap-1 -mt-0.5">
            <div className="w-2 h-3 rounded-b bg-[#1e1b4b]" />
            <div className="w-2 h-3 rounded-b bg-[#1e1b4b]" />
          </div>
        </div>
        <User className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-violet-400/40" />
      </div>
      <div className="px-2 pb-1.5 flex justify-between items-center">
        <span className="text-[8px] text-violet-200/80 font-mono">mp_m_freemode</span>
        <span className="text-[7px] text-emerald-300">LOADED</span>
      </div>
    </div>
  );
}

function InstallPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center p-2.5 bg-black/60 backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ scale: 0.82, y: 18, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
        className="relative w-full max-w-[300px] rounded-2xl border overflow-hidden"
        style={{
          borderColor: "rgba(255,45,140,0.4)",
          background: "linear-gradient(165deg, #12081c, #05030a)",
          boxShadow: "0 0 40px rgba(255,45,140,0.25)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1 text-white/40 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="px-3 pt-3 pb-1 flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </motion.div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-pink-400">
              Install verified
            </p>
            <h3 className="text-xs font-bold text-white">Assets live in GTA V</h3>
          </div>
        </div>

        <div className="p-2.5 grid grid-cols-[1.3fr_0.9fr] gap-2">
          <VehicleCard />
          <PedCard />
        </div>

        <div className="px-3 pb-3 flex items-center justify-between gap-2">
          <span className="text-[8px] text-[#a89bb8] flex items-center gap-1">
            <Gamepad2 className="w-3 h-3 text-teal-400" />
            Mirrored from game file tools
          </span>
          <span className="text-[7px] text-pink-300/80 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            Claude · Cursor helpers
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ModAgentDemo({ onCycleComplete }: AgentDemoProps = {}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [dropped, setDropped] = useState(false);
  const [status, setStatus] = useState("idle");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const onCompleteRef = useRef(onCycleComplete);
  onCompleteRef.current = onCycleComplete;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setLines([]);
        setDropped(false);
        setStatus("idle");
        setExpanded(null);
        setRunning(false);
        setShowPopup(false);
        setPreviewReady(false);
        await wait(280);
        if (cancelled) return;

        setDropped(true);
        await wait(380);
        if (cancelled) return;

        setRunning(true);
        setStatus("running");
        await wait(220);

        for (let i = 0; i < DEMO_LINES.length; i++) {
          if (cancelled) return;
          const d = DEMO_LINES[i];
          if (d.text.startsWith("executing") || d.text.startsWith("agent:"))
            setStatus("executing");
          if (d.text.includes("verified_success")) {
            setStatus("verified_success");
            setPreviewReady(true);
          }

          const line: Line = {
            ...d,
            at: new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };
          setLines((prev) => [...prev, line]);

          if (d.tool) {
            setExpanded(i);
            await wait(350);
            setExpanded(null);
          }
          await wait(260);
        }

        setRunning(false);
        await wait(220);
        if (cancelled) return;
        setShowPopup(true);
        await wait(1600);
        if (cancelled) return;
        setShowPopup(false);

        const done = onCompleteRef.current;
        done?.();
        if (done) return;

        await wait(450);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="relative h-full rounded-xl overflow-hidden border text-[#f7f2ff] flex flex-col"
      style={{
        borderColor: "rgba(255,45,140,0.28)",
        background:
          "radial-gradient(ellipse 80% 50% at 0% 0%, rgba(255,45,140,.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0,232,209,.12), transparent 50%), linear-gradient(165deg, #05030a, #0a0614 42%, #12081c)",
        fontFamily: '"Barlow Condensed", ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-pink-500/20">
        <div className="min-w-0">
          <h1
            className="text-sm font-bold tracking-wider"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            <span style={{ color: "#00e8d1" }}>GTA</span>
            <span className="text-white"> MODAGENT</span>
          </h1>
          <p className="text-[8px] text-[#a89bb8]">
            You drop the pack. The agent installs it safely.
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
            animate={running ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="w-6 h-6 rounded-full bg-pink-500/30 border border-pink-400/40 flex items-center justify-center">
              <Bot className="w-3 h-3 text-pink-200" />
            </span>
            <span className="text-[6px] text-pink-300">Agent</span>
          </motion.span>
          <span
            className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded border font-medium ml-1"
            style={{
              borderColor: running ? "#ff2d8c" : "rgba(255,255,255,0.15)",
              color: running ? "#ff5eb1" : "#a89bb8",
              boxShadow: running ? "0 0 10px rgba(255,45,140,0.45)" : undefined,
            }}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[0.85fr_1.15fr] gap-1.5 p-1.5 flex-1 min-h-0">
        <div
          className="rounded-lg border p-2 flex flex-col relative overflow-hidden"
          style={{
            borderColor: dropped
              ? "rgba(0,232,209,0.5)"
              : "rgba(255,45,140,0.25)",
            background: "rgba(10,6,20,0.82)",
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{
              background: "linear-gradient(180deg, #ff2d8c, #00e8d1)",
            }}
          />
          <p className="text-[8px] uppercase tracking-[0.2em] text-[#a89bb8] mb-1.5">
            Package & game
          </p>
          <div
            className="flex-1 border border-dashed rounded-md flex flex-col items-center justify-center gap-1 px-1.5 text-center min-h-[70px]"
            style={{
              borderColor: dropped ? "#00e8d1" : "rgba(0,232,209,0.35)",
              background: dropped ? "rgba(0,232,209,0.06)" : "transparent",
            }}
          >
            <Package
              className="w-5 h-5"
              style={{ color: dropped ? "#00e8d1" : "#ff5eb1" }}
            />
            <strong className="text-[10px] tracking-wide">
              {dropped ? "Package ready" : "Drop a mod package"}
            </strong>
            <AnimatePresence>
              {dropped && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[7px] font-mono px-1.5 py-0.5 rounded break-all"
                  style={{
                    color: "#5affea",
                    background: "rgba(0,232,209,0.1)",
                  }}
                >
                  rancher_xl_pack.zip
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {previewReady && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-1.5"
            >
              <p className="text-[7px] uppercase tracking-widest text-teal-400/70 mb-1">
                In-game preview
              </p>
              <div className="scale-[0.92] origin-top">
                <VehicleCard />
              </div>
            </motion.div>
          )}

          <button
            type="button"
            className="mt-1.5 w-full text-[9px] uppercase tracking-widest font-semibold py-1 rounded"
            style={{
              background: "linear-gradient(90deg, #ff2d8c, #ff7a3d)",
              opacity: dropped ? 1 : 0.45,
            }}
          >
            Run install
          </button>
        </div>

        <div
          className="rounded-lg border flex flex-col relative overflow-hidden min-h-0"
          style={{
            borderColor: "rgba(255,45,140,0.25)",
            background: "rgba(10,6,20,0.9)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div
              className="demo-scan-beam w-full h-16"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,232,209,0.25), transparent)",
              }}
            />
          </div>

          <div className="flex items-center justify-between px-2 py-1 border-b border-pink-500/15 relative z-10">
            <span className="text-[8px] uppercase tracking-[0.18em] text-[#a89bb8]">
              Install tools
            </span>
            <span className="flex items-center gap-1 text-[7px] text-[#ff5eb1]">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-[#ff2d8c] ${running ? "animate-pulse" : ""}`}
              />
              {running ? "Streaming" : "Standby"}
            </span>
          </div>

          <div className="flex-1 overflow-hidden px-1.5 py-1 space-y-0.5 relative z-10 font-mono">
            {lines.length === 0 && (
              <p className="text-[8px] text-[#a89bb8]">
                Waiting for install tools<span className="demo-caret">_</span>
              </p>
            )}
            <AnimatePresence initial={false}>
              {lines.map((line, i) => {
                const isLatest = i === lines.length - 1;
                const open = expanded === i;
                const p = prefix(line.kind, line.tool);
                return (
                  <motion.div
                    key={`${line.at}-${line.text}-${i}`}
                    initial={{
                      opacity: 0,
                      x: -10,
                      skewX: -2,
                      filter: "blur(2px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      skewX: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{ duration: 0.35 }}
                    className="text-[8px] leading-snug"
                  >
                    <div className="flex gap-1 items-baseline">
                      <span className="text-[#a89bb8]/70 shrink-0">
                        {line.at}
                      </span>
                      <span style={{ color: prefixColor(line.kind) }}>
                        [{p}]
                      </span>
                      <span className="text-[#f7f2ff]/90 truncate">
                        {line.text}
                        {isLatest && (
                          <span className="demo-caret inline-block w-1 h-2 bg-[#00e8d1] ml-0.5 align-middle" />
                        )}
                      </span>
                      {line.tool && (
                        <button
                          type="button"
                          className="ml-auto shrink-0 text-[6px] text-[#00e8d1] flex items-center"
                          onClick={() => setExpanded(open ? null : i)}
                        >
                          {open ? (
                            <ChevronDown className="w-2.5 h-2.5" />
                          ) : (
                            <ChevronRight className="w-2.5 h-2.5" />
                          )}
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {open && line.request && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-1.5 mt-0.5 pl-1.5 border-l border-pink-500/30 overflow-hidden"
                        >
                          <pre className="text-[6px] text-[#5affea]/80 whitespace-pre-wrap">
                            {line.request}
                          </pre>
                          <pre className="text-[6px] text-[#3dffb5]/80 whitespace-pre-wrap">
                            {line.response}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && <InstallPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </div>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
