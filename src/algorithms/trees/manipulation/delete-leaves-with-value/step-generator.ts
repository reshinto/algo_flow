/** Step generator for Delete Leaves With Value — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DELETE_LEAVES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DELETE_LEAVES_WITH_VALUE!);

export interface DeleteLeavesWithValueInput {
  nodes: TreeNode[];
  rootId: string;
  targetValue: number;
}

export function generateDeleteLeavesWithValueSteps(
  input: DeleteLeavesWithValueInput,
): ExecutionStep[] {
  const { nodes, rootId, targetValue } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, DELETE_LEAVES_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Delete Leaves With Value", { rootId, targetValue });

  function processNode(nodeId: string | null): string | null {
    if (!nodeId) return null;
    const currentNode = nodeMap.get(nodeId);
    if (!currentNode) return null;

    // Recursively process children
    const newLeftId = processNode(currentNode.leftChildId);
    const newRightId = processNode(currentNode.rightChildId);

    // Update node map to reflect any deletions
    currentNode.leftChildId = newLeftId;
    currentNode.rightChildId = newRightId;

    // Check if now a leaf with the target value
    const isLeaf = !newLeftId && !newRightId;

    tracker.compareNodes(nodeId, nodeId, {
      nodeId,
      value: currentNode.value,
      targetValue,
      isLeaf,
    });

    if (isLeaf && currentNode.value === targetValue) {
      tracker.detachNode(nodeId, { nodeId, value: currentNode.value, deleted: true });
      return null;
    }

    tracker.markProcessed(nodeId, { nodeId, value: currentNode.value, kept: true });
    return nodeId;
  }

  const newRootId = processNode(rootId);
  tracker.complete(null, { result: newRootId ?? "empty tree" });

  return tracker.getSteps();
}
