/** Step generator for Tree Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TREE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TREE_SORT!);

interface BstNode {
  value: number;
  originalIndex: number;
  left: BstNode | null;
  right: BstNode | null;
}

function insertNode(
  root: BstNode | null,
  value: number,
  originalIndex: number,
  workingArray: number[],
  tracker: SortingTracker,
  rootIndex: number,
): BstNode {
  if (root === null) {
    return { value, originalIndex, left: null, right: null };
  }

  tracker.compare(originalIndex, root.originalIndex, {
    insertingValue: value,
    nodeValue: root.value,
    phase: "bst-insert",
  });

  if (value < root.value) {
    root.left = insertNode(root.left, value, originalIndex, workingArray, tracker, rootIndex);
  } else {
    root.right = insertNode(root.right, value, originalIndex, workingArray, tracker, rootIndex);
  }

  return root;
}

function inorderTraversal(
  root: BstNode | null,
  workingArray: number[],
  tracker: SortingTracker,
  extractedValues: number[],
): void {
  if (root === null) return;

  inorderTraversal(root.left, workingArray, tracker, extractedValues);

  const sortedPosition = extractedValues.length;
  extractedValues.push(root.value);
  workingArray[sortedPosition] = root.value;

  tracker.swap(sortedPosition, root.originalIndex, {
    extractedValue: root.value,
    sortedPosition,
    phase: "inorder-extract",
  });
  tracker.markSorted(sortedPosition, {
    sortedPosition,
    value: root.value,
  });

  inorderTraversal(root.right, workingArray, tracker, extractedValues);
}

export function generateTreeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], TREE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  // Build BST by inserting each element
  let treeRoot: BstNode | null = null;
  for (let insertIndex = 0; insertIndex < arrayLength; insertIndex++) {
    const insertValue = workingArray[insertIndex]!;
    treeRoot = insertNode(treeRoot, insertValue, insertIndex, workingArray, tracker, 0);
  }

  // Extract sorted order via inorder traversal
  const extractedValues: number[] = [];
  inorderTraversal(treeRoot, workingArray, tracker, extractedValues);

  // Sync tracker elements with final sorted workingArray before completing
  for (let syncIndex = 0; syncIndex < arrayLength; syncIndex++) {
    tracker.setElementValue(syncIndex, workingArray[syncIndex]!);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
