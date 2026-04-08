/** Step generator for BST Floor & Ceil (Recursive) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_FLOOR_CEIL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_FLOOR_CEIL!);

export interface BstFloorCeilInput {
  nodes: TreeNode[];
  rootId: string;
  targetValue: number;
}

export function generateBstFloorCeilSteps(input: BstFloorCeilInput): ExecutionStep[] {
  const { nodes, rootId, targetValue } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_FLOOR_CEIL_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(targetValue, { rootId, targetValue });

  let floorValue: number | null = null;
  let ceilValue: number | null = null;

  function findBounds(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      targetValue,
      floor: floorValue,
      ceil: ceilValue,
    });

    if (node.value === targetValue) {
      floorValue = node.value;
      ceilValue = node.value;
      tracker.searchFound(nodeId, { floor: floorValue, ceil: ceilValue });
      return;
    }

    if (targetValue < node.value) {
      ceilValue = node.value;
      findBounds(node.leftChildId);
    } else {
      floorValue = node.value;
      findBounds(node.rightChildId);
    }
  }

  findBounds(rootId);
  tracker.complete({ floor: floorValue, ceil: ceilValue, targetValue });

  return tracker.getSteps();
}
