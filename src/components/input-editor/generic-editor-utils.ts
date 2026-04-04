/**
 * Non-component utility functions shared across GenericEditor and InputEditor.
 * Kept in a .ts file to satisfy react-refresh/only-export-components.
 */

/**
 * Formats a camelCase or snake_case field name into a human-readable label.
 * e.g. "inputArray" → "Input array", "maxFlips" → "Max flips"
 */
export function fieldToLabel(field: string): string {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}
