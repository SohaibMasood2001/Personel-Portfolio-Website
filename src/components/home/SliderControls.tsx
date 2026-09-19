"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface SliderControlsProps {
  count: number;
  index: number;
  paused: boolean;
  accents: string[];
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
  onTogglePause: () => void;
}

export function SliderControls({
  count,
  index,
  paused,
  accents,
  onPrev,
  onNext,
  onDot,
  onTogglePause,
}: SliderControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3 pt-3 border-t border-border-custom">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onDot(i)}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === index ? 20 : 8,
              background:
                i === index ? accents[i] ?? "#7C3AED" : "var(--border)",
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onTogglePause}
          className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={onPrev}
          className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
