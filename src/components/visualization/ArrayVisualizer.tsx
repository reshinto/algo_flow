/**
 * Renders array algorithms as animated bar charts with pointer labels.
 * Bar heights are proportional to element values; colors reflect element state
 * (comparing, swapping, sorted, etc.) via CSS custom properties.
 */
import { motion } from "framer-motion";

import type { ArrayVisualState, ArrayElementState } from "@/types";

interface ArrayVisualizerProps {
  visualState: ArrayVisualState;
}

/** Maps each element state to its corresponding CSS color variable. */
const STATE_COLORS: Record<ArrayElementState, string> = {
  default: "var(--color-viz-default)",
  comparing: "var(--color-viz-comparing)",
  swapping: "var(--color-viz-swapping)",
  sorted: "var(--color-viz-sorted)",
  found: "var(--color-viz-found)",
  eliminated: "var(--color-viz-eliminated)",
  "in-window": "var(--color-viz-visiting)",
  current: "var(--color-viz-current)",
};

/** Displays an array as animated vertical bars with state-driven color transitions. */
export default function ArrayVisualizer({ visualState }: ArrayVisualizerProps) {
  const { elements, pointers } = visualState;
  // Floor of 1 prevents division by zero when all values are 0 or array is empty
  const maxValue = Math.max(...elements.map((element) => element.value), 1);

  return (
    <div className="flex h-full flex-col p-4">
      {/* Bars container */}
      <div className="flex flex-1 justify-center gap-1 pb-2">
        {elements.map((element, elementIndex) => {
          const heightPercent = Math.max((element.value / maxValue) * 100, 4);
          // Collect all named pointers (e.g., "i", "left") that reference this element
          const pointerLabels = Object.entries(pointers)
            .filter(([, pointerIndex]) => pointerIndex === elementIndex)
            .map(([label]) => label);

          return (
            <div
              key={elementIndex}
              className="flex min-w-[24px] max-w-[60px] flex-1 flex-col items-center"
            >
              {/* Bar area — fills from bottom */}
              <div className="relative flex w-full flex-1 items-end justify-center">
                <motion.div
                  className="w-full rounded-t-sm"
                  style={{ height: `${heightPercent}%`, minHeight: 4 }}
                  animate={{ backgroundColor: STATE_COLORS[element.state] }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </div>

              {/* Value label */}
              <span className="mt-1 font-mono text-xs text-[var(--color-text-muted)]">
                {element.value}
              </span>

              {/* Pointer labels */}
              <div className="h-4">
                {pointerLabels.length > 0 && (
                  <span className="font-mono text-[10px] text-[var(--color-accent-cyan)]">
                    {pointerLabels.join(", ")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
