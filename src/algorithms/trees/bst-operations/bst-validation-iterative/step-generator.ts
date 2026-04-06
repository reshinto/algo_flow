/** Step generator for BST Validation (Iterative) — stack-based in-order ascending check. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_VALIDATION_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.BST_VALIDATION_ITERATIVE!,
);

export interface BstValidationIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstValidationIterativeSteps(
  input: BstValidationIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_VALIDATION_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId });

  const stack: string[] = [];
  let previousValue = -Infinity;
  let currentId: string | null = rootId;
  let isValid = true;

  while (currentId !== null || stack.length > 0) {
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

    if (node.value <= previousValue) {
      tracker.searchFound(poppedId, { violation: true, nodeValue: node.value, previousValue });
      isValid = false;
      break;
    }

    previousValue = node.value;
    tracker.compareNode(poppedId, node.value, {
      currentNode: poppedId,
      previousValue,
      ascending: true,
    });
    currentId = node.rightChildId;
  }

  tracker.complete({ isValid });

  return tracker.getSteps();
}
