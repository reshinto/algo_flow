/** Step generator for Spread Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SPREAD_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SPREAD_SORT!);

export function generateSpreadSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], SPREAD_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const minValue = Math.min(...workingArray);
  const maxValue = Math.max(...workingArray);
  const binCount = Math.max(2, Math.ceil(Math.sqrt(arrayLength)));
  const valueRange = maxValue - minValue + 1;

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue,
    maxValue,
    binCount,
  });

  if (minValue === maxValue) {
    for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
      tracker.markSorted(sortedIndex, { sortedIndex, value: workingArray[sortedIndex] });
    }
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  const bins: number[][] = Array.from({ length: binCount }, () => []);

  // Distribute phase
  for (let distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
    const normalizedOffset = workingArray[distributeIndex]! - minValue;
    const binIndex = Math.min(Math.floor((normalizedOffset / valueRange) * binCount), binCount - 1);
    bins[binIndex]!.push(workingArray[distributeIndex]!);
    tracker.compare(
      distributeIndex,
      distributeIndex,
      {
        distributeIndex,
        value: workingArray[distributeIndex],
        binIndex,
        binSizes: bins.map((bin) => bin.length),
      },
      `Distributing value ${String(workingArray[distributeIndex]!)} into bin ${String(binIndex)}`,
    );
  }

  // Sort each bin and collect
  let writeIndex = 0;
  for (let binIndex = 0; binIndex < binCount; binIndex++) {
    const bin = bins[binIndex]!;
    if (bin.length === 0) continue;

    // Insertion sort within the bin
    for (let outerIndex = 1; outerIndex < bin.length; outerIndex++) {
      const currentValue = bin[outerIndex]!;
      let insertPosition = outerIndex - 1;

      while (insertPosition >= 0 && bin[insertPosition]! > currentValue) {
        tracker.compare(
          writeIndex + outerIndex,
          writeIndex + insertPosition,
          {
            binIndex,
            outerIndex,
            insertPosition,
            comparing: bin[insertPosition],
            currentValue,
          },
          `Bin ${String(binIndex)}: ${String(bin[insertPosition]!)} > ${String(currentValue)}, shifting right`,
        );
        bin[insertPosition + 1] = bin[insertPosition]!;
        tracker.swap(
          writeIndex + outerIndex,
          writeIndex + insertPosition,
          { binIndex, insertPosition, currentValue, binContents: [...bin] },
          `Shifting ${String(bin[insertPosition + 1]!)} right in bin ${String(binIndex)}`,
        );
        insertPosition--;
      }
      bin[insertPosition + 1] = currentValue;
    }

    // Write sorted bin back
    for (const binValue of bin) {
      const targetIndex = writeIndex;
      workingArray[writeIndex] = binValue;
      writeIndex++;
      tracker.markSorted(targetIndex, {
        binIndex,
        binValue,
        targetIndex,
        sortedArray: [...workingArray],
      });
    }
  }

  // Sync tracker elements with final sorted workingArray before completing
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
