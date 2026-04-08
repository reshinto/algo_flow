/** Step generator for BST Search (Recursive) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_SEARCH_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_SEARCH!);

export interface BstSearchInput {
  nodes: TreeNode[];
  rootId: string;
  targetValue: number;
}

export function generateBstSearchSteps(input: BstSearchInput): ExecutionStep[] {
  const { nodes, rootId, targetValue } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_SEARCH_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(targetValue, { rootId, targetValue });

  function search(nodeId: string | null): boolean {
    if (!nodeId) return false;
    const node = nodeMap.get(nodeId);
    if (!node) return false;

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      targetValue,
      nodeValue: node.value,
    });

    if (node.value === targetValue) {
      tracker.searchFound(nodeId, { foundAt: nodeId, value: targetValue });
      return true;
    }

    if (targetValue < node.value) {
      return search(node.leftChildId);
    } else {
      return search(node.rightChildId);
    }
  }

  const found = search(rootId);
  tracker.complete({ found, targetValue });

  return tracker.getSteps();
}
