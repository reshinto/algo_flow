/** Step generator for Meeting Rooms II — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MEETING_ROOMS_II!);

export interface MeetingRoomsIIInput {
  intervals: [number, number][];
}

export function generateMeetingRoomsIISteps(input: MeetingRoomsIIInput): ExecutionStep[] {
  const { intervals } = input;
  const tracker = new HeapTracker([], HEAP_LINE_MAP);

  tracker.initialize({ intervals: [...intervals], roomCount: 0 });

  if (intervals.length === 0) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  // Sort meetings by start time
  const sortedIntervals = [...intervals].sort(
    (meetingA, meetingB) => meetingA[0] - meetingB[0],
  ) as [number, number][];

  // Min-heap of end times (represents occupied rooms)
  const endTimeHeap: number[] = [];

  for (const [startTime, endTime] of sortedIntervals) {
    if (endTimeHeap.length > 0 && (endTimeHeap[0] ?? Infinity) <= startTime) {
      // Room freed — extract the earliest ending meeting
      const lastHeapIdx = endTimeHeap.length - 1;

      tracker.markExtracted(0, {
        extractedEndTime: endTimeHeap[0],
        currentStartTime: startTime,
        action: "room-freed",
      });

      // Swap root with last and remove last (standard heap extract)
      tracker.heapSwap(0, lastHeapIdx, { idxA: 0, idxB: lastHeapIdx });
      endTimeHeap[0] = endTimeHeap[lastHeapIdx]!;

      tracker.removeNode({
        extractedEndTime: endTimeHeap[lastHeapIdx],
        removedFromIdx: lastHeapIdx,
      });
      endTimeHeap.pop();

      // Sift down to restore min-heap
      let parentIdx = 0;
      tracker.startSiftDown(parentIdx, { parentIdx, value: endTimeHeap[parentIdx] });

      while (true) {
        let smallestIdx = parentIdx;
        const leftIdx = 2 * parentIdx + 1;
        const rightIdx = 2 * parentIdx + 2;

        if (leftIdx < endTimeHeap.length) {
          tracker.compare(parentIdx, leftIdx, {
            parent: endTimeHeap[parentIdx],
            left: endTimeHeap[leftIdx],
          });
          if ((endTimeHeap[leftIdx] ?? Infinity) < (endTimeHeap[smallestIdx] ?? Infinity)) {
            smallestIdx = leftIdx;
          }
        }

        if (rightIdx < endTimeHeap.length) {
          tracker.compare(smallestIdx, rightIdx, {
            smallest: endTimeHeap[smallestIdx],
            right: endTimeHeap[rightIdx],
          });
          if ((endTimeHeap[rightIdx] ?? Infinity) < (endTimeHeap[smallestIdx] ?? Infinity)) {
            smallestIdx = rightIdx;
          }
        }

        if (smallestIdx === parentIdx) {
          tracker.markSettled(parentIdx, { parentIdx, value: endTimeHeap[parentIdx] });
          break;
        }

        tracker.heapSwap(parentIdx, smallestIdx, { idxA: parentIdx, idxB: smallestIdx });
        const swapTemp = endTimeHeap[parentIdx]!;
        endTimeHeap[parentIdx] = endTimeHeap[smallestIdx]!;
        endTimeHeap[smallestIdx] = swapTemp;
        parentIdx = smallestIdx;
      }
    }

    // Allocate new room — insert end time into heap
    tracker.addNode(endTime, {
      endTime,
      startTime,
      action: "allocate-room",
      roomCount: endTimeHeap.length + 1,
    });
    endTimeHeap.push(endTime);

    let currentIdx = endTimeHeap.length - 1;
    tracker.startSiftUp(currentIdx, { currentIdx, value: endTime });

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      tracker.compare(currentIdx, parentIdx, {
        current: endTimeHeap[currentIdx],
        parent: endTimeHeap[parentIdx],
      });

      if ((endTimeHeap[currentIdx] ?? Infinity) >= (endTimeHeap[parentIdx] ?? Infinity)) {
        tracker.markSettled(currentIdx, { currentIdx, value: endTimeHeap[currentIdx] });
        break;
      }

      tracker.heapSwap(currentIdx, parentIdx, { idxA: currentIdx, idxB: parentIdx });
      const swapTemp = endTimeHeap[currentIdx]!;
      endTimeHeap[currentIdx] = endTimeHeap[parentIdx]!;
      endTimeHeap[parentIdx] = swapTemp;
      currentIdx = parentIdx;
    }

    if (currentIdx === 0) {
      tracker.markSettled(0, { currentIdx: 0, value: endTimeHeap[0] });
    }
  }

  tracker.complete({ result: endTimeHeap.length, roomCount: endTimeHeap.length });

  return tracker.getSteps();
}
