/** Step generator for BST Range Sum (Iterative) — stack-based DFS summing in range. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_RANGE_SUM_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.BST_RANGE_SUM_ITERATIVE!,
);

export interface BstRangeSumIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  lowValue: number;
  highValue: number;
}

export function generateBstRangeSumIterativeSteps(
  input: BstRangeSumIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId, lowValue, highValue } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_RANGE_SUM_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId, lowValue, highValue });

  const stack: string[] = [rootId];
  let runningSum = 0;

  while (stack.length > 0) {
    const currentId = stack.pop();
    if (!currentId) continue;
    const node = nodeMap.get(currentId);
    if (!node) continue;

    tracker.compareNode(currentId, node.value, {
      currentNode: currentId,
      nodeValue: node.value,
      lowValue,
      highValue,
      runningSum,
    });

    if (node.value >= lowValue && node.value <= highValue) {
      runningSum += node.value;
      tracker.searchFound(currentId, { nodeValue: node.value, runningSum });
    }

    if (node.leftChildId && node.value > lowValue) stack.push(node.leftChildId);
    if (node.rightChildId && node.value < highValue) stack.push(node.rightChildId);
  }

  tracker.complete({ lowValue, highValue, totalSum: runningSum });

  return tracker.getSteps();
}
