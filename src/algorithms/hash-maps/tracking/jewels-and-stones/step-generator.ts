/** Step generator for Jewels and Stones — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const JEWELS_AND_STONES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.JEWELS_AND_STONES!);

export interface JewelsAndStonesInput {
  jewels: string;
  stones: string;
}

export function generateJewelsAndStonesSteps(input: JewelsAndStonesInput): ExecutionStep[] {
  const { jewels, stones } = input;

  const jewelsArray = jewels.split("");
  const stonesArray = stones.split("");

  const tracker = new HashMapTracker(jewelsArray, JEWELS_AND_STONES_LINE_MAP, {
    secondaryInput: stonesArray,
  });

  tracker.initialize({ jewels, stones });
  tracker.setPhase("building");

  const jewelSet = new Set<string>();
  for (let jewelIdx = 0; jewelIdx < jewelsArray.length; jewelIdx++) {
    const jewel = jewelsArray[jewelIdx]!;
    tracker.processElement(jewelIdx, { jewelIdx, jewel });
    jewelSet.add(jewel);
    tracker.insertKey(jewel, "jewel", { jewel });
  }

  tracker.setPhase("counting");
  let count = 0;

  for (let stoneIdx = 0; stoneIdx < stonesArray.length; stoneIdx++) {
    const stone = stonesArray[stoneIdx]!;
    tracker.processSecondaryElement(stoneIdx, { stoneIdx, stone });
    tracker.lookupKey(stone, { stone });

    if (jewelSet.has(stone)) {
      count++;
      tracker.keyFound(stone, stoneIdx, stoneIdx, { stone, count });
      tracker.markSecondaryMatched(stoneIdx, { stone, count });
    } else {
      tracker.keyNotFound(stone, { stone });
    }
  }

  tracker.setResult(count);
  tracker.complete({ result: count });
  return tracker.getSteps();
}
