/** Step generator for Sum of Left Leaves — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUM_OF_LEFT_LEAVES!);

export interface SumOfLeftLeavesInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateSumOfLeftLeavesSteps(input: SumOfLeftLeavesInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  let totalSum = 0;

  function dfs(nodeId: string | null, isLeft: boolean): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, isLeft });

    if (!node.leftChildId && !node.rightChildId && isLeft) {
      totalSum += node.value;
      tracker.markValid(nodeId, {
        currentNode: nodeId,
        value: node.value,
        isLeftLeaf: true,
        totalSum,
      });
      return;
    }

    dfs(node.leftChildId, true);
    dfs(node.rightChildId, false);
  }

  dfs(rootId, false);
  tracker.recordResult(totalSum, { result: totalSum });
  tracker.complete({ result: totalSum });

  return tracker.getSteps();
}
