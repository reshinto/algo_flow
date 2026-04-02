import { motion, useReducedMotion } from "framer-motion";

import type { SetVisualState, SetElementState, SetElement } from "@/types";

interface SetVisualizerProps {
  visualState: SetVisualState;
}

const ELEMENT_COLORS: Record<string, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  checking: "var(--color-accent-amber)",
  found: "var(--color-accent-emerald)",
  "not-found": "var(--color-viz-default)",
  added: "var(--color-viz-sorted)",
  adding: "var(--color-viz-current)",
  skipped: "var(--color-viz-default)",
  counted: "var(--color-accent-cyan)",
  generated: "var(--color-accent-violet)",
  hashed: "var(--color-accent-amber)",
  "bit-set": "var(--color-accent-emerald)",
  "bit-checked": "var(--color-accent-cyan)",
  evicted: "var(--color-accent-rose)",
  root: "var(--color-accent-emerald)",
  compressed: "var(--color-accent-cyan)",
  selected: "var(--color-accent-violet)",
};

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

function EmptyPlaceholder({ label }: { label?: string }) {
  return (
    <div
      className="flex h-10 w-16 items-center justify-center rounded font-mono text-xs"
      style={{
        border: "1px dashed var(--color-border-default)",
        color: "var(--color-text-muted)",
      }}
    >
      {label ?? "empty"}
    </div>
  );
}

function ElementRow({ label, elements }: { label: string; elements: SetElement[] }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
      <div className="flex flex-wrap gap-1">
        {elements.map((element, idx) => (
          <ElementCell key={idx} value={element.value} state={element.state} />
        ))}
        {elements.length === 0 && <EmptyPlaceholder />}
      </div>
    </div>
  );
}

function PhaseLabel({ phase, operationLabel }: { phase: string; operationLabel?: string }) {
  const phaseDescriptions: Record<string, string> = {
    building: "Building hash set from A",
    checking: "Checking B for membership",
    counting: "Counting element frequencies",
    comparing: "Comparing frequency counts",
    generating: "Generating subsets",
    hashing: "Computing hash positions",
    querying: "Querying membership",
    union: "Merging components",
    finding: "Finding root representative",
    selecting: "Selecting best covering set",
    complete: "Algorithm complete",
  };

  const display = operationLabel
    ? `${operationLabel} — ${phaseDescriptions[phase] ?? phase}`
    : (phaseDescriptions[phase] ?? phase);

  return (
    <div className="text-xs font-semibold" style={{ color: "var(--color-accent-amber)" }}>
      Phase: {display}
    </div>
  );
}

function BooleanResultBadge({ result }: { result: boolean | null | undefined }) {
  if (result === null || result === undefined) return null;
  return (
    <div
      className="rounded px-3 py-1 text-sm font-bold"
      style={{
        backgroundColor: result ? "var(--color-accent-emerald)" : "var(--color-accent-rose)",
        color: "var(--color-text-primary)",
      }}
    >
      Result: {result ? "TRUE" : "FALSE"}
    </div>
  );
}

function ResultRow({ label, values }: { label: string; values: number[] }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-[var(--color-text-muted)]">
        {label} ({values.length})
      </span>
      <div className="flex flex-wrap gap-1">
        {values.map((value, idx) => (
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
        {values.length === 0 && <EmptyPlaceholder />}
      </div>
    </div>
  );
}

function GenerationView({ visualState }: { visualState: SetVisualState }) {
  const generatedSets = visualState.generatedSets ?? [];
  const currentSubset = visualState.currentSubset ?? [];

  return (
    <>
      <ElementRow label="Input Elements" elements={visualState.setA} />
      {currentSubset.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Current Subset</span>
          <div className="flex flex-wrap gap-1">
            {currentSubset.map((value, idx) => (
              <div
                key={idx}
                className="flex h-10 w-10 items-center justify-center rounded font-mono text-sm font-bold"
                style={{
                  backgroundColor: "var(--color-accent-violet)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[var(--color-text-muted)]">
          Generated ({generatedSets.length}
          {visualState.totalExpected ? ` / ${visualState.totalExpected}` : ""})
        </span>
        <div className="flex max-h-40 flex-wrap gap-1 overflow-y-auto">
          {generatedSets.map((subset, idx) => (
            <div
              key={idx}
              className="rounded px-2 py-1 font-mono text-xs"
              style={{
                backgroundColor: "var(--color-surface-tertiary)",
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-text-primary)",
              }}
            >
              [{subset.join(", ")}]
            </div>
          ))}
          {generatedSets.length === 0 && <EmptyPlaceholder label="none yet" />}
        </div>
      </div>
    </>
  );
}

function MembershipView({ visualState }: { visualState: SetVisualState }) {
  const bitArray = visualState.bitArray ?? [];
  const hashPositions = visualState.hashPositions ?? [];
  const sketchGrid = visualState.sketchGrid ?? [];

  return (
    <>
      <ElementRow label="Inserted Elements" elements={visualState.setA} />
      {bitArray.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Bit Array ({bitArray.length} bits)
          </span>
          <div className="flex flex-wrap gap-0.5">
            {bitArray.map((bit, idx) => (
              <div
                key={idx}
                className="flex h-8 w-8 items-center justify-center rounded font-mono text-xs font-bold"
                style={{
                  backgroundColor: hashPositions.includes(idx)
                    ? "var(--color-accent-amber)"
                    : bit.value === 1
                      ? "var(--color-accent-emerald)"
                      : "var(--color-viz-default)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {bit.value}
              </div>
            ))}
          </div>
        </div>
      )}
      {sketchGrid.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Count-Min Sketch ({sketchGrid.length} x {sketchGrid[0]?.length ?? 0})
          </span>
          <div className="flex flex-col gap-0.5">
            {sketchGrid.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-0.5">
                <span className="flex w-8 items-center text-xs text-[var(--color-text-muted)]">
                  h{rowIdx}
                </span>
                {row.map((count, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex h-8 w-8 items-center justify-center rounded font-mono text-xs"
                    style={{
                      backgroundColor:
                        count > 0 ? "var(--color-accent-cyan)" : "var(--color-viz-default)",
                      border: "1px solid var(--color-border-subtle)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {count}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {visualState.falsePositive && (
        <div
          className="rounded px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: "var(--color-accent-rose)",
            color: "var(--color-text-primary)",
          }}
        >
          False Positive Detected
        </div>
      )}
    </>
  );
}

function DisjointSetView({ visualState }: { visualState: SetVisualState }) {
  const parentArray = visualState.parentArray ?? [];
  const rankArray = visualState.rankArray ?? [];
  const components = visualState.components ?? [];

  return (
    <>
      <ElementRow label="Elements" elements={visualState.setA} />
      {parentArray.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Parent Array</span>
          <div className="flex flex-wrap gap-0.5">
            {parentArray.map((entry, idx) => (
              <div key={idx} className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] text-[var(--color-text-muted)]">{idx}</span>
                <ElementCell value={entry.value} state={entry.state} />
              </div>
            ))}
          </div>
        </div>
      )}
      {rankArray.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Rank Array</span>
          <div className="flex flex-wrap gap-0.5">
            {rankArray.map((rankValue, idx) => (
              <div
                key={idx}
                className="flex h-8 w-8 items-center justify-center rounded font-mono text-xs"
                style={{
                  backgroundColor: "var(--color-surface-tertiary)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {rankValue}
              </div>
            ))}
          </div>
        </div>
      )}
      {components.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Components ({components.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {components.map((component, idx) => (
              <div
                key={idx}
                className="rounded px-2 py-1 font-mono text-xs"
                style={{
                  backgroundColor: "var(--color-surface-tertiary)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {"{" + component.join(", ") + "}"}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SetCoverView({ visualState }: { visualState: SetVisualState }) {
  const availableSets = visualState.availableSets ?? [];
  const uncoveredElements = visualState.uncoveredElements ?? [];
  const chosenSets = visualState.chosenSets ?? [];

  return (
    <>
      {uncoveredElements.length > 0 && (
        <ElementRow label="Uncovered Elements" elements={uncoveredElements} />
      )}
      {uncoveredElements.length === 0 && (
        <div
          className="rounded px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: "var(--color-accent-emerald)",
            color: "var(--color-text-primary)",
          }}
        >
          All Elements Covered
        </div>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-[var(--color-text-muted)]">
          Available Sets ({availableSets.length})
        </span>
        <div className="flex flex-wrap gap-2">
          {availableSets.map((candidateSet, idx) => (
            <div
              key={idx}
              className="rounded px-2 py-1 font-mono text-xs"
              style={{
                backgroundColor:
                  candidateSet.state === "selected"
                    ? "var(--color-accent-violet)"
                    : candidateSet.state === "checking"
                      ? "var(--color-accent-amber)"
                      : "var(--color-surface-tertiary)",
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-text-primary)",
              }}
            >
              S{idx}: {"{" + candidateSet.elements.join(", ") + "}"}
            </div>
          ))}
        </div>
      </div>
      {chosenSets.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Selected Sets ({chosenSets.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {chosenSets.map((chosenSet, idx) => (
              <div
                key={idx}
                className="rounded px-2 py-1 font-mono text-xs"
                style={{
                  backgroundColor: "var(--color-accent-emerald)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {"{" + chosenSet.join(", ") + "}"}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function OperationsView({ visualState }: { visualState: SetVisualState }) {
  const { setA, setB, hashSet, result, operationLabel } = visualState;
  const resultLabel = operationLabel ?? "Result";

  return (
    <>
      {setA.length > 0 && <ElementRow label="Array A" elements={setA} />}
      {setB.length > 0 && <ElementRow label="Array B" elements={setB} />}
      <ElementRow
        label={`Hash Set (${hashSet.length} element${hashSet.length !== 1 ? "s" : ""})`}
        elements={hashSet}
      />
      {visualState.booleanResult !== undefined && visualState.booleanResult !== null ? (
        <BooleanResultBadge result={visualState.booleanResult} />
      ) : (
        <ResultRow label={resultLabel} values={result} />
      )}
      {visualState.countersA && Object.keys(visualState.countersA).length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Frequency Counters A</span>
          <div className="flex flex-wrap gap-1">
            {Object.entries(visualState.countersA).map(([key, count]) => (
              <div
                key={key}
                className="rounded px-2 py-1 font-mono text-xs"
                style={{
                  backgroundColor: "var(--color-surface-tertiary)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {key}: {count}
              </div>
            ))}
          </div>
        </div>
      )}
      {visualState.countersB && Object.keys(visualState.countersB).length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Frequency Counters B</span>
          <div className="flex flex-wrap gap-1">
            {Object.entries(visualState.countersB).map(([key, count]) => (
              <div
                key={key}
                className="rounded px-2 py-1 font-mono text-xs"
                style={{
                  backgroundColor: "var(--color-surface-tertiary)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {key}: {count}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function SetVisualizer({ visualState }: SetVisualizerProps) {
  const isGeneration =
    visualState.generatedSets !== undefined || visualState.phase === "generating";
  const isMembership =
    (visualState.bitArray !== undefined && visualState.bitArray.length > 0) ||
    (visualState.sketchGrid !== undefined && visualState.sketchGrid.length > 0);
  const isDisjointSet = visualState.parentArray !== undefined && visualState.parentArray.length > 0;
  const isSetCover =
    visualState.availableSets !== undefined && visualState.availableSets.length > 0;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 overflow-y-auto p-4">
      <PhaseLabel phase={visualState.phase} operationLabel={visualState.operationLabel} />

      <div className="flex flex-col items-center gap-4">
        {isGeneration && <GenerationView visualState={visualState} />}
        {isMembership && <MembershipView visualState={visualState} />}
        {isDisjointSet && <DisjointSetView visualState={visualState} />}
        {isSetCover && <SetCoverView visualState={visualState} />}
        {!isGeneration && !isMembership && !isDisjointSet && !isSetCover && (
          <OperationsView visualState={visualState} />
        )}
      </div>
    </div>
  );
}
