/** Step generator for Smooth Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SMOOTH_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SMOOTH_SORT!);

/** Precompute Leonardo numbers up to a given size. */
function buildLeonardoNumbers(limit: number): number[] {
  const numbers: number[] = [1, 1];
  while (numbers[numbers.length - 1]! < limit) {
    const len = numbers.length;
    numbers.push(numbers[len - 1]! + numbers[len - 2]! + 1);
  }
  return numbers;
}

export function generateSmoothSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], SMOOTH_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength <= 1) {
    tracker.complete({ result: [...workingArray] });
    return tracker.getSteps();
  }

  const leonardoNumbers = buildLeonardoNumbers(arrayLength);

  function sift(rootIndex: number, order: number): void {
    let currentRoot = rootIndex;
    let currentOrder = order;

    while (currentOrder >= 2) {
      const rightChild = currentRoot - 1;
      const leftChild = currentRoot - 1 - (leonardoNumbers[currentOrder - 1] ?? 1);

      let largestIndex = currentRoot;

      tracker.compare(rightChild >= 0 ? rightChild : currentRoot, largestIndex, {
        phase: "sift",
        currentRoot,
        currentOrder,
      });
      if (rightChild >= 0 && workingArray[rightChild]! > workingArray[largestIndex]!) {
        largestIndex = rightChild;
      }

      tracker.compare(leftChild >= 0 ? leftChild : currentRoot, largestIndex, {
        phase: "sift",
        currentRoot,
        currentOrder,
      });
      if (leftChild >= 0 && workingArray[leftChild]! > workingArray[largestIndex]!) {
        largestIndex = leftChild;
      }

      if (largestIndex === currentRoot) break;

      const temporaryValue = workingArray[currentRoot]!;
      workingArray[currentRoot] = workingArray[largestIndex]!;
      workingArray[largestIndex] = temporaryValue;

      tracker.swap(currentRoot, largestIndex, {
        phase: "sift",
        sortedArray: [...workingArray],
      });

      currentOrder = largestIndex === rightChild ? currentOrder - 1 : currentOrder - 2;
      currentRoot = largestIndex;
    }
  }

  function trinkle(rootIndex: number, order: number, heapRoots: [number, number][]): void {
    let currentRoot = rootIndex;
    let currentOrder = order;
    const mutableRoots = [...heapRoots];

    while (mutableRoots.length > 0) {
      const lastEntry = mutableRoots[mutableRoots.length - 1]!;
      const prevRoot = lastEntry[0];
      const prevOrder = lastEntry[1];

      tracker.compare(currentRoot, prevRoot, {
        phase: "trinkle",
        currentRoot,
        prevRoot,
      });

      if (workingArray[currentRoot]! >= workingArray[prevRoot]!) break;

      if (currentOrder >= 2) {
        const rightChild = currentRoot - 1;
        const leftChild = currentRoot - 1 - (leonardoNumbers[currentOrder - 1] ?? 1);

        tracker.compare(prevRoot, rightChild, {
          phase: "trinkle-child-check",
          currentRoot,
          prevRoot,
        });

        if (
          workingArray[prevRoot]! < workingArray[rightChild]! ||
          workingArray[prevRoot]! < workingArray[leftChild]!
        ) {
          break;
        }
      }

      const temporaryValue = workingArray[currentRoot]!;
      workingArray[currentRoot] = workingArray[prevRoot]!;
      workingArray[prevRoot] = temporaryValue;

      tracker.swap(currentRoot, prevRoot, {
        phase: "trinkle",
        sortedArray: [...workingArray],
      });

      mutableRoots.pop();
      currentRoot = prevRoot;
      currentOrder = prevOrder;
    }

    sift(currentRoot, currentOrder);
  }

  // Build phase
  const heapRoots: [number, number][] = [];

  for (let buildIndex = 0; buildIndex < arrayLength; buildIndex++) {
    const rootCount = heapRoots.length;
    if (rootCount >= 2 && heapRoots[rootCount - 2]![1] === heapRoots[rootCount - 1]![1] + 1) {
      const prevOrder = heapRoots[rootCount - 2]![1];
      heapRoots.splice(rootCount - 2, 2);
      heapRoots.push([buildIndex, prevOrder + 1]);
    } else if (rootCount >= 1 && heapRoots[rootCount - 1]![1] === 1) {
      heapRoots.push([buildIndex, 0]);
    } else {
      heapRoots.push([buildIndex, 1]);
    }

    trinkle(buildIndex, heapRoots[heapRoots.length - 1]![1], heapRoots.slice(0, -1));
  }

  // Extract phase
  for (let extractIndex = arrayLength - 1; extractIndex >= 0; extractIndex--) {
    const currentOrder = heapRoots[heapRoots.length - 1]![1];
    heapRoots.pop();

    if (currentOrder >= 2) {
      const rightRoot = extractIndex - 1;
      const leftRoot = extractIndex - 1 - (leonardoNumbers[currentOrder - 1] ?? 1);
      heapRoots.push([leftRoot, currentOrder - 2]);
      heapRoots.push([rightRoot, currentOrder - 1]);

      trinkle(leftRoot, currentOrder - 2, heapRoots.slice(0, -2));
      trinkle(rightRoot, currentOrder - 1, heapRoots.slice(0, -1));
    }

    tracker.markSorted(extractIndex, {
      extractIndex,
      sortedArray: [...workingArray],
    });
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
