/** Step generator for Invert Binary Tree Iterative — BFS level-by-level swap. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INVERT_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.INVERT_BINARY_TREE_ITERATIVE!,
);

export interface InvertBinaryTreeIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateInvertBinaryTreeIterativeSteps(
  input: InvertBinaryTreeIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, INVERT_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Invert Binary Tree (Iterative BFS)", { rootId, queueSize: 1 });

  const queue: string[] = [rootId];

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) continue;
    const currentNode = nodeMap.get(currentId);
    if (!currentNode) continue;

    const leftId = currentNode.leftChildId;
    const rightId = currentNode.rightChildId;

    tracker.swapChildren(currentId, {
      nodeId: currentId,
      leftChildId: rightId,
      rightChildId: leftId,
      queueSize: queue.length,
    });

    // Update local map to reflect swap
    currentNode.leftChildId = rightId;
    currentNode.rightChildId = leftId;

    tracker.markProcessed(currentId, { nodeId: currentId, value: currentNode.value });

    // Enqueue children after swap (so we process them in their new positions)
    if (currentNode.leftChildId) queue.push(currentNode.leftChildId);
    if (currentNode.rightChildId) queue.push(currentNode.rightChildId);
  }

  tracker.complete(null, { result: "inverted" });
  return tracker.getSteps();
}
