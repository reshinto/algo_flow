/**
 * Themed native select element with automatic optgroup support.
 * Options with a `group` property are rendered under <optgroup> elements.
 */
import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
  /** When set, the option is placed inside an <optgroup> with this label. */
  group?: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  label?: string;
}

/** Native <select> that auto-groups options by their `group` field. */
export default function Select({ options, label, className = "", ...rest }: SelectProps) {
  // Partition options into grouped (by category) and ungrouped buckets
  const grouped = new Map<string, SelectOption[]>();
  const ungrouped: SelectOption[] = [];

  for (const option of options) {
    if (option.group) {
      const group = grouped.get(option.group) ?? [];
      group.push(option);
      grouped.set(option.group, group);
    } else {
      ungrouped.push(option);
    }
  }

  return (
    <select
      aria-label={label}
      className={`h-11 md:h-9 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] px-3 text-sm text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] ${className}`}
      {...rest}
    >
      {ungrouped.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {Array.from(grouped.entries()).map(([groupName, groupOptions]) => (
        <optgroup key={groupName} label={groupName}>
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
