/** Step generator for Path Sum — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PATH_SUM!);

export interface PathSumInput {
  nodes: TreeNode[];
  rootId: string;
  targetSum: number;
}

export function generatePathSumSteps(input: PathSumInput): ExecutionStep[] {
  const { nodes, rootId, targetSum } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, targetSum });

  let found = false;

  function dfs(nodeId: string | null, remaining: number): void {
    if (!nodeId || found) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, remaining });

    const newRemaining = remaining - node.value;

    if (!node.leftChildId && !node.rightChildId) {
      if (newRemaining === 0) {
        found = true;
        tracker.markValid(nodeId, { currentNode: nodeId, value: node.value, pathSumFound: true });
      } else {
        tracker.markInvalid(nodeId, {
          currentNode: nodeId,
          value: node.value,
          remaining: newRemaining,
        });
      }
      return;
    }

    dfs(node.leftChildId, newRemaining);
    dfs(node.rightChildId, newRemaining);
  }

  dfs(rootId, targetSum);
  tracker.recordResult(found, { result: found });
  tracker.complete({ result: found });

  return tracker.getSteps();
}
