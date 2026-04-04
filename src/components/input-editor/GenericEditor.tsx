/**
 * Generic editor component for algorithms with one or more array fields and optional scalar parameters.
 * Renders each array as a text input and each scalar as a number input.
 */
import { fieldToLabel } from "./generic-editor-utils";

export default function GenericArrayWithParamsEditor({
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
