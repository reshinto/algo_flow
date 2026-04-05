/** Step generator for Run-Length Decoding — produces ExecutionStep[] using TransformTracker. */

import type { ExecutionStep } from "@/types";
import { TransformTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";
import { runLengthDecoding } from "./sources/run-length-decoding.ts?fn";

const RUN_LENGTH_DECODING_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RUN_LENGTH_DECODING!);

export interface RunLengthDecodingInput {
  text: string;
}

export function generateRunLengthDecodingSteps(input: RunLengthDecodingInput): ExecutionStep[] {
  const { text } = input;
  const tracker = new TransformTracker(text, RUN_LENGTH_DECODING_LINE_MAP);

  tracker.initialize({ text, readIndex: 0 });

  let readIndex = 0;

  while (readIndex < text.length) {
    // Accumulate consecutive digit characters to form the repeat count
    const digitStartIndex = readIndex;
    let digitString = "";

    while (readIndex < text.length && text[readIndex]! >= "0" && text[readIndex]! <= "9") {
      tracker.readChar(readIndex, {
        readIndex,
        digitString: digitString + (text[readIndex] ?? ""),
      });
      digitString += text[readIndex]!;
      readIndex++;
    }

    // Guard: skip if no digits found or pointer has reached the end
    if (digitString === "" || readIndex >= text.length) {
      readIndex++;
      continue;
    }

    const repeatCount = parseInt(digitString, 10);

    // Display the parsed count before reading the letter
    tracker.setAuxiliaryData(`count=${repeatCount}`, {
      readIndex,
      digitStartIndex,
      repeatCount,
    });

    // Read the letter character that follows the digit sequence
    const letter = text[readIndex] ?? "";
    tracker.readChar(readIndex, { readIndex, letter, repeatCount });

    // Append the letter repeated `repeatCount` times to the output buffer
    const repeated = letter.repeat(repeatCount);
    tracker.appendOutput(repeated, {
      readIndex,
      letter,
      repeatCount,
      appended: repeated,
    });

    // Advance past the letter and update pointers
    readIndex++;
    tracker.advancePointers(readIndex, readIndex - 1, { readIndex });
  }

  const result = runLengthDecoding(text) as string;
  tracker.complete({ result });
  return tracker.getSteps();
}
