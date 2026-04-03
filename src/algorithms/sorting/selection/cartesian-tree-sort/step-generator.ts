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

  const treeRoot = nodeStack[0]!;

  // Inorder traversal to extract sorted elements
  const resultArray: number[] = [];
  const traversalStack: Array<{ node: CartesianNode; visited: boolean }> = [];

  if (treeRoot) {
    traversalStack.push({ node: treeRoot, visited: false });
  }

  let extractPosition = 0;

  while (traversalStack.length > 0) {
    const current = traversalStack[traversalStack.length - 1]!;

    if (!current.visited && current.node.leftChild) {
      current.visited = true;
      traversalStack.push({ node: current.node.leftChild, visited: false });
    } else {
      traversalStack.pop();
      resultArray.push(current.node.value);

      // Place extracted element into the working array at the sorted position
      workingArray[extractPosition] = current.node.value;

      tracker.swap(current.node.originalIndex, extractPosition, {
        extractedValue: current.node.value,
        sortedPosition: extractPosition,
        phase: "extract",
        sortedArray: [...workingArray],
      });

      tracker.markSorted(extractPosition, {
        sortedPosition: extractPosition,
        extractedValue: current.node.value,
      });

      extractPosition++;

      if (current.node.rightChild) {
        traversalStack.push({ node: current.node.rightChild, visited: false });
      }
    }
  }

  tracker.complete({ result: [...workingArray] });
  return tracker.getSteps();
}
