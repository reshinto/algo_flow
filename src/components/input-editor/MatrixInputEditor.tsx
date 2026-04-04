/** Textarea-based editor for 2-D matrix inputs (one row per line, comma-separated values). */
export default function MatrixInputEditor({
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
