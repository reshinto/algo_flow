/** Step generator for Task Scheduler Heap — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TASK_SCHEDULER_HEAP!);

export interface TaskSchedulerHeapInput {
  tasks: string[];
  cooldown: number;
}

function siftDownMaxHeap(heap: number[], tracker: HeapTracker): void {
  let parentIdx = 0;
  tracker.startSiftDown(parentIdx, { parentIdx, frequency: heap[parentIdx] });

  while (true) {
    let largestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heap.length) {
      tracker.compare(parentIdx, leftIdx, {
        parentFrequency: heap[parentIdx],
        leftFrequency: heap[leftIdx],
      });
      if ((heap[leftIdx] ?? -Infinity) > (heap[largestIdx] ?? -Infinity)) {
        largestIdx = leftIdx;
      }
    }

    if (rightIdx < heap.length) {
      tracker.compare(largestIdx, rightIdx, {
        largestFrequency: heap[largestIdx],
        rightFrequency: heap[rightIdx],
      });
      if ((heap[rightIdx] ?? -Infinity) > (heap[largestIdx] ?? -Infinity)) {
        largestIdx = rightIdx;
      }
    }

    if (largestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { parentIdx, frequency: heap[parentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[largestIdx]!;
    heap[largestIdx] = swapTemp;
    parentIdx = largestIdx;
  }
}

function siftUpMaxHeap(heap: number[], currentIdx: number, tracker: HeapTracker): void {
  tracker.startSiftUp(currentIdx, { currentIdx, frequency: heap[currentIdx] });

  while (currentIdx > 0) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    tracker.compare(parentIdx, currentIdx, {
      parentFrequency: heap[parentIdx],
      currentFrequency: heap[currentIdx],
    });

    if ((heap[parentIdx] ?? -Infinity) >= (heap[currentIdx] ?? -Infinity)) {
      tracker.markSettled(currentIdx, { currentIdx, frequency: heap[currentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, currentIdx, { idxA: parentIdx, idxB: currentIdx });
    const swapTemp = heap[parentIdx]!;
    heap[parentIdx] = heap[currentIdx]!;
    heap[currentIdx] = swapTemp;
    currentIdx = parentIdx;
  }

  if (currentIdx === 0) {
    tracker.markSettled(0, { currentIdx: 0, frequency: heap[0] });
  }
}

export function generateTaskSchedulerHeapSteps(input: TaskSchedulerHeapInput): ExecutionStep[] {
  const { tasks, cooldown } = input;

  // Count task frequencies
  const frequencyMap: Record<string, number> = {};
  for (const taskName of tasks) {
    frequencyMap[taskName] = (frequencyMap[taskName] ?? 0) + 1;
  }

  const heap: number[] = Object.values(frequencyMap);
  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  tracker.initialize({
    tasks: [...tasks],
    cooldown,
    frequencies: { ...frequencyMap },
    uniqueTasks: Object.keys(frequencyMap).length,
  });

  // Track inserts before heapify
  for (const frequency of heap) {
    tracker.addNode(frequency, { frequency });
  }

  // Heapify via sift-down
  for (let startIdx = Math.floor(heap.length / 2) - 1; startIdx >= 0; startIdx--) {
    let parentIdx = startIdx;
    tracker.startSiftDown(parentIdx, { parentIdx, frequency: heap[parentIdx] });

    while (true) {
      let largestIdx = parentIdx;
      const leftIdx = 2 * parentIdx + 1;
      const rightIdx = 2 * parentIdx + 2;

      if (leftIdx < heap.length) {
        tracker.compare(parentIdx, leftIdx, {
          parentFrequency: heap[parentIdx],
          leftFrequency: heap[leftIdx],
        });
        if ((heap[leftIdx] ?? -Infinity) > (heap[largestIdx] ?? -Infinity)) {
          largestIdx = leftIdx;
        }
      }

      if (rightIdx < heap.length) {
        tracker.compare(largestIdx, rightIdx, {
          largestFrequency: heap[largestIdx],
          rightFrequency: heap[rightIdx],
        });
        if ((heap[rightIdx] ?? -Infinity) > (heap[largestIdx] ?? -Infinity)) {
          largestIdx = rightIdx;
        }
      }

      if (largestIdx === parentIdx) {
        tracker.markSettled(parentIdx, { parentIdx, frequency: heap[parentIdx] });
        break;
      }

      tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
      const swapTemp = heap[parentIdx]!;
      heap[parentIdx] = heap[largestIdx]!;
      heap[largestIdx] = swapTemp;
      parentIdx = largestIdx;
    }
  }

  let totalIntervals = 0;
  let roundNumber = 0;

  while (heap.length > 0) {
    roundNumber += 1;
    const cycleSize = cooldown + 1;
    const roundTasks: number[] = [];

    // Extract up to cycleSize tasks this round
    for (let slotIndex = 0; slotIndex < cycleSize && heap.length > 0; slotIndex++) {
      tracker.markExtracted(0, {
        extractingFrequency: heap[0],
        slotIndex,
        round: roundNumber,
      });
      const maxFrequency = heap[0]!;
      const lastIdx = heap.length - 1;

      tracker.heapSwap(0, lastIdx, { idxA: 0, idxB: lastIdx });
      const swapTmp = heap[0]!;
      heap[0] = heap[lastIdx]!;
      heap[lastIdx] = swapTmp;
      tracker.removeNode({ extractedValue: maxFrequency, removedFromIdx: lastIdx });
      heap.pop();

      if (heap.length > 0) {
        siftDownMaxHeap(heap, tracker);
      }

      roundTasks.push(maxFrequency - 1);
    }

    // Reinsert non-zero tasks
    for (const remainingFrequency of roundTasks) {
      if (remainingFrequency > 0) {
        heap.push(remainingFrequency);
        tracker.addNode(remainingFrequency, { remainingFrequency, round: roundNumber });
        siftUpMaxHeap(heap, heap.length - 1, tracker);
      }
    }

    const intervalsThisRound = heap.length > 0 ? cycleSize : roundTasks.length;
    totalIntervals += intervalsThisRound;

    tracker.markHighlighted(0, {
      round: roundNumber,
      intervalsThisRound,
      totalIntervals,
      idleSlots: heap.length > 0 ? cycleSize - roundTasks.length : 0,
    });
  }

  tracker.complete({ totalIntervals, tasks: [...tasks], cooldown });

  return tracker.getSteps();
}
