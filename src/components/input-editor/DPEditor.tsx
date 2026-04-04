/**
 * Generic DP-category input editor that introspects the input shape
 * and renders appropriate controls for each field automatically.
 * Handles: number scalars, number arrays, string fields, and string arrays.
 */
import { fieldToLabel } from "./generic-editor-utils";

export default function DPEditor({
  input,
  onChange,
}: {
  input: unknown;
  onChange: (value: unknown) => void;
}) {
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
                onChange({ ...inputRecord, [field]: value });
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
                onChange({ ...inputRecord, [field]: parsed });
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
            onChange={(event) => onChange({ ...inputRecord, [field]: event.target.value })}
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
                onChange({ ...inputRecord, [field]: parsed });
              }
            }}
            className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
          />
        </div>
      ))}
    </div>
  );
}
