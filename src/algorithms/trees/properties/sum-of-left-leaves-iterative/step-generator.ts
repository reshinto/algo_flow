/** Step generator for Sum of Left Leaves (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUM_OF_LEFT_LEAVES_ITERATIVE!);

export interface SumOfLeftLeavesIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateSumOfLeftLeavesIterativeSteps(
  input: SumOfLeftLeavesIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const stack: Array<[string, boolean]> = [[rootId, false]];
  let totalSum = 0;

  while (stack.length > 0) {
    const entry = stack.pop()!;
    const [nodeId, isLeft] = entry;
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, isLeft });

    if (!node.leftChildId && !node.rightChildId && isLeft) {
      totalSum += node.value;
      tracker.markValid(nodeId, {
        currentNode: nodeId,
        value: node.value,
        isLeftLeaf: true,
        totalSum,
      });
    }

    if (node.rightChildId) stack.push([node.rightChildId, false]);
    if (node.leftChildId) stack.push([node.leftChildId, true]);
  }

  tracker.recordResult(totalSum, { result: totalSum });
  tracker.complete({ result: totalSum });

  return tracker.getSteps();
}
