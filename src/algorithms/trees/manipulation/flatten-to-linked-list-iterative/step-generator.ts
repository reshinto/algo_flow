/** Step generator for Flatten Binary Tree to Linked List Iterative — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FLATTEN_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.FLATTEN_TO_LINKED_LIST_ITERATIVE!,
);

export interface FlattenToLinkedListIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateFlattenToLinkedListIterativeSteps(
  input: FlattenToLinkedListIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, FLATTEN_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Flatten Binary Tree to Linked List (Iterative)", { rootId });

  let currentId: string | null = rootId;

  while (currentId) {
    const currentNode = nodeMap.get(currentId);
    if (!currentNode) break;

    if (currentNode.leftChildId) {
      // Find the rightmost node of the left subtree
      let rightmostId = currentNode.leftChildId;
      while (true) {
        const rightmostNode = nodeMap.get(rightmostId);
        if (!rightmostNode?.rightChildId) break;
        rightmostId = rightmostNode.rightChildId;
      }

      const rightmostNode = nodeMap.get(rightmostId);
      const leftId = currentNode.leftChildId;
      const rightId = currentNode.rightChildId;

      // Attach original right subtree at the rightmost node
      if (rightmostNode) {
        rightmostNode.rightChildId = rightId;
        if (rightId) {
          const rightNode = nodeMap.get(rightId);
          if (rightNode) rightNode.parentId = rightmostId;
        }
      }

      // Move left subtree to right
      tracker.moveNode(leftId, currentId, "right", {
        currentId,
        movedChildId: leftId,
        originalRightId: rightId,
      });

      currentNode.rightChildId = leftId;
      const leftNode = nodeMap.get(leftId);
      if (leftNode) leftNode.parentId = currentId;

      // Clear left pointer
      currentNode.leftChildId = null;
      tracker.detachNode(currentId, { currentId, side: "left" });
    }

    tracker.markProcessed(currentId, { currentId, value: currentNode.value });
    currentId = currentNode.rightChildId;
  }

  tracker.complete(null, { result: "flattened" });
  return tracker.getSteps();
}
