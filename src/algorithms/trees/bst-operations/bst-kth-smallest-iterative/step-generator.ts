/** Step generator for BST Kth Smallest (Iterative) — stack-based in-order with counter. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_KTH_SMALLEST_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.BST_KTH_SMALLEST_ITERATIVE!,
);

export interface BstKthSmallestIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  kthPosition: number;
}

export function generateBstKthSmallestIterativeSteps(
  input: BstKthSmallestIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId, kthPosition } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_KTH_SMALLEST_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId, kthPosition });

  const stack: string[] = [];
  let counter = 0;
  let currentId: string | null = rootId;
  let resultValue = -1;

  outer: while (currentId !== null || stack.length > 0) {
    while (currentId !== null) {
      const node = nodeMap.get(currentId);
      if (!node) break;
      stack.push(currentId);
      tracker.compareNode(currentId, node.value, { currentNode: currentId, pushing: true });
      currentId = node.leftChildId;
    }

    const poppedId = stack.pop();
    if (!poppedId) break;
    const node = nodeMap.get(poppedId);
    if (!node) break;

    counter++;
    tracker.compareNode(poppedId, node.value, { currentNode: poppedId, counter, kthPosition });

    if (counter === kthPosition) {
      resultValue = node.value;
      tracker.searchFound(poppedId, { kthPosition, result: resultValue });
      break outer;
    }

    currentId = node.rightChildId;
  }

  tracker.complete({ kthPosition, result: resultValue });

  return tracker.getSteps();
}
