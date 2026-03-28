import { motion, useReducedMotion } from "framer-motion";

import type { SetVisualState, SetElementState } from "@/types";

interface SetVisualizerProps {
  visualState: SetVisualState;
}

const ELEMENT_COLORS: Record<SetElementState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  checking: "var(--color-accent-amber)",
  found: "var(--color-accent-emerald)",
  "not-found": "var(--color-viz-default)",
  added: "var(--color-viz-sorted)",
  adding: "var(--color-viz-current)",
} as Record<SetElementState, string>;

function ElementCell({ value, state }: { value: number; state: SetElementState }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="flex h-10 w-10 items-center justify-center rounded font-mono text-sm font-bold"
      animate={{ backgroundColor: ELEMENT_COLORS[state] ?? "var(--color-viz-default)" }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
      style={{
        border: "1px solid var(--color-border-subtle)",
        color: "var(--color-text-primary)",
      }}
    >
      {value}
    </motion.div>
  );
}

export default function SetVisualizer({ visualState }: SetVisualizerProps) {
  const { setA, setB, hashSet, result, phase } = visualState;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      {/* Phase indicator */}
      <div className="text-xs font-semibold" style={{ color: "var(--color-accent-amber)" }}>
        Phase: {phase === "building" ? "Building hash set from A" : "Checking B for membership"}
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Array A */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Array A</span>
          <div className="flex flex-wrap gap-1">
            {setA.map((element, idx) => (
              <ElementCell key={idx} value={element.value} state={element.state} />
            ))}
          </div>
        </div>

        {/* Array B */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Array B</span>
          <div className="flex flex-wrap gap-1">
            {setB.map((element, idx) => (
              <ElementCell key={idx} value={element.value} state={element.state} />
            ))}
          </div>
        </div>

        {/* Hash set */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Hash set ({hashSet.length} element{hashSet.length !== 1 ? "s" : ""})
          </span>
          <div className="flex flex-wrap gap-1">
            {hashSet.map((element, idx) => (
              <ElementCell key={idx} value={element.value} state={element.state} />
            ))}
            {hashSet.length === 0 && (
              <div
                className="flex h-10 w-16 items-center justify-center rounded font-mono text-xs"
                style={{
                  border: "1px dashed var(--color-border-default)",
                  color: "var(--color-text-muted)",
                }}
              >
                empty
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Intersection ({result.length})
          </span>
          <div className="flex flex-wrap gap-1">
            {result.map((value, idx) => (
              <div
                key={idx}
                className="flex h-10 w-10 items-center justify-center rounded font-mono text-sm font-bold"
                style={{
                  backgroundColor: "var(--color-accent-emerald)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {value}
              </div>
            ))}
            {result.length === 0 && (
              <div
                className="flex h-10 w-16 items-center justify-center rounded font-mono text-xs"
                style={{
                  border: "1px dashed var(--color-border-default)",
                  color: "var(--color-text-muted)",
                }}
              >
                empty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
