/** Step generator for BST From Sorted Array (Recursive) — build balanced BST. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_FROM_SORTED_ARRAY_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_FROM_SORTED_ARRAY!);

export interface BstFromSortedArrayInput {
  sortedArray: number[];
}

export function generateBstFromSortedArraySteps(input: BstFromSortedArrayInput): ExecutionStep[] {
  const { sortedArray } = input;

  // Build initial empty tree and root placeholder
  const builtNodes: TreeNode[] = [];
  const rootId = "root-placeholder";

  const tracker = new BSTOperationTracker(builtNodes, rootId, BST_FROM_SORTED_ARRAY_LINE_MAP);

  tracker.initialize(null, { sortedArray: sortedArray.join(", "), length: sortedArray.length });

  let nodeCounter = 0;

  function buildBST(
    leftIndex: number,
    rightIndex: number,
    parentId: string | null,
    depth: number,
  ): string | null {
    if (leftIndex > rightIndex) return null;

    const midIndex = Math.floor((leftIndex + rightIndex) / 2);
    const midValue = sortedArray[midIndex];
    if (midValue === undefined) return null;

    nodeCounter++;
    const newNodeId = `n${nodeCounter}`;
    const xBase = 200;
    const xOffset = (rightIndex - leftIndex) * 30;
    const newNode: TreeNode = {
      id: newNodeId,
      value: midValue,
      parentId,
      leftChildId: null,
      rightChildId: null,
      state: "current",
      position: { x: xBase + xOffset * (midIndex - sortedArray.length / 2), y: depth * 100 + 60 },
    };

    builtNodes.push(newNode);
    tracker.insertNode(parentId, newNodeId, {
      midIndex,
      midValue,
      leftBound: leftIndex,
      rightBound: rightIndex,
    });

    const leftChildId = buildBST(leftIndex, midIndex - 1, newNodeId, depth + 1);
    const rightChildId = buildBST(midIndex + 1, rightIndex, newNodeId, depth + 1);

    newNode.leftChildId = leftChildId;
    newNode.rightChildId = rightChildId;

    return newNodeId;
  }

  buildBST(0, sortedArray.length - 1, null, 0);
  tracker.complete({ nodesCreated: builtNodes.length });

  return tracker.getSteps();
}
