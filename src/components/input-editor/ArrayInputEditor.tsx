/** Comma-separated array input with local text buffer to avoid Zustand state resets on each keystroke. */
import { useEffect, useRef, useState } from "react";

interface ArrayInputEditorProps {
  values: number[];
  onChange: (values: number[]) => void;
  label: string;
}

export default function ArrayInputEditor({ values, onChange, label }: ArrayInputEditorProps) {
  const [textValue, setTextValue] = useState(values.join(", "));
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local text when the values prop changes from outside (e.g. algorithm switch).
  useEffect(() => {
    setTextValue(values.join(", "));
  }, [values]);

  // Clean up pending debounce timer on unmount.
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setTextValue(newText);

    // Debounce: parse and propagate after 300 ms of no typing.
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      const parsed = newText
        .split(",")
        .map((str) => parseInt(str.trim(), 10))
        .filter((num) => !isNaN(num));
      if (parsed.length > 0) onChange(parsed);
    }, 300);
  };

  const handleBlur = () => {
    // Immediate commit when the user clicks away — cancel any pending debounce.
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
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
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="min-w-0 flex-1 rounded bg-[var(--color-surface-tertiary)] px-2 py-1 font-mono text-xs text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent-cyan)]"
      />
    </div>
  );
}
