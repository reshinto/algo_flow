/** Input editor for searching-category algorithms with a target value and sortable array. */
export default function SearchingInputEditor({
  input,
  onChange,
  arrayKey,
  autoSort,
}: {
  input: Record<string, unknown>;
  onChange: (value: unknown) => void;
  arrayKey: string;
  autoSort: boolean;
}) {
  const arrayValues = input[arrayKey] as number[];
  const targetValue = input.targetValue as number;
  const arrayLabel = autoSort ? "Sorted Array:" : "Array:";

  return (
    <div className="flex flex-col gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">{arrayLabel}</label>
        <input
          type="text"
          value={arrayValues.join(", ")}
          onChange={(event) => {
            let parsed = event.target.value
              .split(",")
              .map((str) => parseInt(str.trim(), 10))
              .filter((num) => !isNaN(num));
            if (autoSort) {
              parsed = parsed.sort((numA, numB) => numA - numB);
            }
            if (parsed.length > 0) {
              onChange({ ...input, [arrayKey]: parsed });
            }
          }}
          className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">Target:</label>
        <input
          type="number"
          value={targetValue}
          onChange={(event) => {
            const newTarget = parseInt(event.target.value, 10);
            if (!isNaN(newTarget)) {
              onChange({ ...input, targetValue: newTarget });
            }
          }}
          className="w-20 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
        />
      </div>
    </div>
  );
}
