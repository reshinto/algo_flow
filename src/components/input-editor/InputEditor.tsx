/** Dispatches to category-specific input editors based on the current algorithm's category. */
import { useAppStore } from "@/store";
import { CATEGORY } from "@/utils/constants";

import ArrayInputEditor from "./ArrayInputEditor";

export default function InputEditor() {
  const definition = useAppStore((state) => state.definition);
  const input = useAppStore((state) => state.input);
  const setInput = useAppStore((state) => state.setInput);

  if (!definition) return null;

  const category = definition.meta.category;

  switch (category) {
    case CATEGORY.SORTING:
      return (
        <ArrayInputEditor
          values={input as number[]}
          onChange={(values) => setInput(values)}
          label="Array values (comma-separated)"
        />
      );

    case CATEGORY.SEARCHING:
      return (
        <SearchingInputEditor
          input={input as { sortedArray: number[]; targetValue: number }}
          onChange={setInput}
        />
      );

    case CATEGORY.ARRAYS:
      return renderArraysEditor(definition.meta.id, input, setInput);

    case CATEGORY.DYNAMIC_PROGRAMMING:
      return renderDPEditor(input, setInput);

    case CATEGORY.PATHFINDING:
      /* Grid editing is handled directly in the GridVisualizer component */
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
      return renderGenericEditor(input, setInput);

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
      return renderHashMapsEditor(input, setInput);

    default:
      return null;
  }
}

/**
 * Generic input editor that introspects the input shape and renders appropriate
 * controls for each field. Handles: number arrays, string arrays, scalars,
 * strings, and nested 2D arrays (e.g. intervals, points).
 * Used by categories with diverse input shapes (Heaps, etc.).
 */
function renderGenericEditor(input: unknown, setInput: (value: unknown) => void) {
  const inputRecord = input as Record<string, unknown>;
  const keys = Object.keys(inputRecord);

  const numberArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      typeof (inputRecord[key] as unknown[])[0] === "number",
  );
  const stringArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      typeof (inputRecord[key] as unknown[])[0] === "string",
  );
  const nestedArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      Array.isArray((inputRecord[key] as unknown[])[0]),
  );
  const scalarFields = keys.filter((key) => typeof inputRecord[key] === "number");
  const stringFields = keys.filter(
    (key) => typeof inputRecord[key] === "string" && !Array.isArray(inputRecord[key]),
  );

  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      {numberArrayFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={(inputRecord[field] as number[]).join(", ")}
            onChange={(event) => {
              const parsed = event.target.value
                .split(",")
                .map((str) => parseInt(str.trim(), 10))
                .filter((num) => !isNaN(num));
              if (parsed.length > 0) {
                setInput({ ...inputRecord, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {scalarFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="number"
            value={inputRecord[field] as number}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              if (!isNaN(value)) {
                setInput({ ...inputRecord, [field]: value });
              }
            }}
            className="w-20 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {stringFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={inputRecord[field] as string}
            onChange={(event) => setInput({ ...inputRecord, [field]: event.target.value })}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {stringArrayFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={(inputRecord[field] as string[]).join(", ")}
            onChange={(event) => {
              const parsed = event.target.value
                .split(",")
                .map((str) => str.trim())
                .filter((str) => str.length > 0);
              if (parsed.length > 0) {
                setInput({ ...inputRecord, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {nestedArrayFields.map((field) => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)} (one row per line, comma-separated):
          </label>
          <textarea
            rows={Math.min((inputRecord[field] as unknown[][]).length, 6)}
            value={(inputRecord[field] as number[][]).map((row) => row.join(", ")).join("\n")}
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
                setInput({ ...inputRecord, [field]: parsed });
              }
            }}
            className="rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Formats a camelCase or snake_case field name into a human-readable label.
 * e.g. "inputArray" → "Input array", "maxFlips" → "Max flips"
 */
function fieldToLabel(field: string): string {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

/**
 * Generic arrays-category input editor that introspects the input shape
 * and renders appropriate controls for each field automatically.
 * Handles: single arrays, array+number combos, dual arrays, and complex inputs.
 */
function renderArraysEditor(
  _algorithmId: string,
  input: unknown,
  setInput: (value: unknown) => void,
) {
  const inputRecord = input as Record<string, unknown>;
  const keys = Object.keys(inputRecord);

  const numberArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      typeof (inputRecord[key] as unknown[])[0] === "number",
  );
  const scalarFields = keys.filter((key) => typeof inputRecord[key] === "number");

  // Single flat number[] with no extra fields — simplest case
  if (numberArrayFields.length === 1 && scalarFields.length === 0) {
    const arrayKey = numberArrayFields[0]!;
    return (
      <ArrayInputEditor
        values={inputRecord[arrayKey] as number[]}
        onChange={(values) => setInput({ ...inputRecord, [arrayKey]: values })}
        label={`${fieldToLabel(arrayKey)} (comma-separated)`}
      />
    );
  }

  // number[] + one or more scalar numbers — array with parameter(s)
  if (numberArrayFields.length >= 1 && scalarFields.length >= 1) {
    return (
      <GenericArrayWithParamsEditor
        input={inputRecord}
        arrayFields={numberArrayFields}
        scalarFields={scalarFields}
        onChange={setInput}
      />
    );
  }

  // Two or more number[] fields with no scalars — dual/multi array
  if (numberArrayFields.length >= 2 && scalarFields.length === 0) {
    return (
      <GenericArrayWithParamsEditor
        input={inputRecord}
        arrayFields={numberArrayFields}
        scalarFields={[]}
        onChange={setInput}
      />
    );
  }

  // Fallback: render all number[] fields as array editors
  if (numberArrayFields.length >= 1) {
    const arrayKey = numberArrayFields[0]!;
    return (
      <ArrayInputEditor
        values={inputRecord[arrayKey] as number[]}
        onChange={(values) => setInput({ ...inputRecord, [arrayKey]: values })}
        label={`${fieldToLabel(arrayKey)} (comma-separated)`}
      />
    );
  }

  // Scalar-only fields (no editable arrays) — e.g. Difference Array has arrayLength + complex updates
  if (scalarFields.length >= 1) {
    return (
      <GenericArrayWithParamsEditor
        input={inputRecord}
        arrayFields={[]}
        scalarFields={scalarFields}
        onChange={setInput}
      />
    );
  }

  return null;
}

/**
 * Generic editor for algorithms with one or more array fields and optional scalar parameters.
 * Renders each array as a text input and each scalar as a number input.
 */
function GenericArrayWithParamsEditor({
  input,
  arrayFields,
  scalarFields,
  onChange,
}: {
  input: Record<string, unknown>;
  arrayFields: string[];
  scalarFields: string[];
  onChange: (value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      {arrayFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={(input[field] as number[]).join(", ")}
            onChange={(event) => {
              const parsed = event.target.value
                .split(",")
                .map((str) => parseInt(str.trim(), 10))
                .filter((num) => !isNaN(num));
              if (parsed.length > 0) {
                onChange({ ...input, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {scalarFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="number"
            value={input[field] as number}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              if (!isNaN(value)) {
                onChange({ ...input, [field]: value });
              }
            }}
            className="w-20 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
    </div>
  );
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

/**
 * Generic hash-maps-category input editor that introspects the input shape
 * and renders appropriate controls for each field automatically.
 * Handles all 28 hash-map algorithms: number arrays, strings, scalars, multi-arrays, string arrays.
 */
function renderHashMapsEditor(input: unknown, setInput: (value: unknown) => void) {
  const inputRecord = input as Record<string, unknown>;
  const keys = Object.keys(inputRecord);

  const numberArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      typeof (inputRecord[key] as unknown[])[0] === "number",
  );
  const stringArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      typeof (inputRecord[key] as unknown[])[0] === "string",
  );
  const scalarFields = keys.filter((key) => typeof inputRecord[key] === "number");
  const stringFields = keys.filter(
    (key) => typeof inputRecord[key] === "string" && !Array.isArray(inputRecord[key]),
  );

  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      {numberArrayFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={(inputRecord[field] as number[]).join(", ")}
            onChange={(event) => {
              const parsed = event.target.value
                .split(",")
                .map((str) => parseInt(str.trim(), 10))
                .filter((num) => !isNaN(num));
              if (parsed.length > 0) {
                setInput({ ...inputRecord, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {scalarFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="number"
            value={inputRecord[field] as number}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              if (!isNaN(value)) {
                setInput({ ...inputRecord, [field]: value });
              }
            }}
            className="w-20 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {stringFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={inputRecord[field] as string}
            onChange={(event) => setInput({ ...inputRecord, [field]: event.target.value })}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {stringArrayFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={(inputRecord[field] as string[]).join(", ")}
            onChange={(event) => {
              const parsed = event.target.value
                .split(",")
                .map((str) => str.trim())
                .filter((str) => str.length > 0);
              if (parsed.length > 0) {
                setInput({ ...inputRecord, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Generic DP-category input editor that introspects the input shape
 * and renders appropriate controls for each field automatically.
 * Handles: number scalars, number arrays, string fields, and string arrays.
 */
function renderDPEditor(input: unknown, setInput: (value: unknown) => void) {
  const inputRecord = input as Record<string, unknown>;
  const keys = Object.keys(inputRecord);

  const numberArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      typeof (inputRecord[key] as unknown[])[0] === "number",
  );
  const stringArrayFields = keys.filter(
    (key) =>
      Array.isArray(inputRecord[key]) &&
      (inputRecord[key] as unknown[]).length > 0 &&
      typeof (inputRecord[key] as unknown[])[0] === "string",
  );
  const scalarFields = keys.filter((key) => typeof inputRecord[key] === "number");
  const stringFields = keys.filter(
    (key) => typeof inputRecord[key] === "string" && !Array.isArray(inputRecord[key]),
  );

  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      {scalarFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="number"
            value={inputRecord[field] as number}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              if (!isNaN(value)) {
                setInput({ ...inputRecord, [field]: value });
              }
            }}
            className="w-20 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {numberArrayFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={(inputRecord[field] as number[]).join(", ")}
            onChange={(event) => {
              const parsed = event.target.value
                .split(",")
                .map((str) => parseInt(str.trim(), 10))
                .filter((num) => !isNaN(num));
              if (parsed.length > 0) {
                setInput({ ...inputRecord, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {stringFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={inputRecord[field] as string}
            onChange={(event) => setInput({ ...inputRecord, [field]: event.target.value })}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
      {stringArrayFields.map((field) => (
        <div key={field} className="flex items-center gap-2">
          <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">
            {fieldToLabel(field)}:
          </label>
          <input
            type="text"
            value={(inputRecord[field] as string[]).join(", ")}
            onChange={(event) => {
              const parsed = event.target.value
                .split(",")
                .map((str) => str.trim())
                .filter((str) => str.length > 0);
              if (parsed.length > 0) {
                setInput({ ...inputRecord, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
    </div>
  );
}
