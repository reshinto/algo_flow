/** Step generator for Cartesian Tree Sort — produces ExecutionStep[] using SortingTracker. */

import type { ExecutionStep } from "@/types";
import { SortingTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const CARTESIAN_TREE_SORT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CARTESIAN_TREE_SORT!);

interface CartesianNode {
  value: number;
  originalIndex: number;
  leftChild: CartesianNode | null;
  rightChild: CartesianNode | null;
}

export function generateCartesianTreeSortSteps(inputArray: number[]): ExecutionStep[] {
  const tracker = new SortingTracker([...inputArray], CARTESIAN_TREE_SORT_LINE_MAP);
  const workingArray = [...inputArray];
  const arrayLength = workingArray.length;

  tracker.initialize({ sortedArray: [...workingArray], arrayLength });

  if (arrayLength === 0) {
    tracker.complete({ result: [] });
    return tracker.getSteps();
  }

  // Build the Cartesian tree
  const nodeStack: CartesianNode[] = [];

  for (let buildIndex = 0; buildIndex < arrayLength; buildIndex++) {
    const newNode: CartesianNode = {
      value: workingArray[buildIndex]!,
      originalIndex: buildIndex,
      leftChild: null,
      rightChild: null,
    };

    // Compare new element against top of stack
    if (nodeStack.length > 0) {
      tracker.compare(buildIndex, nodeStack[nodeStack.length - 1]!.originalIndex, {
        buildIndex,
        newValue: newNode.value,
        stackTopValue: nodeStack[nodeStack.length - 1]!.value,
        phase: "build-tree",
      });
    }

    let lastPopped: CartesianNode | null = null;
    while (nodeStack.length > 0 && nodeStack[nodeStack.length - 1]!.value > newNode.value) {
      lastPopped = nodeStack.pop()!;

      if (nodeStack.length > 0) {
        tracker.compare(buildIndex, nodeStack[nodeStack.length - 1]!.originalIndex, {
          buildIndex,
          newValue: newNode.value,
          stackTopValue: nodeStack[nodeStack.length - 1]!.value,
          phase: "build-tree-pop",
        });
      }
    }

    newNode.leftChild = lastPopped;
    if (nodeStack.length > 0) {
      nodeStack[nodeStack.length - 1]!.rightChild = newNode;
    }
    nodeStack.push(newNode);

    tracker.swap(buildIndex, buildIndex, {
      buildIndex,
      nodeInserted: newNode.value,
      stackSize: nodeStack.length,
      phase: "build-tree-insert",
    });
  }

  // Merge two min-heap Cartesian subtrees while maintaining min-heap order
  function mergeTrees(
    leftTree: CartesianNode | null,
    rightTree: CartesianNode | null,
  ): CartesianNode | null {
    if (leftTree === null) return rightTree;
    if (rightTree === null) return leftTree;

    if (leftTree.value <= rightTree.value) {
      tracker.compare(leftTree.originalIndex, rightTree.originalIndex, {
        leftValue: leftTree.value,
        rightValue: rightTree.value,
        phase: "merge",
      });
      leftTree.rightChild = mergeTrees(leftTree.rightChild, rightTree);
      return leftTree;
    } else {
      tracker.compare(leftTree.originalIndex, rightTree.originalIndex, {
        leftValue: leftTree.value,
        rightValue: rightTree.value,
        phase: "merge",
      });
      rightTree.leftChild = mergeTrees(leftTree, rightTree.leftChild);
      return rightTree;
    }
  }

  // Repeatedly extract the minimum root and merge its two subtrees
  let currentRoot: CartesianNode | null = nodeStack[0] ?? null;
  const resultArray: number[] = [];
  let extractPosition = 0;

  while (currentRoot !== null) {
    resultArray.push(currentRoot.value);

    // Place extracted minimum into the working array at the sorted position
    workingArray[extractPosition] = currentRoot.value;
    tracker.setElementValue(extractPosition, currentRoot.value);

    tracker.swap(extractPosition, extractPosition, {
      extractedValue: currentRoot.value,
      sortedPosition: extractPosition,
      phase: "extract",
      sortedArray: [...workingArray],
    });

    tracker.markSorted(extractPosition, {
      sortedPosition: extractPosition,
      extractedValue: currentRoot.value,
    });

    extractPosition++;
    currentRoot = mergeTrees(currentRoot.leftChild, currentRoot.rightChild);
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
