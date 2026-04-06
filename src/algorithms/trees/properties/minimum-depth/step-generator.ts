/** Step generator for Minimum Depth — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MINIMUM_DEPTH!);

export interface MinimumDepthInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateMinimumDepthSteps(input: MinimumDepthInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  function computeMinDepth(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value });

    // Leaf node
    if (!node.leftChildId && !node.rightChildId) {
      tracker.updateHeight(nodeId, 1, { currentNode: nodeId, depth: 1 });
      return 1;
    }

    if (!node.leftChildId && node.rightChildId) {
      const rightDepth = computeMinDepth(node.rightChildId);
      const depth = rightDepth + 1;
      tracker.updateHeight(nodeId, depth, { currentNode: nodeId, depth });
      return depth;
    }

    if (!node.rightChildId && node.leftChildId) {
      const leftDepth = computeMinDepth(node.leftChildId);
      const depth = leftDepth + 1;
      tracker.updateHeight(nodeId, depth, { currentNode: nodeId, depth });
      return depth;
    }

    const leftDepth = computeMinDepth(node.leftChildId);
    const rightDepth = computeMinDepth(node.rightChildId);
    const depth = Math.min(leftDepth, rightDepth) + 1;

    tracker.updateHeight(nodeId, depth, { currentNode: nodeId, depth });
    return depth;
  }

  const result = computeMinDepth(rootId);
  tracker.recordResult(result, { result });
  tracker.complete({ result });

  return tracker.getSteps();
}
