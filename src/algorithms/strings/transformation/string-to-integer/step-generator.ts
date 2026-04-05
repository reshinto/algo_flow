/** Step generator for String to Integer (atoi) — produces ExecutionStep[] using TransformTracker. */

import type { ExecutionStep } from "@/types";
import { TransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const STRING_TO_INTEGER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.STRING_TO_INTEGER!);

const INT32_MIN = -(2 ** 31);
const INT32_MAX = 2 ** 31 - 1;

export interface StringToIntegerInput {
  text: string;
}

export function generateStringToIntegerSteps(input: StringToIntegerInput): ExecutionStep[] {
  const { text } = input;
  const tracker = new TransformTracker(text, STRING_TO_INTEGER_LINE_MAP);

  tracker.initialize({ text, charIndex: 0, sign: 1, result: 0 });

  let charIndex = 0;
  const length = text.length;

  // Phase 1: skip leading whitespace
  tracker.setPhase("skip-whitespace", { charIndex, sign: 1, result: 0 });

  while (charIndex < length && text[charIndex] === " ") {
    tracker.readChar(charIndex, { charIndex, phase: "skip-whitespace" });
    charIndex++;
  }

  // Phase 2: read optional sign
  tracker.setPhase("read-sign", { charIndex, sign: 1, result: 0 });

  let sign = 1;
  if (text[charIndex] === "-") {
    tracker.readChar(charIndex, { charIndex, sign: -1, result: 0 });
    sign = -1;
    charIndex++;
  } else if (text[charIndex] === "+") {
    tracker.readChar(charIndex, { charIndex, sign: 1, result: 0 });
    charIndex++;
  }

  // Phase 3: read digits and accumulate
  tracker.setPhase("read-digits", { charIndex, sign, result: 0 });

  let result = 0;
  while (charIndex < length) {
    const charCode = text.charCodeAt(charIndex);
    if (charCode < 48 || charCode > 57) break;

    tracker.readChar(charIndex, { charIndex, sign, result });

    const digit = charCode - 48;
    result = result * 10 + digit;

    // Write the digit into the output buffer
    tracker.writeChar(String(digit), { charIndex, sign, result });

    // Update auxiliary data showing running total
    const currentValue = Math.max(INT32_MIN, Math.min(INT32_MAX, sign * result));
    tracker.setAuxiliaryData(String(currentValue), { charIndex, sign, result, currentValue });

    // Clamp early
    if (sign === 1 && result > INT32_MAX) {
      tracker.complete({ result: INT32_MAX });
      return tracker.getSteps();
    }
    if (sign === -1 && -result < INT32_MIN) {
      tracker.complete({ result: INT32_MIN });
      return tracker.getSteps();
    }

    charIndex++;
  }

  const finalResult = Math.max(INT32_MIN, Math.min(INT32_MAX, sign * result)) || 0;
  tracker.complete({ result: finalResult });
  return tracker.getSteps();
}
