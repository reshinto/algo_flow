/** Step generator for BST Delete (Recursive) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_DELETE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_DELETE!);

export interface BstDeleteInput {
  nodes: TreeNode[];
  rootId: string;
  deleteValue: number;
}

export function generateBstDeleteSteps(input: BstDeleteInput): ExecutionStep[] {
  const { nodes, rootId, deleteValue } = input;

  const mutableNodes = nodes.map((node) => ({ ...node }));
  const tracker = new BSTOperationTracker(mutableNodes, rootId, BST_DELETE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(mutableNodes.map((node) => [node.id, node]));

  tracker.initialize(deleteValue, { rootId, deleteValue });

  function findSuccessor(nodeId: string): string {
    let successorId = nodeId;
    const node = nodeMap.get(nodeId);
    if (!node?.leftChildId) return successorId;
    let leftId: string | null = node.leftChildId;
    while (leftId) {
      successorId = leftId;
      const leftNode = nodeMap.get(leftId);
      leftId = leftNode?.leftChildId ?? null;
    }
    return successorId;
  }

  function deleteNode(nodeId: string | null): string | null {
    if (!nodeId) return null;
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      deleteValue,
      nodeValue: node.value,
    });

    if (deleteValue < node.value) {
      const newLeft = deleteNode(node.leftChildId);
      node.leftChildId = newLeft;
      return nodeId;
    } else if (deleteValue > node.value) {
      const newRight = deleteNode(node.rightChildId);
      node.rightChildId = newRight;
      return nodeId;
    } else {
      // Found — handle 3 cases
      if (!node.leftChildId && !node.rightChildId) {
        tracker.deleteNode(nodeId, { case: "leaf", deleteValue });
        return null;
      }
      if (!node.leftChildId) {
        tracker.deleteNode(nodeId, { case: "one-child-right", deleteValue });
        return node.rightChildId;
      }
      if (!node.rightChildId) {
        tracker.deleteNode(nodeId, { case: "one-child-left", deleteValue });
        return node.leftChildId;
      }

      // Two children — find inorder successor
      const successorId = findSuccessor(node.rightChildId);
      const successor = nodeMap.get(successorId);
      if (successor) {
        tracker.findSuccessor(successorId, { successorId, successorValue: successor.value });
        node.value = successor.value;
        const newRight = deleteNode(node.rightChildId);
        node.rightChildId = newRight;
      }
      return nodeId;
    }
  }

  deleteNode(rootId);
  tracker.complete({ deleteValue, treeSize: mutableNodes.length });

  return tracker.getSteps();
}
