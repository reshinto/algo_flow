/**
 * Generic arrays-category input editor that introspects the input shape
 * and renders appropriate controls for each field automatically.
 * Handles: single arrays, array+number combos, dual arrays, and complex inputs.
 */
import ArrayInputEditor from "./ArrayInputEditor";
import GenericArrayWithParamsEditor from "./GenericEditor";
import { fieldToLabel } from "./generic-editor-utils";

export default function ArraysEditor({
  algorithmId: _algorithmId,
  input,
  onChange,
}: {
  algorithmId: string;
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
  const scalarFields = keys.filter((key) => typeof inputRecord[key] === "number");

  // Single flat number[] with no extra fields — simplest case
  if (numberArrayFields.length === 1 && scalarFields.length === 0) {
    const arrayKey = numberArrayFields[0]!;
    return (
      <ArrayInputEditor
        values={inputRecord[arrayKey] as number[]}
        onChange={(values) => onChange({ ...inputRecord, [arrayKey]: values })}
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
        onChange={onChange}
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
        onChange={onChange}
      />
    );
  }

  // Fallback: render all number[] fields as array editors
  if (numberArrayFields.length >= 1) {
    const arrayKey = numberArrayFields[0]!;
    return (
      <ArrayInputEditor
        values={inputRecord[arrayKey] as number[]}
        onChange={(values) => onChange({ ...inputRecord, [arrayKey]: values })}
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
        onChange={onChange}
      />
    );
  }

  return null;
}
