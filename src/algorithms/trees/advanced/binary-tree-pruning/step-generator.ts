/** Step generator for Binary Tree Pruning — post-order removal of zero-only subtrees. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const PRUNING_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BINARY_TREE_PRUNING!);

export interface BinaryTreePruningInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBinaryTreePruningSteps(input: BinaryTreePruningInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new AdvancedTreeTracker(nodes, rootId, PRUNING_LINE_MAP);

  // Mutable copy of the tree for pruning
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, { ...node }]));

  tracker.initialize("Binary Tree Pruning", { rootId });

  /**
   * Returns the (possibly pruned) nodeId, or null if this subtree is pruned.
   */
  function prune(nodeId: string | null): string | null {
    if (!nodeId) return null;
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    tracker.checkNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
    });

    node.leftChildId = prune(node.leftChildId);
    node.rightChildId = prune(node.rightChildId);

    if (node.value === 0 && !node.leftChildId && !node.rightChildId) {
      // This node is a leaf with value 0 — prune it
      tracker.detachNode(nodeId, {
        prunedNode: nodeId,
        value: node.value,
        reason: "leaf with value 0",
      });
      return null;
    }

    tracker.markProcessed(nodeId, {
      nodeId,
      value: node.value,
      kept: true,
    });
    return nodeId;
  }

  const survivingRootId = prune(rootId);

  tracker.complete({
    result: survivingRootId ? `Root ${survivingRootId} kept` : "Entire tree pruned",
    survivingRootId,
  });

  return tracker.getSteps();
}
