/**
 * Category-dispatch input editor.
 *
 * Reads the active algorithm's category from the registry definition and
 * delegates to the appropriate category-specific editor (array, grid, etc.).
 * This keeps algorithm-specific input logic out of the visualization panel
 * while letting each category define its own editing UX.
 */
import { useState, useEffect } from "react";
import { useAppStore } from "@/store";

import ArrayInputEditor from "./ArrayInputEditor";
import GridInputEditor from "./GridInputEditor";

/** Dispatches to the correct input editor based on the algorithm's category. */
export default function InputEditor() {
  const definition = useAppStore((state) => state.definition);
  const input = useAppStore((state) => state.input);
  const setInput = useAppStore((state) => state.setInput);

  if (!definition) return null;

  const category = definition.meta.category;

  switch (category) {
    case "sorting":
      return (
        <ArrayInputEditor
          values={input as number[]}
          onChange={(values) => setInput(values)}
          label="Array values (comma-separated)"
        />
      );

    case "searching":
      return (
        <SearchingInputEditor
          input={input as { sortedArray: number[]; targetValue: number }}
          onChange={setInput}
        />
      );

    case "array-techniques":
      return (
        <SlidingWindowInputEditor
          input={input as { inputArray: number[]; windowSize: number }}
          onChange={setInput}
        />
      );

    case "dynamic-programming":
      return <DPInputEditor input={input as { targetIndex: number }} onChange={setInput} />;

    case "pathfinding":
      return <GridInputEditor />;

    default:
      return null;
  }
}

function SearchingInputEditor({
  input,
  onChange,
}: {
  input: { sortedArray: number[]; targetValue: number };
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Array:</label>
        <input
          type="text"
          value={input.sortedArray.join(", ")}
          onChange={(event) => {
            const parsed = event.target.value
              .split(",")
              .map((str) => parseInt(str.trim(), 10))
              .filter((num) => !isNaN(num))
              .sort((numA, numB) => numA - numB);
            if (parsed.length > 0) {
              onChange({ ...input, sortedArray: parsed });
            }
          }}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Target:</label>
        <input
          type="number"
          value={input.targetValue}
          onChange={(event) => {
            const targetValue = parseInt(event.target.value, 10);
            if (!isNaN(targetValue)) {
              onChange({ ...input, targetValue });
            }
          }}
          className="w-20 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
    </div>
  );
}

function SlidingWindowInputEditor({
  input,
  onChange,
}: {
  input: { inputArray: number[]; windowSize: number };
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Array:</label>
        <input
          type="text"
          value={input.inputArray.join(", ")}
          onChange={(event) => {
            const parsed = event.target.value
              .split(",")
              .map((str) => parseInt(str.trim(), 10))
              .filter((num) => !isNaN(num));
            if (parsed.length > 0) {
              onChange({ ...input, inputArray: parsed });
            }
          }}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Window size:</label>
        <input
          type="number"
          min={1}
          max={input.inputArray.length}
          value={input.windowSize}
          onChange={(event) => {
            const windowSize = parseInt(event.target.value, 10);
            if (!isNaN(windowSize) && windowSize > 0) {
              onChange({ ...input, windowSize });
            }
          }}
          className="w-16 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
    </div>
  );
}

function DPInputEditor({
  input,
  onChange,
}: {
  input: { targetIndex: number };
  onChange: (value: unknown) => void;
}) {
  const [localValue, setLocalValue] = useState(String(input.targetIndex));

  useEffect(() => {
    setLocalValue(String(input.targetIndex));
  }, [input.targetIndex]);

  return (
    <div className="flex items-center gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
        Compute F(n), n =
      </label>
      <input
        type="number"
        min={0}
        max={30}
        value={localValue}
        onChange={(event) => {
          setLocalValue(event.target.value);
          if (event.target.value === "") return;
          const targetIndex = parseInt(event.target.value, 10);
          if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex <= 30) {
            onChange({ targetIndex });
          }
        }}
        className="w-16 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
      />
    </div>
  );
}
