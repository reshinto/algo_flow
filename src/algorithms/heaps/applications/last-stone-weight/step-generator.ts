/** Step generator for Last Stone Weight — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LAST_STONE_WEIGHT!);

export interface LastStoneWeightInput {
  array: number[];
}

export function generateLastStoneWeightSteps(input: LastStoneWeightInput): ExecutionStep[] {
  const { array } = input;
  const stones = [...array];
  const tracker = new HeapTracker(stones, HEAP_LINE_MAP);

  tracker.initialize({ stones: [...stones], count: stones.length });

  // Build max-heap using Floyd's algorithm (sift-down from last non-leaf)
  for (let startIdx = Math.floor(stones.length / 2) - 1; startIdx >= 0; startIdx--) {
    let parentIdx = startIdx;
    tracker.startSiftDown(parentIdx, { parentIdx, value: stones[parentIdx] });

    while (true) {
      let largestIdx = parentIdx;
      const leftIdx = 2 * parentIdx + 1;
      const rightIdx = 2 * parentIdx + 2;

      if (leftIdx < stones.length) {
        tracker.compare(parentIdx, leftIdx, {
          parent: stones[parentIdx],
          left: stones[leftIdx],
        });
        if ((stones[leftIdx] ?? -Infinity) > (stones[largestIdx] ?? -Infinity)) {
          largestIdx = leftIdx;
        }
      }

      if (rightIdx < stones.length) {
        tracker.compare(largestIdx, rightIdx, {
          largest: stones[largestIdx],
          right: stones[rightIdx],
        });
        if ((stones[rightIdx] ?? -Infinity) > (stones[largestIdx] ?? -Infinity)) {
          largestIdx = rightIdx;
        }
      }

      if (largestIdx === parentIdx) {
        tracker.markSettled(parentIdx, { parentIdx, value: stones[parentIdx] });
        break;
      }

      tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
      const swapTemp = stones[parentIdx]!;
      stones[parentIdx] = stones[largestIdx]!;
      stones[largestIdx] = swapTemp;
      parentIdx = largestIdx;
    }
  }

  // Smash loop
  while (stones.length >= 2) {
    // Extract heaviest (root)
    tracker.markExtracted(0, { extractingValue: stones[0], label: "heaviest" });
    const heaviest = stones[0]!;
    const lastHeavyIdx = stones.length - 1;
    tracker.heapSwap(0, lastHeavyIdx, { idxA: 0, idxB: lastHeavyIdx });
    const swapTmp1 = stones[0]!;
    stones[0] = stones[lastHeavyIdx]!;
    stones[lastHeavyIdx] = swapTmp1;
    tracker.removeNode({ extractedValue: heaviest, removedFromIdx: lastHeavyIdx });
    stones.pop();

    // Sift down after first extraction
    if (stones.length > 0) {
      let parentIdx = 0;
      tracker.startSiftDown(parentIdx, { parentIdx, value: stones[parentIdx] });

      while (true) {
        let largestIdx = parentIdx;
        const leftIdx = 2 * parentIdx + 1;
        const rightIdx = 2 * parentIdx + 2;

        if (leftIdx < stones.length) {
          tracker.compare(parentIdx, leftIdx, {
            parent: stones[parentIdx],
            left: stones[leftIdx],
          });
          if ((stones[leftIdx] ?? -Infinity) > (stones[largestIdx] ?? -Infinity)) {
            largestIdx = leftIdx;
          }
        }

        if (rightIdx < stones.length) {
          tracker.compare(largestIdx, rightIdx, {
            largest: stones[largestIdx],
            right: stones[rightIdx],
          });
          if ((stones[rightIdx] ?? -Infinity) > (stones[largestIdx] ?? -Infinity)) {
            largestIdx = rightIdx;
          }
        }

        if (largestIdx === parentIdx) {
          tracker.markSettled(parentIdx, { parentIdx, value: stones[parentIdx] });
          break;
        }

        tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
        const swapTemp = stones[parentIdx]!;
        stones[parentIdx] = stones[largestIdx]!;
        stones[largestIdx] = swapTemp;
        parentIdx = largestIdx;
      }
    }

    if (stones.length < 1) break;

    // Extract second heaviest (new root)
    tracker.markExtracted(0, { extractingValue: stones[0], label: "secondHeaviest" });
    const secondHeaviest = stones[0]!;
    const lastSecondIdx = stones.length - 1;
    tracker.heapSwap(0, lastSecondIdx, { idxA: 0, idxB: lastSecondIdx });
    const swapTmp2 = stones[0]!;
    stones[0] = stones[lastSecondIdx]!;
    stones[lastSecondIdx] = swapTmp2;
    tracker.removeNode({ extractedValue: secondHeaviest, removedFromIdx: lastSecondIdx });
    stones.pop();

    // Sift down after second extraction
    if (stones.length > 0) {
      let parentIdx = 0;
      tracker.startSiftDown(parentIdx, { parentIdx, value: stones[parentIdx] });

      while (true) {
        let largestIdx = parentIdx;
        const leftIdx = 2 * parentIdx + 1;
        const rightIdx = 2 * parentIdx + 2;

        if (leftIdx < stones.length) {
          tracker.compare(parentIdx, leftIdx, {
            parent: stones[parentIdx],
            left: stones[leftIdx],
          });
          if ((stones[leftIdx] ?? -Infinity) > (stones[largestIdx] ?? -Infinity)) {
            largestIdx = leftIdx;
          }
        }

        if (rightIdx < stones.length) {
          tracker.compare(largestIdx, rightIdx, {
            largest: stones[largestIdx],
            right: stones[rightIdx],
          });
          if ((stones[rightIdx] ?? -Infinity) > (stones[largestIdx] ?? -Infinity)) {
            largestIdx = rightIdx;
          }
        }

        if (largestIdx === parentIdx) {
          tracker.markSettled(parentIdx, { parentIdx, value: stones[parentIdx] });
          break;
        }

        tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
        const swapTemp = stones[parentIdx]!;
        stones[parentIdx] = stones[largestIdx]!;
        stones[largestIdx] = swapTemp;
        parentIdx = largestIdx;
      }
    }

    // Smash and optionally reinsert
    tracker.compare(0, 0, { heaviest, secondHeaviest, action: "smash-compare" });

    if (heaviest !== secondHeaviest) {
      const difference = heaviest - secondHeaviest;
      stones.push(difference);
      tracker.addNode(difference, { difference, heaviest, secondHeaviest });

      // Sift up the new node
      let currentIdx = stones.length - 1;
      tracker.startSiftUp(currentIdx, { currentIdx, value: difference });

      while (currentIdx > 0) {
        const parentIdx = Math.floor((currentIdx - 1) / 2);
        tracker.compare(parentIdx, currentIdx, {
          parent: stones[parentIdx],
          current: stones[currentIdx],
        });

        if ((stones[parentIdx] ?? -Infinity) >= (stones[currentIdx] ?? -Infinity)) {
          tracker.markSettled(currentIdx, { currentIdx, value: stones[currentIdx] });
          break;
        }

        tracker.heapSwap(parentIdx, currentIdx, { idxA: parentIdx, idxB: currentIdx });
        const swapTemp = stones[parentIdx]!;
        stones[parentIdx] = stones[currentIdx]!;
        stones[currentIdx] = swapTemp;
        currentIdx = parentIdx;
      }

      if (currentIdx === 0) {
        tracker.markSettled(0, { currentIdx: 0, value: stones[0] });
      }
    }
  }

  const finalResult = stones.length === 0 ? 0 : stones[0]!;
  tracker.complete({ result: finalResult, stonesRemaining: stones.length });

  return tracker.getSteps();
}
