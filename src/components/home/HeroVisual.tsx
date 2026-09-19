"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Cpu, Check, Copy, Terminal } from "lucide-react";

const codeTabs = [
  {
    id: "agent",
    label: "voice_agent_pipeline.py",
    language: "python",
    lines: [
      { num: 1, tokens: [{ text: "import ", color: "text-[#E8536A]" }, { text: "vapi, anthropic, mcp_agent", color: "text-[#38BDF8]" }] },
      { num: 2, tokens: [{ text: "from ", color: "text-[#E8536A]" }, { text: "aws_bedrock ", color: "text-[#38BDF8]" }, { text: "import ", color: "text-[#E8536A]" }, { text: "BedrockRuntime", color: "text-[#D4A853]" }] },
      { num: 3, tokens: [{ text: "", color: "text-text-primary" }] },
      { num: 4, tokens: [{ text: "class ", color: "text-[#E8536A]" }, { text: "VoiceAgentEngine", color: "text-[#D4A853]" }, { text: ":", color: "text-text-primary" }] },
      { num: 5, tokens: [{ text: "    def __init__(self, model=\"claude-3-7-sonnet\"):", color: "text-text-secondary" }] },
      { num: 6, tokens: [{ text: "        self.voice = vapi.Client()", color: "text-[#34D399]" }] },
      { num: 7, tokens: [{ text: "        self.mcp = ClaudeMCPClient(tools=SYSTEM_TOOLS)", color: "text-[#34D399]" }] },
      { num: 8, tokens: [{ text: "", color: "text-text-primary" }] },
      { num: 9, tokens: [{ text: "    async def dispatch_consultation(self, query):", color: "text-[#D4A853]" }] },
      { num: 10, tokens: [{ text: "        context = await self.rag.retrieve(query)", color: "text-[#F472B6]" }] },
      { num: 11, tokens: [{ text: "        return await self.voice.synthesize(context)", color: "text-[#E8536A]" }] },
    ],
  },
  {
    id: "backend",
    label: "marketplace_views.py",
    language: "python",
    lines: [
      { num: 1, tokens: [{ text: "from ", color: "text-[#E8536A]" }, { text: "rest_framework ", color: "text-[#38BDF8]" }, { text: "import ", color: "text-[#E8536A]" }, { text: "viewsets, status", color: "text-[#D4A853]" }] },
      { num: 2, tokens: [{ text: "from ", color: "text-[#E8536A]" }, { text: "keras_models ", color: "text-[#38BDF8]" }, { text: "import ", color: "text-[#E8536A]" }, { text: "LeafDiseaseClassifier", color: "text-[#D4A853]" }] },
      { num: 3, tokens: [{ text: "", color: "text-text-primary" }] },
      { num: 4, tokens: [{ text: "class ", color: "text-[#E8536A]" }, { text: "AgriConnectViewSet", color: "text-[#D4A853]" }, { text: "(viewsets.ModelViewSet):", color: "text-text-primary" }] },
      { num: 5, tokens: [{ text: "    model = LeafDiseaseClassifier.load()", color: "text-[#34D399]" }] },
      { num: 6, tokens: [{ text: "    def diagnose_crop(self, request):", color: "text-[#D4A853]" }] },
      { num: 7, tokens: [{ text: "        diagnosis = self.model.predict(request.FILES['leaf'])", color: "text-[#38BDF8]" }] },
      { num: 8, tokens: [{ text: "        return Response({'result': diagnosis})", color: "text-[#E8536A]" }] },
    ],
  },
];

const floatingBadges = [
  { label: "Agentic AI & Vapi Voice", x: "-8%", y: "-12%", delay: 0.2, color: "from-[#E8536A]/20 to-[#D4A853]/10" },
  { label: "Python & Django REST", x: "82%", y: "-8%", delay: 0.4, color: "from-[#D4A853]/20 to-[#E8536A]/10" },
  { label: "Claude MCP & n8n Workflows", x: "78%", y: "88%", delay: 0.6, color: "from-[#10B981]/20 to-[#38BDF8]/10" },
  { label: "UiPath & Playwright RPA", x: "-6%", y: "84%", delay: 0.8, color: "from-[#38BDF8]/20 to-[#818CF8]/10" },
];

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState("agent");
  const [copied, setCopied] = useState(false);

  const currentTab = codeTabs.find((t) => t.id === activeTab) || codeTabs[0];

  const handleCopy = () => {
    const rawText = currentTab.lines
      .map((l) => l.tokens.map((t) => t.text).join(""))
      .join("\n");
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 lg:my-0">
      {/* Background ambient glow */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-accent-primary/25 via-accent-gold/20 to-accent-secondary/30 blur-2xl opacity-75 animate-pulse pointer-events-none" />

      {/* Floating Badges */}
      {floatingBadges.map((badge, idx) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, idx % 2 === 0 ? -6 : 6, 0],
          }}
          transition={{
            opacity: { delay: badge.delay, duration: 0.5 },
            scale: { delay: badge.delay, duration: 0.5 },
            y: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-custom glass shadow-lg backdrop-blur-md z-20 pointer-events-none bg-gradient-to-r ${badge.color}`}
          style={{ left: badge.x, top: badge.y }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-ping" />
          <span className="text-text-primary font-mono">{badge.label}</span>
        </motion.div>
      ))}

      {/* Main IDE Window */}
      <div className="relative rounded-2xl overflow-hidden border border-border-custom bg-[#0D0F14]/95 shadow-2xl backdrop-blur-xl">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-custom/50 bg-[#14161E]/90">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
            <div className="flex items-center gap-2 ml-4">
              {codeTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                    activeTab === tab.id
                      ? "bg-surface-elevated/90 text-accent-primary border border-accent-primary/30"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-accent-emerald" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <span className="text-[11px] font-mono text-text-secondary hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent-gold" />
              AI Pipeline
            </span>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-5 font-mono text-xs sm:text-sm overflow-x-auto min-h-[220px]">
          {currentTab.lines.map((line) => (
            <div key={line.num} className="flex items-center py-0.5 group">
              <span className="w-8 text-right pr-4 text-text-secondary/40 select-none text-xs">
                {line.num}
              </span>
              <div className="flex-1 whitespace-pre">
                {line.tokens.map((token, i) => (
                  <span key={i} className={token.color}>
                    {token.text}
                  </span>
                ))}
                {line.num === currentTab.lines.length && (
                  <span className="inline-block w-2 h-4 ml-1 bg-accent-primary animate-pulse align-middle" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border-custom/50 bg-[#14161E]/90 text-[11px] font-mono text-text-secondary">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-accent-emerald">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              production ready
            </span>
            <span className="hidden sm:inline">Python 3.11 · PyTorch / TF</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-accent-gold">
              <Cpu className="w-3 h-3" />
              Octathorn AI Stack
            </span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
