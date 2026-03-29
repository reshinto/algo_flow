/** Step generator for Word Break (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const WORD_BREAK_TAB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.WORD_BREAK_TABULATION!);

interface WordBreakInput {
  text: string;
  dictionary: string[];
}

export function generateWordBreakTabulationSteps(input: WordBreakInput): ExecutionStep[] {
  const { text, dictionary } = input;
  const textLength = text.length;
  const tableSize = textLength + 1;

  const tracker = new DPTracker(tableSize, WORD_BREAK_TAB_LINE_MAP, (index) => `W(${index})`);

  tracker.initialize({ tableSize, text, dictionary });

  // dp values tracked locally so readCache can look up previous cells
  const dpValues: number[] = new Array(tableSize).fill(0);

  // Base case: W(0) = 1 (empty string is always segmentable)
  dpValues[0] = 1;
  tracker.fillTable(0, 1, {
    position: 0,
    description: "Base case: W(0) = 1 (empty string is always segmentable)",
  });

  for (let endIndex = 1; endIndex <= textLength; endIndex++) {
    let cellValue = 0;

    for (const word of dictionary) {
      const wordLength = word.length;

      if (endIndex >= wordLength) {
        const segment = text.substring(endIndex - wordLength, endIndex);
        const matchesWord = segment === word;
        const lookbackIndex = endIndex - wordLength;
        const lookbackValue = dpValues[lookbackIndex] ?? 0;

        tracker.readCache(lookbackIndex, {
          endIndex,
          word,
          segment,
          matchesWord,
          lookbackIndex,
          lookbackValue,
          description: matchesWord
            ? lookbackValue === 1
              ? `Segment '${segment}' matches '${word}' and W(${lookbackIndex})=1 — W(${endIndex}) = 1`
              : `Segment '${segment}' matches '${word}' but W(${lookbackIndex})=0 — no path here`
            : `Segment '${segment}' does not match '${word}' — skip`,
        });

        if (matchesWord && lookbackValue === 1) {
          cellValue = 1;
        }
      }

      tracker.computeCell(
        endIndex,
        cellValue,
        {
          endIndex,
          word,
          cellValue,
          formula: `W(${endIndex}) = ${cellValue} after checking word '${word}'`,
        },
        `W(${endIndex}) = ${cellValue} — checking word '${word}' ending at position ${endIndex}`,
      );
    }

    dpValues[endIndex] = cellValue;
  }

  const finalResult = (dpValues[textLength] ?? 0) === 1;
  tracker.complete({ result: finalResult, dpValues });

  return tracker.getSteps();
}
