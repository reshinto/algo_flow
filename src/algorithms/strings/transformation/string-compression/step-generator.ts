/** Step generator for String Compression — produces ExecutionStep[] using TransformTracker. */

import type { ExecutionStep } from "@/types";
import { TransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const STRING_COMPRESSION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.STRING_COMPRESSION!);

export interface StringCompressionInput {
  text: string;
}

/** Compute compressed string independently for the final result variable. */
function compress(text: string): string {
  let result = "";
  let idx = 0;
  while (idx < text.length) {
    const char = text[idx] ?? "";
    let count = 0;
    while (idx < text.length && text[idx] === char) {
      count++;
      idx++;
    }
    result += char + String(count);
  }
  return result;
}

export function generateStringCompressionSteps(input: StringCompressionInput): ExecutionStep[] {
  const { text } = input;
  const tracker = new TransformTracker(text, STRING_COMPRESSION_LINE_MAP);

  tracker.initialize({ text, charIndex: 0, compressed: "" });

  if (text.length === 0) {
    tracker.complete({ result: text });
    return tracker.getSteps();
  }

  let charIndex = 0;
  let writeIndex = -1;

  while (charIndex < text.length) {
    const currentChar = text[charIndex] ?? "";
    const runStart = charIndex;

    // Read the current character to begin a new run
    tracker.readChar(charIndex, { charIndex, currentChar, count: 0 });

    let count = 0;

    // Count all consecutive identical characters in this run
    while (charIndex < text.length && text[charIndex] === currentChar) {
      count++;
      charIndex++;
    }

    // Highlight the full run as converted in the input buffer
    tracker.markConverted(runStart, charIndex - 1, { charIndex, currentChar, count });

    // Emit the character to the output buffer
    tracker.writeChar(currentChar, { charIndex, currentChar, count });
    writeIndex++;

    // Emit the count digit(s) to the output buffer
    for (const digit of String(count)) {
      tracker.writeChar(digit, { charIndex, currentChar, count });
      writeIndex++;
    }

    // Advance read and write pointers to their new positions
    tracker.advancePointers(charIndex, writeIndex, { charIndex, currentChar, count });
  }

  const compressed = compress(text);
  const finalResult = compressed.length < text.length ? compressed : text;
  tracker.complete({ result: finalResult });
  return tracker.getSteps();
}
