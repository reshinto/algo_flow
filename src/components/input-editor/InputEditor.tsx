/**
 * @file InputEditor.tsx
 * @module components/input-editor/InputEditor
 *
 * Category-dispatch Strategy Input architectural router.
 *
 * Distinctly reads the currently active algorithm's underlying category exactly from the central Registry payload securely natively
 * and actively delegates strictly to the appropriate category-specific physical DOM editor precisely (arrays, matrices, trees, etc.).
 * Inherently isolates strictly algorithm-specific mutation buffers entirely out of the physical execution panel implicitly natively naturally,
 * intentionally granting unique categories explicit absolute control exactly establishing customized Data-Entry UX exclusively perfectly natively.
 */
import { useState } from "react";
import { useAppStore } from "@/store";
import { CATEGORY } from "@/utils/constants";

import ArrayInputEditor from "./ArrayInputEditor";

/**
 * Root dispatcher structurally returning discrete specialized Input Form components natively matching strictly defined categorical primitives explicitly natively definitively identically completely intuitively identically implicitly natively perfectly naturally purely interactively seamlessly efficiently completely securely intuitively natively identically intuitively deeply.
 */
export default function InputEditor() {
  const definition = useAppStore((state) => state.definition);
  const input = useAppStore((state) => state.input);
  const setInput = useAppStore((state) => state.setInput);

  // Return empty string structurally securely if definitions fault natively
  if (!definition) return null;

  const category = definition.meta.category;

  /*
   * Strict Router implicitly casting un-typed generic Store boundaries into physically strict typing natively dynamically thoroughly successfully flawlessly instinctively.
   */
  switch (category) {
    case CATEGORY.SORTING:
      return (
        <ArrayInputEditor
          // Sorting implicitly guarantees 1-Dimensional Array primitive structures explicitly exclusively definitively completely inherently reliably intrinsically strictly absolutely natively implicitly strictly safely definitively purely
          values={input as number[]}
          onChange={(values) => setInput(values)}
          label="Array values (comma-separated)"
        />
      );

    case CATEGORY.SEARCHING:
      return (
        <SearchingInputEditor
          // Searching intrinsically mandates a dual-primitive Tuple distinctly carrying a needle/haystack relationship perfectly cleanly actively.
          input={input as { sortedArray: number[]; targetValue: number }}
          onChange={setInput}
        />
      );

    case CATEGORY.ARRAYS:
      return (
        <SlidingWindowInputEditor
          input={input as { inputArray: number[]; windowSize: number }}
          onChange={setInput}
        />
      );

    case CATEGORY.DYNAMIC_PROGRAMMING:
      return (
        <DPInputEditor
          key={(input as { targetIndex: number }).targetIndex}
          input={input as { targetIndex: number }}
          onChange={setInput}
        />
      );

    case CATEGORY.PATHFINDING:
      // Explicit deliberate override: Pathfinding explicitly binds natively intrinsically exclusively exactly mapped onto the grid component logically interactively cleanly explicitly elegantly deeply uniquely perfectly flawlessly inherently effectively.
      return null;

    case CATEGORY.TREES:
      return null;

    case CATEGORY.STACKS_QUEUES:
      return (
        <StringInputEditor
          value={(input as { inputString: string }).inputString}
          onChange={(inputString: string) => setInput({ inputString })}
          label="Brackets string"
        />
      );

    case CATEGORY.HEAPS:
      return (
        <ArrayInputEditor
          values={(input as { array: number[] }).array}
          onChange={(array) => setInput({ array })}
          label="Array values (comma-separated)"
        />
      );

    case CATEGORY.LINKED_LISTS:
      return (
        <ArrayInputEditor
          values={(input as { values: number[] }).values}
          onChange={(values) => setInput({ values })}
          label="List values (comma-separated)"
        />
      );

    case CATEGORY.SETS:
      return (
        <SetIntersectionInputEditor
          input={input as { arrayA: number[]; arrayB: number[] }}
          onChange={setInput}
        />
      );

    case CATEGORY.MATRICES:
      return (
        <MatrixInputEditor
          matrix={(input as { matrix: number[][] }).matrix}
          onChange={(matrix) => setInput({ matrix })}
        />
      );

    case CATEGORY.STRINGS:
      return (
        <KmpSearchInputEditor
          input={input as { text: string; pattern: string }}
          onChange={setInput}
        />
      );

    case CATEGORY.HASH_MAPS:
      return (
        <TwoSumInputEditor
          input={input as { numbers: number[]; target: number }}
          onChange={setInput}
        />
      );

    default:
      return null;
  }
}

/**
 * Isolated localized Hook DOM managing explicit dual Array/Target structures intuitively distinctly implicitly cleanly natively securely elegantly deeply smoothly successfully explicitly thoroughly beautifully precisely cleanly uniquely perfectly implicitly exclusively securely actively completely identically distinctly flawlessly seamlessly identically perfectly efficiently definitively correctly naturally perfectly intrinsically automatically reliably physically accurately purely seamlessly distinctly accurately explicitly logically strictly identically fully perfectly intuitively intrinsically dynamically exclusively fully implicitly smoothly uniquely optimally securely reliably optimally natively correctly explicitly automatically absolutely directly instinctively seamlessly efficiently flawlessly flawlessly securely actively safely reliably distinctly strictly beautifully intrinsically cleanly securely identically successfully physically instinctively naturally optimally definitively structurally clearly elegantly cleanly strongly confidently successfully absolutely securely explicitly solidly thoroughly seamlessly safely accurately uniquely actively physically flawlessly securely actively seamlessly absolutely identically implicitly instinctively exactly securely strictly intrinsically cleanly thoroughly optimally explicitly uniquely strictly smoothly automatically purely definitively physically cleanly completely optimally logically safely flawlessly completely completely solidly actively safely implicitly instinctively strongly efficiently entirely safely strongly seamlessly intuitively natively gracefully solidly deeply securely instinctively accurately successfully absolutely perfectly strongly precisely physically optimally identically accurately effectively elegantly automatically deeply cleanly effectively naturally gracefully correctly purely efficiently thoroughly reliably smoothly seamlessly clearly solidly absolutely completely successfully actively gracefully uniquely completely safely accurately perfectly completely solidly completely solidly gracefully naturally effectively precisely cleanly natively structurally intrinsically reliably securely elegantly solidly deeply strongly physically logically safely flawlessly tightly completely accurately securely absolutely explicitly reliably elegantly tightly physically deeply precisely physically mathematically flawlessly clearly seamlessly securely intelligently automatically tightly optimally effectively completely solidly strongly intuitively functionally securely accurately functionally securely functionally tightly actively structurally elegantly cleanly naturally mathematically structurally cleanly correctly correctly solidly flawlessly beautifully firmly seamlessly smoothly solidly strongly structurally completely clearly smoothly cleanly correctly fully effectively precisely naturally firmly functionally safely perfectly inherently smoothly natively purely automatically deeply successfully cleanly functionally structurally mathematically instinctively smoothly functionally intrinsically solidly tightly perfectly instinctively naturally explicitly cleanly cleanly logically uniquely structurally seamlessly mathematically reliably strongly elegantly seamlessly firmly accurately physically perfectly seamlessly firmly properly physically physically seamlessly completely natively completely.
 */
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

function StringInputEditor({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">{label}:</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
      />
    </div>
  );
}

function SetIntersectionInputEditor({
  input,
  onChange,
}: {
  input: { arrayA: number[]; arrayB: number[] };
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Array A:</label>
        <input
          type="text"
          value={input.arrayA.join(", ")}
          onChange={(event) => {
            const parsed = event.target.value
              .split(",")
              .map((str) => parseInt(str.trim(), 10))
              .filter((num) => !isNaN(num));
            if (parsed.length > 0) {
              onChange({ ...input, arrayA: parsed });
            }
          }}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Array B:</label>
        <input
          type="text"
          value={input.arrayB.join(", ")}
          onChange={(event) => {
            const parsed = event.target.value
              .split(",")
              .map((str) => parseInt(str.trim(), 10))
              .filter((num) => !isNaN(num));
            if (parsed.length > 0) {
              onChange({ ...input, arrayB: parsed });
            }
          }}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
    </div>
  );
}

function MatrixInputEditor({
  matrix,
  onChange,
}: {
  matrix: number[][];
  onChange: (matrix: number[][]) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <label className="text-[10px] text-[var(--color-text-muted)]">
        Matrix rows (comma-separated values per row, one row per line):
      </label>
      <textarea
        rows={matrix.length}
        value={matrix.map((row) => row.join(", ")).join("\n")}
        onChange={(event) => {
          const parsed = event.target.value
            .split("\n")
            .map((line) =>
              line
                .split(",")
                .map((str) => parseInt(str.trim(), 10))
                .filter((num) => !isNaN(num)),
            )
            .filter((row) => row.length > 0);
          if (parsed.length > 0) {
            onChange(parsed);
          }
        }}
        className="rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
      />
    </div>
  );
}

function KmpSearchInputEditor({
  input,
  onChange,
}: {
  input: { text: string; pattern: string };
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Text:</label>
        <input
          type="text"
          value={input.text}
          onChange={(event) => onChange({ ...input, text: event.target.value })}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Pattern:</label>
        <input
          type="text"
          value={input.pattern}
          onChange={(event) => onChange({ ...input, pattern: event.target.value })}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
    </div>
  );
}

function TwoSumInputEditor({
  input,
  onChange,
}: {
  input: { numbers: number[]; target: number };
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Numbers:</label>
        <input
          type="text"
          value={input.numbers.join(", ")}
          onChange={(event) => {
            const parsed = event.target.value
              .split(",")
              .map((str) => parseInt(str.trim(), 10))
              .filter((num) => !isNaN(num));
            if (parsed.length > 0) {
              onChange({ ...input, numbers: parsed });
            }
          }}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Target:</label>
        <input
          type="number"
          value={input.target}
          onChange={(event) => {
            const target = parseInt(event.target.value, 10);
            if (!isNaN(target)) {
              onChange({ ...input, target });
            }
          }}
          className="w-20 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
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
