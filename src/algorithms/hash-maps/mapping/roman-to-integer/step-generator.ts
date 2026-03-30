/** Step generator for Roman to Integer — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ROMAN_TO_INTEGER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ROMAN_TO_INTEGER!);

export interface RomanToIntegerInput {
  text: string;
}

const ROMAN_VALUES: [string, number][] = [
  ["I", 1],
  ["V", 5],
  ["X", 10],
  ["L", 50],
  ["C", 100],
  ["D", 500],
  ["M", 1000],
];

export function generateRomanToIntegerSteps(input: RomanToIntegerInput): ExecutionStep[] {
  const { text } = input;
  const chars = text.split("");
  const tracker = new HashMapTracker(chars, ROMAN_TO_INTEGER_LINE_MAP);
  const romanMap = new Map<string, number>();

  tracker.initialize({ text });

  for (const [symbol, value] of ROMAN_VALUES) {
    romanMap.set(symbol, value);
    tracker.insertKey(symbol, String(value), { symbol, value });
  }

  let totalValue = 0;

  for (let charIndex = 0; charIndex < chars.length; charIndex++) {
    const currentSymbol = chars[charIndex]!;
    const nextSymbol = chars[charIndex + 1];
    const currentValue = romanMap.get(currentSymbol)!;
    const nextValue = nextSymbol !== undefined ? (romanMap.get(nextSymbol) ?? 0) : 0;

    tracker.processElement(charIndex, { charIndex, currentSymbol, totalValue });
    tracker.lookupKey(currentSymbol, { currentSymbol, currentValue, nextValue });
    tracker.keyFound(currentSymbol, 0, charIndex, { currentSymbol, currentValue, nextValue });

    if (currentValue < nextValue) {
      totalValue -= currentValue;
    } else {
      totalValue += currentValue;
    }
  }

  tracker.setResult(totalValue);
  tracker.complete({ result: totalValue });
  return tracker.getSteps();
}
