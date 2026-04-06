/** Step generator for BST Insert (Iterative) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_INSERT_ITERATIVE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_INSERT_ITERATIVE!);

export interface BstInsertIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  insertValue: number;
}

export function generateBstInsertIterativeSteps(input: BstInsertIterativeInput): ExecutionStep[] {
  const { nodes, rootId, insertValue } = input;

  const mutableNodes = nodes.map((node) => ({ ...node }));
  const tracker = new BSTOperationTracker(mutableNodes, rootId, BST_INSERT_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(mutableNodes.map((node) => [node.id, node]));

  tracker.initialize(insertValue, { rootId, insertValue });

  let currentId: string | null = rootId;
  let parentId: string | null = null;

  while (currentId !== null) {
    const node = nodeMap.get(currentId);
    if (!node) break;

    tracker.compareNode(currentId, node.value, {
      currentNode: currentId,
      insertValue,
      nodeValue: node.value,
    });

    if (insertValue === node.value) break; // Duplicate

    parentId = currentId;
    currentId = insertValue < node.value ? node.leftChildId : node.rightChildId;
  }

  if (currentId === null && parentId !== null) {
    const parentNode = nodeMap.get(parentId);
    if (parentNode) {
      const newNodeId = `n${insertValue}`;
      const newPosition = {
        x: parentNode.position.x + (insertValue < parentNode.value ? -50 : 50),
        y: parentNode.position.y + 100,
      };
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

      if (insertValue < parentNode.value) {
        parentNode.leftChildId = newNodeId;
      } else {
        parentNode.rightChildId = newNodeId;
      }

      tracker.insertNode(parentId, newNodeId, { parentNode: parentId, insertValue, newNodeId });
    }
  }

  tracker.complete({ insertValue, treeSize: mutableNodes.length });

  return tracker.getSteps();
}
