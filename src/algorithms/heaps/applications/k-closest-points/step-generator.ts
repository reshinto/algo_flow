/** Step generator for K Closest Points to Origin — produces ExecutionStep[] using HeapTracker. */

import type { ExecutionStep } from "@/types";
import { HeapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HEAP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.K_CLOSEST_POINTS!);

export interface KClosestPointsInput {
  points: [number, number][];
  kValue: number;
}

function distanceSquared(point: [number, number]): number {
  return point[0] * point[0] + point[1] * point[1];
}

function siftUpHeap(
  distHeap: number[],
  pointHeap: [number, number][],
  tracker: HeapTracker,
  startIdx: number,
): void {
  let currentIdx = startIdx;
  while (currentIdx > 0) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    tracker.compare(currentIdx, parentIdx, {
      currentDist: distHeap[currentIdx],
      parentDist: distHeap[parentIdx],
    });
    if ((distHeap[currentIdx] ?? -Infinity) > (distHeap[parentIdx] ?? -Infinity)) {
      tracker.heapSwap(currentIdx, parentIdx, { idxA: currentIdx, idxB: parentIdx });
      const tempDist = distHeap[currentIdx]!;
      distHeap[currentIdx] = distHeap[parentIdx]!;
      distHeap[parentIdx] = tempDist;
      const tempPoint = pointHeap[currentIdx]!;
      pointHeap[currentIdx] = pointHeap[parentIdx]!;
      pointHeap[parentIdx] = tempPoint;
      currentIdx = parentIdx;
    } else {
      tracker.markSettled(currentIdx, { idx: currentIdx, dist: distHeap[currentIdx] });
      break;
    }
  }
  if (currentIdx === 0) {
    tracker.markSettled(0, { idx: 0, dist: distHeap[0] });
  }
}

function siftDownHeap(
  distHeap: number[],
  pointHeap: [number, number][],
  heapSize: number,
  tracker: HeapTracker,
  startIdx: number,
): void {
  tracker.startSiftDown(startIdx, { parentIdx: startIdx, dist: distHeap[startIdx] });
  let parentIdx = startIdx;
  while (true) {
    let largestIdx = parentIdx;
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;

    if (leftIdx < heapSize) {
      tracker.compare(parentIdx, leftIdx, {
        parentDist: distHeap[parentIdx],
        leftDist: distHeap[leftIdx],
      });
      if ((distHeap[leftIdx] ?? -Infinity) > (distHeap[largestIdx] ?? -Infinity)) {
        largestIdx = leftIdx;
      }
    }

    if (rightIdx < heapSize) {
      tracker.compare(largestIdx, rightIdx, {
        largestDist: distHeap[largestIdx],
        rightDist: distHeap[rightIdx],
      });
      if ((distHeap[rightIdx] ?? -Infinity) > (distHeap[largestIdx] ?? -Infinity)) {
        largestIdx = rightIdx;
      }
    }

    if (largestIdx === parentIdx) {
      tracker.markSettled(parentIdx, { idx: parentIdx, dist: distHeap[parentIdx] });
      break;
    }

    tracker.heapSwap(parentIdx, largestIdx, { idxA: parentIdx, idxB: largestIdx });
    const tempDist = distHeap[parentIdx]!;
    distHeap[parentIdx] = distHeap[largestIdx]!;
    distHeap[largestIdx] = tempDist;
    const tempPoint = pointHeap[parentIdx]!;
    pointHeap[parentIdx] = pointHeap[largestIdx]!;
    pointHeap[largestIdx] = tempPoint;
    parentIdx = largestIdx;
  }
}

export function generateKClosestPointsSteps(input: KClosestPointsInput): ExecutionStep[] {
  const { points, kValue } = input;
  const distHeap: number[] = [];
  const pointHeap: [number, number][] = [];

  // Start tracker with empty heap
  const tracker = new HeapTracker([], HEAP_LINE_MAP);
  tracker.initialize({ points: [...points], kValue });

  for (const point of points) {
    const dist = distanceSquared(point);

    if (distHeap.length < kValue) {
      // Heap not yet full — insert and sift up
      distHeap.push(dist);
      pointHeap.push(point);
      tracker.addNode(dist, { point, dist, heapSize: distHeap.length });
      siftUpHeap(distHeap, pointHeap, tracker, distHeap.length - 1);
    } else if (distHeap.length > 0 && dist < (distHeap[0] ?? Infinity)) {
      // Current point is closer than farthest — replace root
      tracker.markExtracted(0, { replacedDist: distHeap[0], newDist: dist, point });
      distHeap[0] = dist;
      pointHeap[0] = point;
      // Update the tracker node value by swapping tracker state
      siftDownHeap(distHeap, pointHeap, distHeap.length, tracker, 0);
    }
  }

  const resultPoints = pointHeap.map((pt) => `(${pt[0]},${pt[1]})`).join(", ");
  tracker.complete({ result: resultPoints, kValue });

  return tracker.getSteps();
}
