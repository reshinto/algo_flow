/** Step generator for Flatten Binary Tree to Linked List — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FLATTEN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLATTEN_TO_LINKED_LIST!);

export interface FlattenToLinkedListInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateFlattenToLinkedListSteps(input: FlattenToLinkedListInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, FLATTEN_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Flatten Binary Tree to Linked List", { rootId });

  function flatten(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    const leftId = node.leftChildId;
    const rightId = node.rightChildId;

    // Recursively flatten subtrees
    flatten(leftId);
    flatten(rightId);

    if (leftId) {
      // Find the tail of the flattened left subtree
      let tailId = leftId;
      while (true) {
        const tailNode = nodeMap.get(tailId);
        if (!tailNode?.rightChildId) break;
        tailId = tailNode.rightChildId;
      }

      // Attach original right subtree at the tail
      const tailNode = nodeMap.get(tailId);
      if (tailNode) {
        tailNode.rightChildId = rightId;
        if (rightId) {
          const rightNode = nodeMap.get(rightId);
          if (rightNode) rightNode.parentId = tailId;
        }
      }

      // Move left subtree to right, clear left
      tracker.moveNode(leftId, nodeId, "right", {
        nodeId,
        movedChildId: leftId,
        originalRightId: rightId,
      });

      node.rightChildId = leftId;
      node.leftChildId = null;

      const leftNode = nodeMap.get(leftId);
      if (leftNode) leftNode.parentId = nodeId;

      // Update tracker's node to reflect cleared left
      tracker.detachNode(nodeId, { nodeId, side: "left" });

      // Reflect the null left in our node
      node.leftChildId = null;
    }

    tracker.markProcessed(nodeId, { nodeId, value: node.value });
  }

  flatten(rootId);
  tracker.complete(null, { result: "flattened" });

  return tracker.getSteps();
}
