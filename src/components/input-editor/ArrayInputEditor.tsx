/** Comma-separated array input with local text buffer to avoid Zustand state resets on each keystroke. */
import { useState } from "react";

interface ArrayInputEditorProps {
  values: number[];
  onChange: (values: number[]) => void;
  label: string;
}

export default function ArrayInputEditor({ values, onChange, label }: ArrayInputEditorProps) {
  const [textValue, setTextValue] = useState(values.join(", "));

  const handleBlur = () => {
    const parsed = textValue
      .split(",")
      .map((str) => parseInt(str.trim(), 10))
      .filter((num) => !isNaN(num));
    if (parsed.length > 0) {
      onChange(parsed);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="flex items-center gap-2 border-b border-[var(--color-border-default)] px-3 py-2">
      <label className="shrink-0 text-[10px] text-[var(--color-text-muted)]">{label}</label>
      <input
        type="text"
        value={textValue}
        onChange={(event) => setTextValue(event.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
      />
    </div>
  );
}
