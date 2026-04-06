/** Step generator for BST Insert (Recursive) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_INSERT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_INSERT!);

export interface BstInsertInput {
  nodes: TreeNode[];
  rootId: string;
  insertValue: number;
}

export function generateBstInsertSteps(input: BstInsertInput): ExecutionStep[] {
  const { nodes, rootId, insertValue } = input;

  // Build a mutable copy of nodes for insertion tracking
  const mutableNodes = nodes.map((node) => ({ ...node }));
  const tracker = new BSTOperationTracker(mutableNodes, rootId, BST_INSERT_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(mutableNodes.map((node) => [node.id, node]));

  tracker.initialize(insertValue, { rootId, insertValue });

  function insert(nodeId: string | null, parentId: string | null): string {
    if (!nodeId) {
      // Create and insert new node
      const newNodeId = `n${insertValue}`;
      const parentNode = parentId ? nodeMap.get(parentId) : null;

      // Compute position based on parent
      const newPosition = parentNode
        ? {
            x: parentNode.position.x + (insertValue < parentNode.value ? -50 : 50),
            y: parentNode.position.y + 100,
          }
        : { x: 200, y: 60 };

      const newNode: TreeNode = {
        id: newNodeId,
        value: insertValue,
        parentId,
        leftChildId: null,
        rightChildId: null,
        state: "current",
        position: newPosition,
      };
      mutableNodes.push(newNode);
      nodeMap.set(newNodeId, newNode);

      // Update parent's child pointer
      if (parentNode) {
        if (insertValue < parentNode.value) {
          parentNode.leftChildId = newNodeId;
        } else {
          parentNode.rightChildId = newNodeId;
        }
      }

      tracker.insertNode(parentId, newNodeId, {
        parentNode: parentId,
        insertValue,
        newNodeId,
      });
      return newNodeId;
    }

    const node = nodeMap.get(nodeId);
    if (!node) return nodeId;

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      insertValue,
      nodeValue: node.value,
    });

    if (insertValue < node.value) {
      insert(node.leftChildId, nodeId);
    } else if (insertValue > node.value) {
      insert(node.rightChildId, nodeId);
    }

    return nodeId;
  }

  insert(rootId, null);
  tracker.complete({ insertValue, treeSize: mutableNodes.length });

  return tracker.getSteps();
}
