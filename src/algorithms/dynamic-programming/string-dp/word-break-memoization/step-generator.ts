/** Step generator for Word Break (Memoization) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const WORD_BREAK_MEMO_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.WORD_BREAK_MEMOIZATION!);

interface WordBreakInput {
  text: string;
  dictionary: string[];
}

export function generateWordBreakMemoizationSteps(input: WordBreakInput): ExecutionStep[] {
  const { text, dictionary } = input;
  const textLength = text.length;
  const tableSize = textLength + 1;
  const tracker = new DPTracker(tableSize, WORD_BREAK_MEMO_LINE_MAP, (index) => `W(${index})`);
  const memo = new Map<number, boolean>();

  tracker.initialize({ text, dictionary, textLength });

  if (textLength === 0) {
    tracker.complete({ result: true, text });
    return tracker.getSteps();
  }

  function canBreak(startIndex: number): boolean {
    if (startIndex === textLength) {
      if (!memo.has(startIndex)) {
        memo.set(startIndex, true);
        tracker.fillTable(startIndex, 1, {
          startIndex,
          description: `Base case: W(${startIndex}) = true (reached end of text)`,
        });
      }
      return true;
    }

    if (memo.has(startIndex)) {
      tracker.readCache(startIndex, {
        startIndex,
        cachedValue: memo.get(startIndex),
      });
      return memo.get(startIndex)!;
    }

    tracker.pushCallStack(`W(${startIndex})`, { startIndex });

    for (const word of dictionary) {
      const endIndex = startIndex + word.length;
      if (endIndex <= textLength && text.slice(startIndex, endIndex) === word) {
        if (canBreak(endIndex)) {
          memo.set(startIndex, true);
          tracker.computeCell(startIndex, 1, {
            startIndex,
            word,
            endIndex,
            formula: `W(${startIndex}) = true via word "${word}"`,
            result: true,
          });
          tracker.popCallStack({ startIndex, result: true });
          return true;
        }
      }
    }

    memo.set(startIndex, false);
    tracker.computeCell(startIndex, 0, {
      startIndex,
      formula: `W(${startIndex}) = false — no dictionary word matches`,
      result: false,
    });
    tracker.popCallStack({ startIndex, result: false });

    return false;
  }

  const result = canBreak(0);

  tracker.complete({ result, text, dictionary });

  return tracker.getSteps();
}
