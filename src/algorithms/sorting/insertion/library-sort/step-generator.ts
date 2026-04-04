/** Step generator for Library Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LIBRARY_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LIBRARY_SORT!);

export function generateLibrarySortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], LIBRARY_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  const gapFactor = 2;
  const gappedSize = arrayLength * gapFactor + 1;
  const gappedArray: (number | null)[] = new Array(gappedSize).fill(null);
  let filledCount = 0;

  const centerPosition = Math.floor(gappedSize / 2);
  gappedArray[centerPosition] = workingArray[0]!;
  filledCount = 1;

  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    const currentElement = workingArray[outerIndex]!;

    // Collect sorted filled values and their positions from the gapped array
    const filledValues: number[] = [];
    const filledPositions: number[] = [];
    for (let scanIndex = 0; scanIndex < gappedSize; scanIndex++) {
      if (gappedArray[scanIndex] !== null) {
        filledValues.push(gappedArray[scanIndex]!);
        filledPositions.push(scanIndex);
      }
    }

    // Binary search on filled values to find insertion rank
    let searchLeft = 0;
    let searchRight = filledValues.length - 1;
    let insertRank = filledValues.length;
    while (searchLeft <= searchRight) {
      const midRank = Math.floor((searchLeft + searchRight) / 2);
      tracker.compare(outerIndex, outerIndex - 1, {
        outerIndex,
        currentElement,
        midRank,
        compareValue: filledValues[midRank],
        searchLeft,
        searchRight,
      });
      if (currentElement < filledValues[midRank]!) {
        insertRank = midRank;
        searchRight = midRank - 1;
      } else {
        searchLeft = midRank + 1;
      }
    }

    // Convert rank to gapped array position
    let insertPosition: number;
    if (insertRank === 0) {
      insertPosition = filledPositions[0]!;
    } else if (insertRank >= filledPositions.length) {
      insertPosition = filledPositions[filledPositions.length - 1]! + 1;
    } else {
      insertPosition = filledPositions[insertRank - 1]! + 1;
    }
    if (insertPosition >= gappedSize) insertPosition = gappedSize - 1;

    // Shift phase — find a gap near insertPosition and place currentElement
    let rightSearch = insertPosition;
    while (rightSearch < gappedSize && gappedArray[rightSearch] !== null) rightSearch++;

    if (rightSearch < gappedSize) {
      for (let shiftPos = rightSearch; shiftPos > insertPosition; shiftPos--) {
        gappedArray[shiftPos] = gappedArray[shiftPos - 1]!;
      }
      gappedArray[insertPosition] = currentElement;

      tracker.swap(outerIndex, outerIndex - 1, {
        outerIndex,
        insertPosition,
        currentElement,
        sortedArray: [...workingArray],
      });
    } else {
      let leftSearch = insertPosition - 1;
      while (leftSearch >= 0 && gappedArray[leftSearch] !== null) leftSearch--;
      if (leftSearch >= 0) {
        for (let shiftPos = leftSearch; shiftPos < insertPosition - 1; shiftPos++) {
          gappedArray[shiftPos] = gappedArray[shiftPos + 1]!;
        }
        gappedArray[insertPosition - 1] = currentElement;
      }

      tracker.swap(outerIndex, outerIndex - 1, {
        outerIndex,
        insertPosition,
        currentElement,
        sortedArray: [...workingArray],
      });
    }
    filledCount++;

    // Rebalance phase
    if (filledCount >= Math.floor(gappedSize / 2)) {
      const filled = gappedArray.filter((val) => val !== null) as number[];
      gappedArray.fill(null);
      const spacing = Math.floor(gappedSize / (filled.length + 1));
      for (let rebalanceIndex = 0; rebalanceIndex < filled.length; rebalanceIndex++) {
        gappedArray[(rebalanceIndex + 1) * spacing] = filled[rebalanceIndex]!;
      }

      // Sync workingArray with the rebalanced order for visualization
      const rebalanced = gappedArray.filter((val) => val !== null) as number[];
      for (let syncIndex = 0; syncIndex < rebalanced.length; syncIndex++) {
        workingArray[syncIndex] = rebalanced[syncIndex]!;
        tracker.setElementValue(syncIndex, rebalanced[syncIndex]!);
      }

      tracker.swap(0, outerIndex, {
        outerIndex,
        rebalanced: true,
        sortedArray: [...workingArray],
      });
    } else {
      // Sync workingArray with gapped order for visualization
      const currentFilled = gappedArray.filter((val) => val !== null) as number[];
      for (let syncIndex = 0; syncIndex < currentFilled.length; syncIndex++) {
        workingArray[syncIndex] = currentFilled[syncIndex]!;
        tracker.setElementValue(syncIndex, currentFilled[syncIndex]!);
      }
    }

    tracker.markSorted(outerIndex, {
      outerIndex,
      filledCount,
    });
  }

  const resultArray = gappedArray.filter((val) => val !== null) as number[];
  for (let finalIndex = 0; finalIndex < resultArray.length; finalIndex++) {
    workingArray[finalIndex] = resultArray[finalIndex]!;
    tracker.setElementValue(finalIndex, resultArray[finalIndex]!);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
