/** Step generator for BST Search (Iterative) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_SEARCH_ITERATIVE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_SEARCH_ITERATIVE!);

export interface BstSearchIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  targetValue: number;
}

export function generateBstSearchIterativeSteps(input: BstSearchIterativeInput): ExecutionStep[] {
  const { nodes, rootId, targetValue } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_SEARCH_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(targetValue, { rootId, targetValue });

  let currentId: string | null = rootId;

  while (currentId !== null) {
    const node = nodeMap.get(currentId);
    if (!node) break;

    tracker.compareNode(currentId, node.value, {
      currentNode: currentId,
      targetValue,
      nodeValue: node.value,
    });

    if (node.value === targetValue) {
      tracker.searchFound(currentId, { foundAt: currentId, value: targetValue });
      break;
    }

    currentId = targetValue < node.value ? node.leftChildId : node.rightChildId;
  }

  tracker.complete({ found: currentId !== null, targetValue });

  return tracker.getSteps();
}
