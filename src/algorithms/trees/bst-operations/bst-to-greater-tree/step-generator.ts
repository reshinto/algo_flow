/** Step generator for BST to Greater Tree (Recursive) — reverse in-order sum accumulation. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_TO_GREATER_TREE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_TO_GREATER_TREE!);

export interface BstToGreaterTreeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstToGreaterTreeSteps(input: BstToGreaterTreeInput): ExecutionStep[] {
  const { nodes, rootId } = input;

  const mutableNodes = nodes.map((node) => ({ ...node }));
  const tracker = new BSTOperationTracker(mutableNodes, rootId, BST_TO_GREATER_TREE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(mutableNodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId });

  let runningSum = 0;

  function reverseInorder(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    reverseInorder(node.rightChildId);

    const originalValue = node.value;
    runningSum += node.value;
    node.value = runningSum;

    tracker.searchFound(nodeId, {
      originalValue,
      runningSum,
      newValue: node.value,
    });

    reverseInorder(node.leftChildId);
  }

  reverseInorder(rootId);
  tracker.complete({ runningSum });

  return tracker.getSteps();
}
