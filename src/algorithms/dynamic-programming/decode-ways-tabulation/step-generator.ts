/** Step generator for Decode Ways (Tabulation) — produces ExecutionStep[] using DPTracker. */

import type { ExecutionStep } from "@/types";
import { DPTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DECODE_WAYS_TAB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DECODE_WAYS_TABULATION!);

interface DecodeWaysInput {
  digits: string;
}

export function generateDecodeWaysTabulationSteps(input: DecodeWaysInput): ExecutionStep[] {
  const { digits } = input;
  const digitCount = digits.length;
  const tableSize = digitCount + 1;

  const tracker = new DPTracker(tableSize, DECODE_WAYS_TAB_LINE_MAP, (index) => `D(${index})`);

  tracker.initialize({ tableSize, digits });

  if (digitCount === 0) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  // Base case: D(0) = 1 (empty prefix has exactly one decoding — the empty string)
  tracker.fillTable(0, 1, {
    position: 0,
    description: "Base case: D(0) = 1 (empty prefix has one decoding)",
  });

  // Base case: D(1) = 1 if digits[0] != '0', else 0
  const firstDigitWays = digits[0] !== "0" ? 1 : 0;
  tracker.fillTable(1, firstDigitWays, {
    position: 1,
    firstChar: digits[0],
    description: `Base case: D(1) = ${firstDigitWays} (first digit '${digits[0]}')`,
  });

  // dp values tracked locally so we can reference previous cells
  const dpValues: number[] = [1, firstDigitWays];

  for (let position = 2; position <= digitCount; position++) {
    let totalWays = 0;

    // Check single-digit decode: digits[position-1] in '1'..'9'
    const singleChar = digits[position - 1]!;
    const singleDigit = Number(singleChar);
    const singleValid = singleDigit >= 1 && singleDigit <= 9;

    tracker.readCache(position - 1, {
      position,
      checkingIndex: position - 1,
      singleChar,
      singleValid,
      description: singleValid
        ? `Single digit '${singleChar}' (${singleDigit}) is valid (1-9) — add D(${position - 1})`
        : `Single digit '${singleChar}' (${singleDigit}) is '0' — cannot decode alone`,
    });

    if (singleValid) {
      totalWays += dpValues[position - 1]!;
    }

    // Check two-digit decode: digits[position-2..position-1] in 10..26
    const twoDigitStr = digits.slice(position - 2, position);
    const twoDigitValue = Number(twoDigitStr);
    const twoValid = twoDigitValue >= 10 && twoDigitValue <= 26;

    tracker.readCache(position - 2, {
      position,
      checkingIndex: position - 2,
      twoDigitStr,
      twoDigitValue,
      twoValid,
      description: twoValid
        ? `Two digits '${twoDigitStr}' (${twoDigitValue}) map to letter '${String.fromCharCode(64 + twoDigitValue)}' — add D(${position - 2})`
        : `Two digits '${twoDigitStr}' (${twoDigitValue}) are outside 10-26 — cannot decode as pair`,
    });

    if (twoValid) {
      totalWays += dpValues[position - 2]!;
    }

    dpValues.push(totalWays);

    tracker.computeCell(
      position,
      totalWays,
      {
        position,
        singleValid,
        twoValid,
        totalWays,
        formula: `D(${position}) = ${singleValid ? `D(${position - 1})` : "0"}${twoValid ? ` + D(${position - 2})` : ""} = ${totalWays}`,
      },
      `Compute D(${position}) = ${totalWays} ways to decode first ${position} digit${position === 1 ? "" : "s"}`,
    );
  }

  const finalResult = dpValues[digitCount]!;
  tracker.complete({ result: finalResult });

  return tracker.getSteps();
}
