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
    let searchLeft = 0;
    let searchRight = gappedSize - 1;
    let insertPosition = centerPosition;

    // Binary search phase among filled slots
    while (searchLeft <= searchRight) {
      const midPosition = Math.floor((searchLeft + searchRight) / 2);
      const midValue = gappedArray[midPosition];

      // Use the first non-null value nearby as the comparison element
      let compareValue: number | null = midValue ?? null;
      let scanPos = midPosition;
      if (compareValue === null) {
        let leftScan = midPosition - 1;
        while (leftScan >= searchLeft && gappedArray[leftScan] === null) leftScan--;
        if (leftScan >= searchLeft && gappedArray[leftScan] !== null) {
          compareValue = gappedArray[leftScan]!;
          scanPos = leftScan;
        }
      }

      if (compareValue === null) {
        searchLeft = midPosition + 1;
        continue;
      }

      // Emit a compare step using the working array indices (map to nearest filled)
      // For visualization, compare currentElement against position outerIndex-1 (last sorted)
      tracker.compare(outerIndex, outerIndex - 1, {
        outerIndex,
        currentElement,
        searchLeft,
        searchRight,
        midPosition: scanPos,
        compareValue,
      });

      if (currentElement < compareValue) {
        searchRight = scanPos - 1;
        insertPosition = scanPos;
      } else {
        searchLeft = midPosition + 1;
        insertPosition = midPosition;
      }
    }

    // Shift phase — open a gap at insertPosition
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
      let leftSearch = insertPosition;
      while (leftSearch >= 0 && gappedArray[leftSearch] !== null) leftSearch--;
      for (let shiftPos = leftSearch; shiftPos < insertPosition; shiftPos++) {
        gappedArray[shiftPos] = gappedArray[shiftPos + 1]!;
      }
      gappedArray[insertPosition - 1 >= 0 ? insertPosition - 1 : 0] = currentElement;

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
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
