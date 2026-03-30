/** Step generator for Integer to Roman — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INTEGER_TO_ROMAN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INTEGER_TO_ROMAN!);

export interface IntegerToRomanInput {
  number: number;
}

const VALUE_SYMBOL_PAIRS: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function generateIntegerToRomanSteps(input: IntegerToRomanInput): ExecutionStep[] {
  const tracker = new HashMapTracker([], INTEGER_TO_ROMAN_LINE_MAP);

  tracker.initialize({ value: input.number });

  for (const [numericValue, symbol] of VALUE_SYMBOL_PAIRS) {
    tracker.insertKey(String(numericValue), symbol, { numericValue, symbol });
  }

  let remaining = input.number;
  let result = "";

  for (const [numericValue, symbol] of VALUE_SYMBOL_PAIRS) {
    while (remaining >= numericValue) {
      remaining -= numericValue;
      tracker.lookupKey(String(numericValue), { remaining, result, numericValue, symbol });
      result += symbol;
      tracker.keyFound(String(numericValue), 0, 0, { remaining, result });
    }
  }

  tracker.setResult(result);
  tracker.complete({ result });
  return tracker.getSteps();
}
