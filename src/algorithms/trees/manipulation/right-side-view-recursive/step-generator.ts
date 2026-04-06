/** Step generator for Right Side View Recursive (DFS) — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RIGHT_SIDE_VIEW_RECURSIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.RIGHT_SIDE_VIEW_RECURSIVE!,
);

export interface RightSideViewRecursiveInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateRightSideViewRecursiveSteps(
  input: RightSideViewRecursiveInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, RIGHT_SIDE_VIEW_RECURSIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Right Side View (Recursive DFS)", { rootId, result: [] });

  const result: number[] = [];

  function dfs(nodeId: string | null, depth: number): void {
    if (!nodeId) return;
    const currentNode = nodeMap.get(nodeId);
    if (!currentNode) return;

    if (depth === result.length) {
      result.push(currentNode.value);
      tracker.markProcessed(nodeId, {
        nodeId,
        depth,
        value: currentNode.value,
        isRightmost: true,
        result: [...result],
      });
    } else {
      tracker.compareNodes(nodeId, nodeId, {
        nodeId,
        depth,
        value: currentNode.value,
        isRightmost: false,
      });
    }

    dfs(currentNode.rightChildId, depth + 1);
    dfs(currentNode.leftChildId, depth + 1);
  }

  dfs(rootId, 0);
  tracker.complete(null, { result });
  return tracker.getSteps();
}
