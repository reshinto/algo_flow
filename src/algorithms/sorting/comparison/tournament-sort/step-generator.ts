/** Step generator for Tournament Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TOURNAMENT_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TOURNAMENT_SORT!);

const TOURNAMENT_INFINITY = Number.POSITIVE_INFINITY;

function buildTournamentTree(leaves: number[]): number[] {
  const leafCount = leaves.length;
  const treeSize = 2 * leafCount;
  const tree: number[] = new Array(treeSize).fill(TOURNAMENT_INFINITY);

  for (let leafIndex = 0; leafIndex < leafCount; leafIndex++) {
    tree[leafCount + leafIndex] = leaves[leafIndex]!;
  }

  for (let nodeIndex = leafCount - 1; nodeIndex >= 1; nodeIndex--) {
    const leftChild = 2 * nodeIndex;
    const rightChild = 2 * nodeIndex + 1;
    tree[nodeIndex] = tree[leftChild]! <= tree[rightChild]! ? tree[leftChild]! : tree[rightChild]!;
  }

  return tree;
}

function extractWinnerAndRebuild(
  tree: number[],
  leafCount: number,
  workingArray: number[],
  tracker: SortingTracker,
  sortedPosition: number,
): number {
  const winner = tree[1]!;

  // Find the leaf holding the winner
  let nodeIndex = 1;
  while (nodeIndex < leafCount) {
    const leftChild = 2 * nodeIndex;
    const rightChild = 2 * nodeIndex + 1;

    // Use safe indices clamped within workingArray bounds for visualization
    const leftLeafIndex = Math.min(leftChild - leafCount, workingArray.length - 1);
    const rightLeafIndex = Math.min(rightChild - leafCount, workingArray.length - 1);
    const visLeft = Math.max(0, leftLeafIndex);
    const visRight = Math.max(0, rightLeafIndex);

    tracker.compare(visLeft, visRight, {
      leftValue: tree[leftChild],
      rightValue: tree[rightChild],
      phase: "tournament-match",
    });

    nodeIndex = tree[leftChild]! === winner ? leftChild : rightChild;
  }

  const winnerLeafIndex = nodeIndex - leafCount;
  tree[nodeIndex] = TOURNAMENT_INFINITY;

  // Place winner in sorted position in workingArray
  workingArray[sortedPosition] = winner;

  // Sync tracker value so the visual state reflects the placed winner
  const visWinnerIndex = Math.max(0, Math.min(winnerLeafIndex, workingArray.length - 1));
  tracker.setElementValue(visWinnerIndex, winner);
  tracker.swap(visWinnerIndex, sortedPosition, {
    winner,
    sortedPosition,
    phase: "extract-winner",
  });

  // Rebuild upward
  nodeIndex = Math.floor(nodeIndex / 2);
  while (nodeIndex >= 1) {
    const leftChild = 2 * nodeIndex;
    const rightChild = 2 * nodeIndex + 1;
    tree[nodeIndex] = tree[leftChild]! <= tree[rightChild]! ? tree[leftChild]! : tree[rightChild]!;
    nodeIndex = Math.floor(nodeIndex / 2);
  }

  return winner;
}

export function generateTournamentSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], TOURNAMENT_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  const leaves = [...inputArray];
  const tree = buildTournamentTree(leaves);

  // Build tree step — show all initial comparisons at once
  for (let nodeIndex = leaves.length - 1; nodeIndex >= 1; nodeIndex--) {
    const leftChild = 2 * nodeIndex;
    const rightChild = 2 * nodeIndex + 1;
    const leftLeafIdx = Math.min(leftChild - leaves.length, workingArray.length - 1);
    const rightLeafIdx = Math.min(rightChild - leaves.length, workingArray.length - 1);
    const visLeft = Math.max(0, leftLeafIdx);
    const visRight = Math.max(0, rightLeafIdx);

    tracker.compare(visLeft, visRight, {
      nodeIndex,
      phase: "build-tournament",
    });
  }

  // Extract winners one by one
  const extractedValues: number[] = [];
  for (let extractIndex = 0; extractIndex < arrayLength; extractIndex++) {
    extractWinnerAndRebuild(tree, leaves.length, workingArray, tracker, extractIndex);
    extractedValues.push(workingArray[extractIndex]!);
    tracker.markSorted(extractIndex, {
      extractIndex,
      winner: workingArray[extractIndex],
      result: [...workingArray],
    });
  }

  // Sync tracker elements with final sorted workingArray before completing
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
