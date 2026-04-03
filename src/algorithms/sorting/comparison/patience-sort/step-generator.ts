/** Step generator for Patience Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PATIENCE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PATIENCE_SORT!);

function findPileIndex(pileTops: number[], cardValue: number): number {
  let leftBound = 0;
  let rightBound = pileTops.length;

  while (leftBound < rightBound) {
    const midIndex = Math.floor((leftBound + rightBound) / 2);
    if (pileTops[midIndex]! < cardValue) {
      leftBound = midIndex + 1;
    } else {
      rightBound = midIndex;
    }
  }

  return leftBound;
}

export function generatePatienceSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], PATIENCE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  // Phase 1: Place cards into piles
  const piles: number[][] = [];
  const pileTops: number[] = [];

  for (let cardIndex = 0; cardIndex < arrayLength; cardIndex++) {
    const cardValue = workingArray[cardIndex]!;

    // Compare with pile tops using binary search
    if (pileTops.length > 0) {
      const targetIndex = findPileIndex(pileTops, cardValue);
      // Show comparison with the target pile top (or last pile top)
      const compareIndex = Math.min(targetIndex, pileTops.length - 1);
      tracker.compare(cardIndex, Math.min(compareIndex, arrayLength - 1), {
        cardValue,
        cardIndex,
        pileCount: piles.length,
        phase: "place-card",
      });
    }

    const targetPileIndex = findPileIndex(pileTops, cardValue);

    if (targetPileIndex === piles.length) {
      piles.push([cardValue]);
      pileTops.push(cardValue);
    } else {
      piles[targetPileIndex]!.push(cardValue);
      pileTops[targetPileIndex] = cardValue;
    }
  }

  // Phase 2: Merge piles — k-way merge
  // Piles are descending (bottom = max, top = min) — copy as-is so pop() gives the minimum
  const activePiles: number[][] = piles.map((pile) => [...pile]);
  let outputIndex = 0;

  while (outputIndex < arrayLength) {
    let minimumValue = Number.POSITIVE_INFINITY;
    let minimumPileIndex = 0;

    for (let pileIndex = 0; pileIndex < activePiles.length; pileIndex++) {
      const pile = activePiles[pileIndex]!;
      if (pile.length > 0) {
        const pileTop = pile[pile.length - 1]!;

        tracker.compare(
          Math.min(pileIndex, arrayLength - 1),
          Math.min(minimumPileIndex, arrayLength - 1),
          {
            pileTop,
            minimumValue,
            pileIndex,
            phase: "merge-piles",
          },
        );

        if (pileTop < minimumValue) {
          minimumValue = pileTop;
          minimumPileIndex = pileIndex;
        }
      }
    }

    const winnerValue = activePiles[minimumPileIndex]!.pop()!;
    workingArray[outputIndex] = winnerValue;

    tracker.swap(Math.min(minimumPileIndex, arrayLength - 1), outputIndex, {
      winnerValue,
      outputIndex,
      phase: "merge-piles",
    });
    tracker.markSorted(outputIndex, {
      outputIndex,
      value: winnerValue,
    });

    // Remove empty piles
    for (let pileIndex = activePiles.length - 1; pileIndex >= 0; pileIndex--) {
      if (activePiles[pileIndex]!.length === 0) {
        activePiles.splice(pileIndex, 1);
      }
    }

    outputIndex++;
  }

  // Sync tracker elements with final sorted workingArray before completing
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
