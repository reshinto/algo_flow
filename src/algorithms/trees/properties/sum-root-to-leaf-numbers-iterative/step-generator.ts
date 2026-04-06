/** Step generator for Sum Root to Leaf Numbers (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUM_ROOT_TO_LEAF_NUMBERS_ITERATIVE!);

export interface SumRootToLeafNumbersIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateSumRootToLeafNumbersIterativeSteps(
  input: SumRootToLeafNumbersIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const rootNode = nodeMap.get(rootId);
  if (!rootNode) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  const stack: Array<[string, number]> = [[rootId, rootNode.value]];
  let totalSum = 0;

  while (stack.length > 0) {
    const entry = stack.pop()!;
    const [nodeId, runningNumber] = entry;
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, runningNumber });

    if (!node.leftChildId && !node.rightChildId) {
      totalSum += runningNumber;
      tracker.markValid(nodeId, { currentNode: nodeId, leafNumber: runningNumber, totalSum });
    }

    if (node.rightChildId) {
      const rightNode = nodeMap.get(node.rightChildId);
      if (rightNode) stack.push([node.rightChildId, runningNumber * 10 + rightNode.value]);
    }
    if (node.leftChildId) {
      const leftNode = nodeMap.get(node.leftChildId);
      if (leftNode) stack.push([node.leftChildId, runningNumber * 10 + leftNode.value]);
    }
  }

  tracker.recordResult(totalSum, { result: totalSum });
  tracker.complete({ result: totalSum });

  return tracker.getSteps();
}
