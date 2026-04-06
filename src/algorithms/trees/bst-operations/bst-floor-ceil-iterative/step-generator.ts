/** Step generator for BST Floor & Ceil (Iterative) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_FLOOR_CEIL_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.BST_FLOOR_CEIL_ITERATIVE!,
);

export interface BstFloorCeilIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  targetValue: number;
}

export function generateBstFloorCeilIterativeSteps(
  input: BstFloorCeilIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId, targetValue } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_FLOOR_CEIL_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(targetValue, { rootId, targetValue });

  let floorValue: number | null = null;
  let ceilValue: number | null = null;
  let currentId: string | null = rootId;

  while (currentId !== null) {
    const node = nodeMap.get(currentId);
    if (!node) break;

    tracker.compareNode(currentId, node.value, {
      currentNode: currentId,
      targetValue,
      floor: floorValue,
      ceil: ceilValue,
    });

    if (node.value === targetValue) {
      floorValue = node.value;
      ceilValue = node.value;
      tracker.searchFound(currentId, { floor: floorValue, ceil: ceilValue });
      break;
    }

    if (targetValue < node.value) {
      ceilValue = node.value;
      currentId = node.leftChildId;
    } else {
      floorValue = node.value;
      currentId = node.rightChildId;
    }
  }

  tracker.complete({ floor: floorValue, ceil: ceilValue, targetValue });

  return tracker.getSteps();
}
