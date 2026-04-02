/** Step generator for Greedy Set Cover — produces ExecutionStep[] using SetCoverTracker. */

import type { ExecutionStep } from "@/types";
import { SetCoverTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SET_COVER_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SET_COVER!);

export interface SetCoverInput {
  universe: number[];
  sets: number[][];
}

export function generateSetCoverSteps(input: SetCoverInput): ExecutionStep[] {
  const { universe, sets } = input;
  const tracker = new SetCoverTracker(universe, sets, SET_COVER_LINE_MAP);

  tracker.initialize({ universe, sets });

  const uncovered = new Set(universe);
  const chosenSets: number[][] = [];

  while (uncovered.size > 0) {
    let bestSetIdx = -1;
    let bestCoverage = 0;

    for (let setIdx = 0; setIdx < sets.length; setIdx++) {
      const candidateSet = sets[setIdx]!;
      const coverage = candidateSet.filter((elem) => uncovered.has(elem)).length;
      tracker.evaluateSet(setIdx, coverage, { setIdx, coverage, uncoveredCount: uncovered.size });

      if (coverage > bestCoverage) {
        bestCoverage = coverage;
        bestSetIdx = setIdx;
      }
    }

    if (bestSetIdx === -1) break;

    const chosenSet = sets[bestSetIdx]!;
    const newlyCovered = chosenSet.filter((elem) => uncovered.has(elem));
    tracker.selectSet(bestSetIdx, chosenSet, { bestSetIdx, bestCoverage });

    chosenSets.push(chosenSet);
    for (const elem of newlyCovered) uncovered.delete(elem);

    tracker.coverElements(newlyCovered, {
      newlyCovered,
      remainingUncovered: uncovered.size,
    });
  }

  tracker.complete({ selectedCount: chosenSets.length });

  return tracker.getSteps();
}
