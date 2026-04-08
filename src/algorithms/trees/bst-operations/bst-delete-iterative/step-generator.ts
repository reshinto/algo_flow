/** Step generator for BST Delete (Iterative) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_DELETE_ITERATIVE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_DELETE_ITERATIVE!);

export interface BstDeleteIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  deleteValue: number;
}

export function generateBstDeleteIterativeSteps(input: BstDeleteIterativeInput): ExecutionStep[] {
  const { nodes, rootId, deleteValue } = input;

  const mutableNodes = nodes.map((node) => ({ ...node }));
  const tracker = new BSTOperationTracker(mutableNodes, rootId, BST_DELETE_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(mutableNodes.map((node) => [node.id, node]));

  tracker.initialize(deleteValue, { rootId, deleteValue });

  let parentId: string | null = null;
  let currentId: string | null = rootId;

  // Find the node to delete
  while (currentId !== null) {
    const node = nodeMap.get(currentId);
    if (!node) break;

    tracker.compareNode(currentId, node.value, {
      currentNode: currentId,
      deleteValue,
      nodeValue: node.value,
    });

    if (node.value === deleteValue) break;

    parentId = currentId;
    currentId = deleteValue < node.value ? node.leftChildId : node.rightChildId;
  }

  if (currentId !== null) {
    const targetNode = nodeMap.get(currentId);
    if (targetNode) {
      // Two children case: find inorder successor
      if (targetNode.leftChildId && targetNode.rightChildId) {
        let successorParentId = currentId;
        let successorId = targetNode.rightChildId;
        let successorNode = nodeMap.get(successorId);

        while (successorNode?.leftChildId) {
          successorParentId = successorId;
          successorId = successorNode.leftChildId;
          successorNode = nodeMap.get(successorId);
        }

        if (successorNode) {
          tracker.findSuccessor(successorId, { successorId, successorValue: successorNode.value });
          targetNode.value = successorNode.value;
          parentId = successorParentId;
          currentId = successorId;
        }
      }

      // Single child or leaf deletion
      tracker.deleteNode(currentId, { deleteValue, case: "leaf-or-one-child" });

      const nodeToDelete = nodeMap.get(currentId);
      const childId = nodeToDelete?.leftChildId ?? nodeToDelete?.rightChildId ?? null;
      const parentNode = parentId ? nodeMap.get(parentId) : null;

      if (parentNode) {
        if (parentNode.leftChildId === currentId) {
          parentNode.leftChildId = childId;
        } else {
          parentNode.rightChildId = childId;
        }
      }
    }
  }

  tracker.complete({ deleteValue, treeSize: mutableNodes.length });

  return tracker.getSteps();
}
