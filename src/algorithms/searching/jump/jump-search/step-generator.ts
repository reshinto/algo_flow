/** Step generator for Jump Search — produces ExecutionStep[] using SearchingTracker. */

import type { ExecutionStep } from "@/types";
import { SearchingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.JUMP_SEARCH!);

export function generateJumpSearchSteps(input: {
  sortedArray: number[];
  targetValue: number;
}): ExecutionStep[] {
  const workingArray = [...input.sortedArray];
  const { targetValue } = input;
  const tracker = new SearchingTracker(workingArray, targetValue, LINE_MAP, "jump search");

  const arrayLength = workingArray.length;

  tracker.initialize({
    sortedArray: workingArray,
    targetValue,
    arrayLength,
    blockSize: arrayLength === 0 ? 0 : Math.floor(Math.sqrt(arrayLength)),
  });

  if (arrayLength === 0) {
    tracker.complete({ resultIndex: -1, targetValue }, false);
    return tracker.getSteps();
  }

  const blockSize = Math.floor(Math.sqrt(arrayLength));
  let blockStart = 0;
  let jumpEnd = blockSize;

  // Jump phase — move forward by blockSize while the block end is less than target
  while (jumpEnd < arrayLength && workingArray[jumpEnd - 1]! < targetValue) {
    const previousBlock = blockStart;
    blockStart = jumpEnd;
    jumpEnd += blockSize;

    tracker.visit(
      blockStart - 1,
      { blockStart, jumpEnd: Math.min(jumpEnd, arrayLength) - 1 },
      {
        blockStart,
        jumpEnd: Math.min(jumpEnd, arrayLength),
        blockSize,
        targetValue,
        checkedValue: workingArray[blockStart - 1]!,
      },
    );

    // Mark the jumped-over block as eliminated
    tracker.eliminate(
      previousBlock,
      blockStart - 1,
      { blockStart, jumpEnd: Math.min(jumpEnd, arrayLength) - 1 },
      { blockStart, jumpEnd: Math.min(jumpEnd, arrayLength), blockSize, targetValue },
      `Block [${previousBlock}–${blockStart - 1}] does not contain ${targetValue}, jump forward`,
    );
  }

  // Linear scan phase within the identified block
  const scanEnd = Math.min(jumpEnd, arrayLength);
  let foundIndex = -1;
  let foundTarget = false;

  for (let currentIndex = blockStart; currentIndex < scanEnd; currentIndex++) {
    const currentValue = workingArray[currentIndex]!;

    tracker.compare(
      currentIndex,
      { current: currentIndex },
      { currentIndex, currentValue, targetValue, blockStart, scanEnd },
      `Compare element ${currentValue} at index ${currentIndex} with target ${targetValue}`,
    );

    if (currentValue === targetValue) {
      foundIndex = currentIndex;
      foundTarget = true;
      tracker.found(currentIndex, { resultIndex: currentIndex, currentValue, targetValue });
      break;
    }
  }

  tracker.complete({ resultIndex: foundIndex, targetValue }, foundTarget);
  return tracker.getSteps();
}
