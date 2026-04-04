/** Step generator for Bead Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BEAD_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BEAD_SORT!);

export function generateBeadSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], BEAD_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  if (arrayLength === 0) {
    tracker.initialize({ sortedArray: [], arrayLength: 0 });
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const minValue = Math.min(...workingArray);
  const offset = minValue < 0 ? -minValue : 0;
  const shiftedArray = workingArray.map((value) => value + offset);
  const maxValue = Math.max(...shiftedArray);

  tracker.initialize({
    sortedArray: [...workingArray],
    arrayLength,
    minValue,
    maxValue: maxValue - offset,
    offset,
    totalBeads: shiftedArray.reduce((sum, value) => sum + value, 0),
  });

  if (arrayLength === 1 || maxValue === 0) {
    for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
      tracker.markSorted(sortedIndex, { sortedIndex, value: workingArray[sortedIndex] });
    }
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  // Build bead grid
  const grid: number[][] = Array.from({ length: arrayLength }, (_, rowIndex) =>
    Array.from({ length: maxValue }, (__, colIndex) =>
      colIndex < shiftedArray[rowIndex]! ? 1 : 0,
    ),
  );

  // Gravity drop — simulate beads falling column by column
  for (let colIndex = 0; colIndex < maxValue; colIndex++) {
    let beadCount = 0;

    // Count beads in this column (and clear them)
    for (let rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
      beadCount += grid[rowIndex]![colIndex]!;
      grid[rowIndex]![colIndex] = 0;
    }

    // Drop beads — stack them at the bottom
    for (let rowIndex = arrayLength - beadCount; rowIndex < arrayLength; rowIndex++) {
      grid[rowIndex]![colIndex] = 1;
    }

    // Use compare() to show the column gravity drop (scanning the column)
    tracker.compare(
      Math.max(0, arrayLength - beadCount),
      Math.min(arrayLength - 1, arrayLength - beadCount + Math.max(0, beadCount - 1)),
      {
        colIndex,
        beadCount,
        columnsProcessed: colIndex + 1,
        columnsRemaining: maxValue - colIndex - 1,
        gridSnapshot: grid.map((row) => row.reduce((sum, bead) => sum + bead, 0)),
      },
      `Column ${String(colIndex + 1)}/${String(maxValue)}: ${String(beadCount)} beads fall to bottom ${String(beadCount)} rows`,
    );

    // Use swap() for each bead placement (gravity effect on individual beads)
    for (let dropRow = arrayLength - beadCount; dropRow < arrayLength; dropRow++) {
      tracker.swap(
        dropRow,
        Math.max(0, dropRow - (arrayLength - beadCount)),
        {
          colIndex,
          dropRow,
          beadCount,
          gridRow: [...(grid[dropRow] ?? [])],
        },
        `Gravity: bead in column ${String(colIndex + 1)} settles at row ${String(dropRow + 1)}`,
      );
    }
  }

  // Read sorted values from grid bead counts
  for (let rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
    const rowBeadCount = (grid[rowIndex] ?? []).reduce((sum, bead) => sum + bead, 0);
    workingArray[rowIndex] = rowBeadCount - offset;
  }

  // Sync tracker elements with final sorted workingArray, then mark sorted
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  for (let rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
    tracker.markSorted(rowIndex, {
      rowIndex,
      value: workingArray[rowIndex],
      sortedArray: [...workingArray],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
