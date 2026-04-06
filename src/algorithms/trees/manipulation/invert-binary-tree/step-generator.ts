/** Step generator for Invert Binary Tree — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const INVERT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.INVERT_BINARY_TREE!);

export interface InvertBinaryTreeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateInvertBinaryTreeSteps(input: InvertBinaryTreeInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, INVERT_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Invert Binary Tree", { rootId });

  function invert(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    // Recurse into left and right before swapping
    invert(node.leftChildId);
    invert(node.rightChildId);

    // Swap children
    tracker.swapChildren(nodeId, {
      nodeId,
      leftChildId: node.rightChildId,
      rightChildId: node.leftChildId,
    });

    // Update local map to reflect swap
    const leftId = node.leftChildId;
    node.leftChildId = node.rightChildId;
    node.rightChildId = leftId;

    tracker.markProcessed(nodeId, { nodeId, value: node.value });
  }

  invert(rootId);
  tracker.complete(null, { result: "inverted" });

  return tracker.getSteps();
}
