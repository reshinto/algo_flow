/** Step generator for BST to Greater Tree (Iterative) — stack-based reverse in-order. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_TO_GREATER_TREE_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.BST_TO_GREATER_TREE_ITERATIVE!,
);

export interface BstToGreaterTreeIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstToGreaterTreeIterativeSteps(
  input: BstToGreaterTreeIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;

  const mutableNodes = nodes.map((node) => ({ ...node }));
  const tracker = new BSTOperationTracker(
    mutableNodes,
    rootId,
    BST_TO_GREATER_TREE_ITERATIVE_LINE_MAP,
  );
  const nodeMap = new Map<string, TreeNode>(mutableNodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId });

  const stack: string[] = [];
  let runningSum = 0;
  let currentId: string | null = rootId;

  while (currentId !== null || stack.length > 0) {
    while (currentId !== null) {
      const node = nodeMap.get(currentId);
      if (!node) break;
      stack.push(currentId);
      tracker.compareNode(currentId, node.value, { currentNode: currentId, pushing: true });
      currentId = node.rightChildId;
    }

    const poppedId = stack.pop();
    if (!poppedId) break;
    const node = nodeMap.get(poppedId);
    if (!node) break;

    const originalValue = node.value;
    runningSum += node.value;
    node.value = runningSum;

    tracker.searchFound(poppedId, { originalValue, runningSum, newValue: node.value });

    currentId = node.leftChildId;
  }

  tracker.complete({ runningSum });

  return tracker.getSteps();
}
