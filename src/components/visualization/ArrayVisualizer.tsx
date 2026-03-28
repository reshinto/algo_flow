/** Array bar chart visualizer supporting optional dual-row display for algorithms like merge or prefix sum. */
import { motion, useReducedMotion } from "framer-motion";

import type { ArrayVisualState, ArrayElement, ArrayElementState } from "@/types";

interface ArrayVisualizerProps {
  visualState: ArrayVisualState;
}

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

/** Renders a single row of array bars with pointer labels. */
function ArrayRow({
  elements,
  pointers,
  maxValue,
  label,
  shouldReduceMotion,
}: {
  elements: ArrayElement[];
  pointers: Record<string, number>;
  maxValue: number;
  label?: string;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <div className="flex flex-1 flex-col">
      {label && (
        <span className="mb-1 text-center font-mono text-xs text-[var(--color-text-muted)]">
          {label}
        </span>
      )}
      <div className="flex flex-1 justify-center gap-1 pb-2">
        {elements.map((element, elementIndex) => {
          const heightPercent = Math.max((element.value / maxValue) * 100, 4);
          const pointerLabels = Object.entries(pointers)
            .filter(([, pointerIndex]) => pointerIndex === elementIndex)
            .map(([pointerLabel]) => pointerLabel);

          return (
            <div
              key={elementIndex}
              className="flex min-w-[24px] max-w-[60px] flex-1 flex-col items-center"
            >
              <div className="relative flex w-full flex-1 items-end justify-center">
                <motion.div
                  className="w-full rounded-t-sm"
                  style={{ height: `${heightPercent}%`, minHeight: 4 }}
                  animate={{ backgroundColor: STATE_COLORS[element.state] }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 300, damping: 25 }
                  }
                />
              </div>

              <span className="mt-1 font-mono text-xs text-[var(--color-text-muted)]">
                {element.value}
              </span>

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

export default function ArrayVisualizer({ visualState }: ArrayVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { elements, pointers, secondaryElements, secondaryLabel } = visualState;
  const maxValue = Math.max(...elements.map((element) => element.value), 1);

  const secondaryMaxValue = secondaryElements
    ? Math.max(...secondaryElements.map((element) => element.value), 1)
    : 1;

  return (
    <div className="flex h-full flex-col p-4">
      <ArrayRow
        elements={elements}
        pointers={pointers}
        maxValue={maxValue}
        shouldReduceMotion={shouldReduceMotion}
      />
      {secondaryElements && secondaryElements.length > 0 && (
        <ArrayRow
          elements={secondaryElements}
          pointers={{}}
          maxValue={secondaryMaxValue}
          label={secondaryLabel}
          shouldReduceMotion={shouldReduceMotion}
        />
      )}
    </div>
  );
}
