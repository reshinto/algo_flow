/** Step generator for Reorganize String — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REORGANIZE_STRING!);

export interface ReorganizeStringInput {
  text: string;
}

function siftUpMaxHeap(heap: [number, string][], currentIdx: number, tracker: HeapTracker): void {
  tracker.startSiftUp(currentIdx, { currentIdx, frequency: heap[currentIdx]?.[0] });

  while (currentIdx > 0) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    tracker.compare(parentIdx, currentIdx, {
      parentFrequency: heap[parentIdx]?.[0],
      currentFrequency: heap[currentIdx]?.[0],
    });

    if ((heap[parentIdx]?.[0] ?? -Infinity) >= (heap[currentIdx]?.[0] ?? -Infinity)) {
      tracker.markSettled(currentIdx, { currentIdx, frequency: heap[currentIdx]?.[0] });
      break;
    }

    tracker.heapSwap(parentIdx, currentIdx, { idxA: parentIdx, idxB: currentIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[currentIdx]!;
    heap[currentIdx] = swapTemp;
    currentIdx = parentIdx;
  }

  if (currentIdx === 0) {
    tracker.markSettled(0, { currentIdx: 0, frequency: heap[0]?.[0] });
  }
}

function siftDownMaxHeap(heap: [number, string][], tracker: HeapTracker): void {
  let parentIdx = 0;
  tracker.startSiftDown(parentIdx, { parentIdx, frequency: heap[parentIdx]?.[0] });

  while (true) {
    let largestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heap.length) {
      tracker.compare(parentIdx, leftIdx, {
        parentFrequency: heap[parentIdx]?.[0],
        leftFrequency: heap[leftIdx]?.[0],
      });
      if ((heap[leftIdx]?.[0] ?? -Infinity) > (heap[largestIdx]?.[0] ?? -Infinity)) {
        largestIdx = leftIdx;
      }
    }

    if (rightIdx < heap.length) {
      tracker.compare(largestIdx, rightIdx, {
        largestFrequency: heap[largestIdx]?.[0],
        rightFrequency: heap[rightIdx]?.[0],
      });
      if ((heap[rightIdx]?.[0] ?? -Infinity) > (heap[largestIdx]?.[0] ?? -Infinity)) {
        largestIdx = rightIdx;
      }
    }

    if (largestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { parentIdx, frequency: heap[parentIdx]?.[0] });
      break;
    }

    tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[largestIdx]!;
    heap[largestIdx] = swapTemp;
    parentIdx = largestIdx;
  }
}

export function generateReorganizeStringSteps(input: ReorganizeStringInput): ExecutionStep[] {
  const { text } = input;

  // Count character frequencies
  const frequencyMap: Record<string, number> = {};
  for (const character of text) {
    frequencyMap[character] = (frequencyMap[character] ?? 0) + 1;
  }

  // Build initial heap from frequency entries
  const heap: [number, string][] = Object.entries(frequencyMap).map(([character, frequency]) => [
    frequency,
    character,
  ]);

  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  tracker.initialize({
    text,
    frequencies: { ...frequencyMap },
    uniqueChars: Object.keys(frequencyMap).length,
  });

  // Insert all initial characters into the heap (tracker-visible inserts)
  for (const [frequency, character] of heap) {
    tracker.addNode(frequency, { character, frequency });
  }

  // Heapify the heap (build max-heap via sift-down)
  for (let startIdx = Math.floor(heap.length / 2) - 1; startIdx >= 0; startIdx--) {
    let parentIdx = startIdx;
    tracker.startSiftDown(parentIdx, { parentIdx, frequency: heap[parentIdx]?.[0] });

    while (true) {
      let largestIdx = parentIdx;
      const leftIdx = 2 * parentIdx + 1;
      const rightIdx = 2 * parentIdx + 2;

      if (leftIdx < heap.length) {
        tracker.compare(parentIdx, leftIdx, {
          parentFrequency: heap[parentIdx]?.[0],
          leftFrequency: heap[leftIdx]?.[0],
        });
        if ((heap[leftIdx]?.[0] ?? -Infinity) > (heap[largestIdx]?.[0] ?? -Infinity)) {
          largestIdx = leftIdx;
        }
      }

      if (rightIdx < heap.length) {
        tracker.compare(largestIdx, rightIdx, {
          largestFrequency: heap[largestIdx]?.[0],
          rightFrequency: heap[rightIdx]?.[0],
        });
        if ((heap[rightIdx]?.[0] ?? -Infinity) > (heap[largestIdx]?.[0] ?? -Infinity)) {
          largestIdx = rightIdx;
        }
      }

      if (largestIdx === parentIdx) {
        tracker.markSettled(parentIdx, { parentIdx, frequency: heap[parentIdx]?.[0] });
        break;
      }

      tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
      const swapTemp = heap[parentIdx]!;
      heap[parentIdx] = heap[largestIdx]!;
      heap[largestIdx] = swapTemp;
      parentIdx = largestIdx;
    }
  }

  let result = "";
  let prevEntry: [number, string] | null = null;

  while (heap.length > 0) {
    // Extract most frequent
    tracker.markExtracted(0, { extractingChar: heap[0]?.[1], frequency: heap[0]?.[0] });
    const topEntry = heap[0]!;
    const lastIdx = heap.length - 1;

    tracker.heapSwap(0, lastIdx, { idxA: 0, idxB: lastIdx });
    const swapTmp = heap[0]!;
    heap[0] = heap[lastIdx]!;
    heap[lastIdx] = swapTmp;

    tracker.removeNode({ extractedValue: topEntry[0], removedFromIdx: lastIdx });
    heap.pop();

    result += topEntry[1];
    topEntry[0] -= 1;

    if (heap.length > 0) {
      siftDownMaxHeap(heap, tracker);
    }

    // Reinsert previous entry if still has frequency
    if (prevEntry !== null && prevEntry[0] > 0) {
      heap.push(prevEntry);
      tracker.addNode(prevEntry[0], { character: prevEntry[1], frequency: prevEntry[0] });
      siftUpMaxHeap(heap, heap.length - 1, tracker);
    }

    // Hold current for next round
    prevEntry = topEntry[0] > 0 ? topEntry : null;

    tracker.markHighlighted(0, {
      resultSoFar: result,
      prevChar: prevEntry?.[1] ?? null,
      prevFrequency: prevEntry?.[0] ?? 0,
    });

    // Impossible: same character would be adjacent
    if (heap.length === 0 && prevEntry !== null) {
      tracker.complete({ result: "", impossible: true, text });
      return tracker.getSteps();
    }
  }

  tracker.complete({ result, length: result.length, text });

  return tracker.getSteps();
}
