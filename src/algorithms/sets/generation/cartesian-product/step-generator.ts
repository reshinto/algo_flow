/** Step generator for Cartesian Product — produces ExecutionStep[] using SetGenerationTracker. */

import type { ExecutionStep } from "@/types";
import { SetGenerationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CARTESIAN_PRODUCT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CARTESIAN_PRODUCT!);

export interface CartesianProductInput {
  setA: number[];
  setB: number[];
}

export function generateCartesianProductSteps(input: CartesianProductInput): ExecutionStep[] {
  const { setA, setB } = input;
  const allElements = [...setA, ...setB];
  const tracker = new SetGenerationTracker(allElements, CARTESIAN_PRODUCT_LINE_MAP);

  tracker.initialize({ setA, setB });
  tracker.startGeneration({ totalPairs: setA.length * setB.length });

  for (let idxA = 0; idxA < setA.length; idxA++) {
    for (let idxB = 0; idxB < setB.length; idxB++) {
      tracker.generatePair(setA[idxA]!, setB[idxB]!, { idxA, idxB });
    }
  }

  tracker.complete({ totalGenerated: setA.length * setB.length });
  return tracker.getSteps();
}
