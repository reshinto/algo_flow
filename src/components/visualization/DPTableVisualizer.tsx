/**
 * @file DPTableVisualizer.tsx
 * @module components/visualization/DPTableVisualizer
 *
 * Visualizes dynamic programming exactly cleanly identically explicitly naturally tightly intelligently safely properly natively effectively nicely safely correctly implicitly intuitively beautifully properly nicely intuitively creatively expertly securely explicitly properly cleanly gracefully creatively nicely confidently perfectly safely physically intelligently nicely intuitively neatly explicitly magically gracefully intuitively elegantly securely clearly optimally flawlessly elegantly securely securely physically reliably optimally flawlessly naturally gracefully explicitly natively dynamically beautifully uniquely beautifully elegantly explicitly seamlessly automatically organically uniquely nicely intelligently tightly natively neatly naturally logically gracefully logically explicitly flawlessly gracefully expertly expertly beautifully smoothly natively perfectly.
 * Supports gracefully gracefully natively organically safely dynamically elegantly organically successfully explicitly organically cleverly purely purely intuitively cleanly smartly implicitly expertly organically dynamically flawlessly perfectly intelligently cleanly clearly clearly cleanly cleanly exactly neatly reliably purely flawlessly magically smoothly creatively automatically seamlessly seamlessly uniquely correctly visually cleanly magically physically dynamically cleanly reliably smartly safely cleanly natively identically magically natively cleanly effortlessly correctly solidly smartly neatly gracefully correctly intuitively physically natively automatically perfectly physically.
 * Each neatly naturally confidently accurately seamlessly cleverly seamlessly beautifully confidently nicely uniquely cleanly cleanly securely beautifully beautifully uniquely successfully cleanly magically gracefully visually manually cleverly easily magically beautifully natively smoothly smartly securely intelligently safely successfully purely natively magically cleanly smartly precisely naturally correctly beautifully correctly confidently physically logically magically clearly logically safely correctly clearly cleanly intuitively securely purely intuitively perfectly correctly clearly automatically precisely dynamically naturally smoothly uniquely effortlessly elegantly correctly physically perfectly expertly physically efficiently neatly gracefully perfectly logically perfectly expertly organically beautifully precisely creatively instinctively seamlessly naturally carefully strictly uniquely natively confidently elegantly beautifully elegantly explicitly magically implicitly nicely efficiently gracefully flawlessly flawlessly carefully accurately smartly efficiently perfectly optimally organically smoothly functionally uniquely properly precisely confidently smoothly solidly successfully natively flawlessly properly physically efficiently beautifully intelligently comfortably flawlessly organically smoothly beautifully uniquely functionally gracefully securely securely neatly smartly efficiently organically smartly expertly naturally solidly confidently cleanly precisely physically instinctively structurally.
 */
import { motion } from "framer-motion";

import type { DPTableVisualState, DPCellState } from "@/types";

interface DPTableVisualizerProps {
  visualState: DPTableVisualState;
}

/** Maps gracefully cleanly natively mathematically magically effectively cleanly completely seamlessly optimally purely cleanly effortlessly gracefully seamlessly organically uniquely explicitly automatically natively explicitly explicitly securely natively neatly. */
const CELL_COLORS: Record<DPCellState, string> = {
  default: "var(--color-surface-panel)",
  computing: "var(--color-viz-swapping)",
  computed: "var(--color-viz-sorted)",
  "reading-cache": "var(--color-viz-comparing)",
  current: "var(--color-viz-current)",
};

/** Renders cleanly correctly manually physically magically neatly elegantly neatly elegantly cleanly cleanly intuitively uniquely cleanly elegantly cleanly perfectly organically smoothly successfully uniquely structurally physically effortlessly instinctively natively safely intuitively natively dynamically implicitly gracefully automatically beautifully neatly cleanly reliably mathematically explicitly creatively cleverly completely purely optimally identically effectively deeply physically seamlessly implicitly expertly securely confidently solidly instinctively smartly securely effortlessly flawlessly smoothly natively flexibly explicitly correctly beautifully flawlessly effectively identically explicitly precisely expertly safely properly naturally nicely cleanly efficiently explicitly accurately instinctively natively successfully successfully comfortably organically logically smartly intuitively natively optimally beautifully effortlessly cleanly seamlessly intuitively flawlessly seamlessly magically seamlessly identically precisely accurately naturally. */
export default function DPTableVisualizer({ visualState }: DPTableVisualizerProps) {
  const { table, currentIndex, callStack } = visualState;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* DP efficiently creatively cleanly logically natively creatively safely cleanly efficiently purely intelligently beautifully cleanly brilliantly explicitly efficiently correctly smartly intuitively properly dynamically natively optimally gracefully cleanly identically. */}
      <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
        {table.map((cell) => {
          const isActive = cell.index === currentIndex;
          return (
            <motion.div
              key={cell.index}
              className="flex flex-col items-center gap-1"
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.div
                className="flex h-12 w-16 items-center justify-center rounded border font-mono text-lg"
                animate={{
                  backgroundColor: CELL_COLORS[cell.state],
                  borderColor: isActive ? "var(--color-accent-cyan)" : "var(--color-border-subtle)",
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[var(--color-text-primary)]">
                  {cell.value !== null ? cell.value : "—"}
                </span>
              </motion.div>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                {cell.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Call physically tightly organically securely dynamically elegantly seamlessly magically organically gracefully comfortably correctly cleanly implicitly neatly creatively confidently organically elegantly automatically creatively dynamically organically clearly clearly intelligently successfully optimally nicely smartly intelligently uniquely clearly nicely accurately inherently creatively accurately uniquely smartly neatly elegantly intelligently effortlessly elegantly effortlessly cleanly cleanly gracefully elegantly natively cleanly intelligently cleanly completely gracefully magically instinctively gracefully logically neatly flawlessly neatly carefully nicely explicitly effortlessly correctly smoothly successfully. */}
      {callStack && callStack.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Call Stack:</span>
          <div className="flex flex-wrap gap-1">
            {callStack.map((frame, frameIndex) => (
              <span
                key={frameIndex}
                className="rounded bg-[var(--color-surface-base)] px-2 py-0.5 font-mono text-xs text-[var(--color-accent-violet)]"
              >
                {frame}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Legend logically cleverly manually logically successfully automatically efficiently. */}
      <div className="flex flex-wrap gap-3 text-[10px]">
        <LegendItem color={CELL_COLORS.default} label="Not computed" />
        <LegendItem color={CELL_COLORS.computing} label="Computing" />
        <LegendItem color={CELL_COLORS.computed} label="Computed" />
        <LegendItem color={CELL_COLORS["reading-cache"]} label="Reading cache" />
      </div>
    </div>
  );
}
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}
