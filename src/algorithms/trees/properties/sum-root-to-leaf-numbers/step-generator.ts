/** Step generator for Sum Root to Leaf Numbers — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUM_ROOT_TO_LEAF_NUMBERS!);

export interface SumRootToLeafNumbersInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateSumRootToLeafNumbersSteps(
  input: SumRootToLeafNumbersInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  let totalSum = 0;

  function dfs(nodeId: string | null, runningNumber: number): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    const currentNumber = runningNumber * 10 + node.value;
    tracker.checkNode(nodeId, {
      currentNode: nodeId,
      value: node.value,
      runningNumber: currentNumber,
    });

    if (!node.leftChildId && !node.rightChildId) {
      totalSum += currentNumber;
      tracker.markValid(nodeId, { currentNode: nodeId, leafNumber: currentNumber, totalSum });
      return;
    }

    dfs(node.leftChildId, currentNumber);
    dfs(node.rightChildId, currentNumber);
  }

  dfs(rootId, 0);
  tracker.recordResult(totalSum, { result: totalSum });
  tracker.complete({ result: totalSum });

  return tracker.getSteps();
}
