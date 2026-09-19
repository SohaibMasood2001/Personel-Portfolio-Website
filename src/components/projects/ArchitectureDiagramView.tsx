"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import type {
  ArchitectureDiagram,
  ArchNode,
} from "@/lib/architecture-diagrams";

type Props = {
  diagram: ArchitectureDiagram;
  accent: string;
};

function LeafCard({
  text,
  accent,
  isLast,
}: {
  text: string;
  accent: string;
  isLast: boolean;
}) {
  return (
    <li className="relative pl-5">
      <span
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: `${accent}55` }}
        aria-hidden
      />
      <span
        className="absolute left-0 top-4 w-3 h-px"
        style={{ background: `${accent}55` }}
        aria-hidden
      />
      {isLast && (
        <span
          className="absolute left-0 top-4 bottom-0 w-px bg-surface"
          aria-hidden
        />
      )}
      <div className="rounded-xl border border-border-custom bg-surface-elevated/60 px-3 py-2.5 text-sm text-text-secondary leading-relaxed">
        {text}
      </div>
    </li>
  );
}

function NodeCard({
  node,
  accent,
  index,
}: {
  node: ArchNode;
  accent: string;
  index: number;
}) {
  const items = node.items ?? [];
  const title = node.title.replace(/^\d+\.\s*/, "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="rounded-2xl border border-border-custom bg-surface/90 overflow-hidden w-full"
      style={{ boxShadow: `0 0 0 1px ${accent}14` }}
    >
      <header
        className="px-4 py-3 border-b border-border-custom"
        style={{ background: `${accent}12` }}
      >
        <h4 className="text-sm font-bold font-heading text-text-primary leading-snug">
          {title}
        </h4>
        {node.detail && (
          <p className="text-[11px] font-mono text-text-secondary mt-0.5">
            {node.detail}
          </p>
        )}
      </header>

      {items.length > 0 && (
        <ul className="p-3 space-y-2">
          {items.map((item, i) => (
            <LeafCard
              key={item}
              text={item}
              accent={accent}
              isLast={i === items.length - 1}
            />
          ))}
        </ul>
      )}
    </motion.article>
  );
}

function FlowArrow({
  accent,
  direction,
}: {
  accent: string;
  direction: "right" | "down";
}) {
  if (direction === "down") {
    return (
      <div className="flex md:hidden w-full justify-center py-1" aria-hidden>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path
            d="M8 2v16M3 14l5 6 5-6"
            stroke={accent}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="hidden md:flex shrink-0 self-center w-8 items-center justify-center"
      aria-hidden
    >
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
        <path
          d="M2 8h16M14 3l6 5-6 5"
          stroke={accent}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function StageColumn({
  nodes,
  stageIndex,
  accent,
}: {
  nodes: ArchNode[];
  stageIndex: number;
  accent: string;
}) {
  const multi = nodes.length > 1;

  return (
    <div className="min-w-0 w-full md:w-auto md:flex-1 md:basis-[min(100%,16.5rem)] max-w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <span
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
          style={{ background: accent }}
        >
          {stageIndex + 1}
        </span>
        <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
          Stage {stageIndex + 1}
          {multi ? ` · ${nodes.length} branches` : ""}
        </span>
      </div>

      <div className="relative flex flex-col gap-3">
        {multi && (
          <span
            className="absolute left-3 top-3 bottom-3 w-px"
            style={{ background: `${accent}35` }}
            aria-hidden
          />
        )}
        {nodes.map((node, i) => (
          <div key={node.id} className={multi ? "relative pl-5" : undefined}>
            {multi && (
              <>
                <span
                  className="absolute left-3 top-5 w-3 h-px"
                  style={{ background: `${accent}55` }}
                  aria-hidden
                />
                {i === nodes.length - 1 && (
                  <span
                    className="absolute left-3 top-5 bottom-0 w-px bg-surface"
                    aria-hidden
                  />
                )}
              </>
            )}
            <NodeCard node={node} accent={accent} index={stageIndex * 4 + i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Horizontal stage flow. Within a stage: tree of branch cards;
 * each branch's features are leaf sub-cards. Wraps — no horizontal scroll.
 */
export function ArchitectureDiagramView({ diagram, accent }: Props) {
  const stages = diagram.layers;

  return (
    <div className="w-full space-y-5">
      {diagram.title && (
        <div>
          <h3 className="text-lg font-semibold font-heading text-text-primary">
            {diagram.title}
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Follow the arrows · each card is one simple step
          </p>
        </div>
      )}

      <div className="w-full overflow-x-auto pb-2">
        <div className="flex flex-col md:flex-row md:flex-wrap items-stretch gap-x-0 gap-y-2 md:gap-y-8 min-w-[600px]">
          {stages.map((nodes, i) => (
            <Fragment key={`stage-${i}`}>
              <StageColumn nodes={nodes} stageIndex={i} accent={accent} />
              {i < stages.length - 1 && (
                <FlowArrow accent={accent} direction="right" />
              )}
              {i < stages.length - 1 && (
                <FlowArrow accent={accent} direction="down" />
              )}
            </Fragment>
          ))}
        </div>
        <p className="text-xs text-text-secondary/50 text-center mt-3 lg:hidden">
          ← Scroll horizontally to explore the full diagram →
        </p>
      </div>

      {diagram.note && (
        <p className="text-sm text-text-secondary leading-relaxed border-t border-border-custom pt-4">
          {diagram.note}
        </p>
      )}
    </div>
  );
}
