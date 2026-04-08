import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import type {
  HashMapVisualState,
  HashMapEntryState,
  HashMapInputElement,
  HashMapInputElementState,
} from "@/types";

interface HashMapVisualizerProps {
  visualState: HashMapVisualState;
}

const INPUT_ELEMENT_COLORS: Record<HashMapInputElementState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  processed: "var(--color-viz-sorted)",
  found: "var(--color-accent-emerald)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
  "in-window": "var(--color-accent-cyan)",
};

const ENTRY_COLORS: Record<HashMapEntryState, string> = {
  default: "var(--color-viz-default)",
  inserting: "var(--color-viz-current)",
  "looking-up": "var(--color-accent-amber)",
  found: "var(--color-accent-emerald)",
  updating: "var(--color-accent-cyan)",
  deleting: "var(--color-accent-rose)",
  counting: "var(--color-accent-violet)",
  highlighted: "var(--color-accent-amber)",
};

function InputElementRow({
  elements,
  label,
  shouldReduceMotion,
  windowStart,
  windowEnd,
}: {
  elements: HashMapInputElement[];
  label: string;
  shouldReduceMotion: boolean | null;
  windowStart?: number;
  windowEnd?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
      <div className="relative flex flex-wrap gap-1">
        {elements.map((element) => (
          <motion.div
            key={element.index}
            className="flex h-9 min-w-9 items-center justify-center rounded px-1 font-mono text-sm font-bold"
            animate={{ backgroundColor: INPUT_ELEMENT_COLORS[element.state] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
            style={{
              border: "1px solid var(--color-border-subtle)",
              color: "var(--color-text-primary)",
            }}
          >
            {element.value}
          </motion.div>
        ))}
        {windowStart !== undefined && windowEnd !== undefined && (
          <motion.div
            className="pointer-events-none absolute -inset-y-0.5 rounded"
            style={{
              left: `${windowStart * 40}px`,
              width: `${(windowEnd - windowStart + 1) * 40 - 4}px`,
              border: "2px solid var(--color-accent-cyan)",
              opacity: 0.6,
            }}
            layout
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          />
        )}
      </div>
    </div>
  );
}

function formatResult(
  result: string | string[] | number | number[] | boolean | string[][] | null | undefined,
): string {
  if (result === undefined || result === null) return "";
  if (typeof result === "boolean") return result ? "true" : "false";
  if (typeof result === "number" || typeof result === "string") return String(result);
  if (Array.isArray(result)) {
    if (result.length > 0 && Array.isArray(result[0])) {
      return (result as string[][]).map((group) => `[${group.join(", ")}]`).join(", ");
    }
    return `[${(result as (string | number)[]).join(", ")}]`;
  }
  return String(result);
}

export default function HashMapVisualizer({ visualState }: HashMapVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    entries,
    inputElements,
    lookupKey,
    resultPair,
    phase,
    secondaryInputElements,
    result,
    groupResult,
    windowStart,
    windowEnd,
    prefixSum,
  } = visualState;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4">
      {/* Primary input array row */}
      <InputElementRow
        elements={inputElements}
        label="Input"
        shouldReduceMotion={shouldReduceMotion}
        windowStart={windowStart}
        windowEnd={windowEnd}
      />

      {/* Secondary input row (dual-input algorithms) */}
      {secondaryInputElements && secondaryInputElements.length > 0 && (
        <InputElementRow
          elements={secondaryInputElements}
          label="Secondary input"
          shouldReduceMotion={shouldReduceMotion}
        />
      )}

      {/* Prefix sum indicator */}
      {prefixSum !== undefined && (
        <div
          className="text-center text-xs font-semibold"
          style={{ color: "var(--color-accent-cyan)" }}
        >
          Prefix sum: {prefixSum}
        </div>
      )}

      {/* Hash map table */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-[var(--color-text-muted)]">
          Hash map ({entries.length} entr{entries.length !== 1 ? "ies" : "y"})
          {phase && (
            <span
              className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-surface-tertiary)",
                color: "var(--color-accent-cyan)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              {phase}
            </span>
          )}
          {lookupKey !== null && (
            <span className="ml-2 text-[var(--color-accent-amber)]">
              looking up: <span className="font-mono font-bold">{lookupKey}</span>
            </span>
          )}
        </span>

        <div className="flex flex-col gap-1">
          {/* Header row */}
          <div className="flex gap-1">
            <div
              className="flex h-7 w-24 items-center justify-center rounded-t text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-surface-tertiary)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              key
            </div>
            <div
              className="flex h-7 w-24 items-center justify-center rounded-t text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-surface-tertiary)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              value
            </div>
          </div>

          {/* Entry rows */}
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                key={entry.key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="flex gap-1"
              >
                <motion.div
                  className="flex h-9 w-24 items-center justify-center rounded font-mono text-sm font-bold"
                  animate={{ backgroundColor: ENTRY_COLORS[entry.state] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                  style={{
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {entry.key}
                </motion.div>
                <motion.div
                  className="flex h-9 w-24 items-center justify-center rounded font-mono text-sm"
                  animate={{ backgroundColor: ENTRY_COLORS[entry.state] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                  style={{
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {entry.value}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length === 0 && (
            <div
              className="flex h-9 w-52 items-center justify-center rounded font-mono text-xs"
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

      {/* Group result (for Group Anagrams) */}
      {groupResult && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)]">Groups</span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(groupResult).map(([groupKey, members]) => (
              <div
                key={groupKey}
                className="flex flex-col items-center gap-1 rounded p-2"
                style={{
                  backgroundColor: "var(--color-surface-tertiary)",
                  border: "1px solid var(--color-border-subtle)",
                }}
              >
                <span className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {groupKey}
                </span>
                <div className="flex gap-1">
                  {members.map((member) => (
                    <span
                      key={member}
                      className="rounded px-1.5 py-0.5 font-mono text-xs font-bold"
                      style={{
                        backgroundColor: "var(--color-accent-emerald)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legacy result pair (Two Sum) */}
      {resultPair !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-semibold"
          style={{ color: "var(--color-accent-emerald)" }}
        >
          Found: indices [{resultPair[0]}, {resultPair[1]}]
        </motion.div>
      )}

      {/* Generalized result */}
      {result !== undefined && result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-semibold"
          style={{ color: "var(--color-accent-emerald)" }}
        >
          Result: {formatResult(result)}
        </motion.div>
      )}
    </div>
  );
}
