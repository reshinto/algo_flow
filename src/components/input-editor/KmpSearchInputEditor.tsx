/** Dual-field text/pattern input editor for string-search algorithms such as KMP. */
export default function KmpSearchInputEditor({
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
