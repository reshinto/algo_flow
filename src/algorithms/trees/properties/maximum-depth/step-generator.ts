/** Step generator for Maximum Depth — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAXIMUM_DEPTH!);

export interface MaximumDepthInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateMaximumDepthSteps(input: MaximumDepthInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  function computeDepth(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value });

    const leftDepth = computeDepth(node.leftChildId);
    const rightDepth = computeDepth(node.rightChildId);
    const depth = Math.max(leftDepth, rightDepth) + 1;

    tracker.updateHeight(nodeId, depth, { currentNode: nodeId, depth });
    return depth;
  }

  const result = computeDepth(rootId);
  tracker.recordResult(result, { result });
  tracker.complete({ result });

  return tracker.getSteps();
}
