// PalindromeVisualizer: renders step-by-step palindrome algorithm state,
// including char cells, left/right pointer indicators, center marker,
// expand-radius label, longest-palindrome highlight, and a result banner.

import { motion, useReducedMotion } from "framer-motion";

import type { PalindromeVisualState, StringCharState } from "@/types";

interface PalindromeVisualizerProps {
  visualState: PalindromeVisualState;
}

const CHAR_COLORS: Record<StringCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  matching: "var(--color-accent-amber)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const CELL_SIZE = 32;
const CELL_GAP = 4;

export default function PalindromeVisualizer({ visualState }: PalindromeVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    chars,
    leftPointer,
    rightPointer,
    centerIndex,
    expandRadius,
    isPalindrome,
    longestStart,
    longestLength,
  } = visualState;

  // Compute cell left offset (px) for a given index, used to position pointer/center markers
  function cellOffset(index: number): number {
    return index * (CELL_SIZE + CELL_GAP);
  }

  const totalWidth = chars.length * (CELL_SIZE + CELL_GAP) - CELL_GAP;

  // Build the longest-palindrome substring for display in result banner
  const longestSubstring = chars
    .slice(longestStart, longestStart + longestLength)
    .map((charItem) => charItem.value)
    .join("");

  return (
    <div className="flex h-full flex-col gap-4 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex min-h-0 min-w-max flex-1 flex-col items-center justify-center gap-6">
        {/* Center indicator row — sits above the char cells */}
        <div className="relative" style={{ width: totalWidth, height: 20 }}>
          {centerIndex !== null && (
            <div
              className="absolute flex flex-col items-center"
              style={{ left: cellOffset(centerIndex) }}
            >
              <span
                className="rounded px-1 font-mono text-xs font-bold"
                style={{
                  backgroundColor: "var(--color-viz-current)",
                  color: "var(--color-text-primary)",
                  minWidth: CELL_SIZE,
                  textAlign: "center",
                }}
              >
                C
              </span>
            </div>
          )}
        </div>

        {/* Character row */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Characters</span>
          <div className="flex gap-1">
            {chars.map((charItem, charIndex) => (
              <motion.div
                key={charIndex}
                className="flex items-center justify-center rounded font-mono text-sm font-bold"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                  flexShrink: 0,
                }}
                animate={{ backgroundColor: CHAR_COLORS[charItem.state] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                {charItem.value}
              </motion.div>
            ))}
          </div>

          {/* Index labels */}
          <div className="flex gap-1">
            {chars.map((_, charIndex) => (
              <div
                key={charIndex}
                className="flex items-center justify-center font-mono text-xs"
                style={{
                  width: CELL_SIZE,
                  height: 16,
                  color: "var(--color-text-muted)",
                  flexShrink: 0,
                }}
              >
                {charIndex}
              </div>
            ))}
          </div>
        </div>

        {/* Pointer indicators row — L and R arrows below the chars */}
        <div className="relative" style={{ width: totalWidth, height: 28 }}>
          {/* Left pointer */}
          <motion.div
            className="absolute flex flex-col items-center"
            animate={{ left: cellOffset(leftPointer) }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
          >
            <span
              className="rounded px-1 font-mono text-xs font-bold"
              style={{
                backgroundColor: "var(--color-accent-amber)",
                color: "var(--color-text-primary)",
                minWidth: CELL_SIZE,
                textAlign: "center",
              }}
            >
              L
            </span>
          </motion.div>

          {/* Right pointer — only render separately when not overlapping left */}
          {rightPointer !== leftPointer && (
            <motion.div
              className="absolute flex flex-col items-center"
              animate={{ left: cellOffset(rightPointer) }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
            >
              <span
                className="rounded px-1 font-mono text-xs font-bold"
                style={{
                  backgroundColor: "var(--color-accent-amber)",
                  color: "var(--color-text-primary)",
                  minWidth: CELL_SIZE,
                  textAlign: "center",
                }}
              >
                R
              </span>
            </motion.div>
          )}

          {/* When both pointers are at same index, show L/R merged label */}
          {rightPointer === leftPointer && (
            <motion.div
              className="absolute flex flex-col items-center"
              animate={{ left: cellOffset(leftPointer) }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
            >
              <span
                className="rounded px-1 font-mono text-xs font-bold"
                style={{
                  backgroundColor: "var(--color-accent-amber)",
                  color: "var(--color-text-primary)",
                  minWidth: CELL_SIZE,
                  textAlign: "center",
                }}
              >
                L/R
              </span>
            </motion.div>
          )}
        </div>

        {/* Expand radius indicator */}
        {expandRadius > 0 && (
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Expand radius:{" "}
            <span className="font-mono font-bold" style={{ color: "var(--color-viz-current)" }}>
              {expandRadius}
            </span>
          </div>
        )}

        {/* Longest palindrome so far */}
        {longestLength > 0 && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-[var(--color-text-muted)]">
              Longest palindrome so far
            </span>
            <div className="flex gap-1">
              {chars
                .slice(longestStart, longestStart + longestLength)
                .map((charItem, sliceIndex) => (
                  <div
                    key={sliceIndex}
                    className="flex items-center justify-center rounded font-mono text-sm font-bold"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      border: "1px solid var(--color-border-subtle)",
                      backgroundColor: CHAR_COLORS[charItem.state],
                      color: "var(--color-text-primary)",
                      flexShrink: 0,
                    }}
                  >
                    {charItem.value}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Result banner */}
        {isPalindrome !== null ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-semibold"
            style={{
              color: isPalindrome ? "var(--color-accent-emerald)" : "var(--color-accent-rose)",
            }}
          >
            {isPalindrome ? "Is palindrome ✓" : "Not palindrome ✗"}
          </motion.div>
        ) : (
          longestLength > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm font-semibold"
              style={{ color: "var(--color-accent-emerald)" }}
            >
              Longest: &quot;{longestSubstring}&quot;
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
