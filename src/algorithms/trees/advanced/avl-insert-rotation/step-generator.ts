/** Step generator for AVL Insert Rotation — inserts values one by one, triggering rotations. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const AVL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.AVL_INSERT_ROTATION!);

export interface AvlInsertRotationInput {
  values: number[];
}

interface AvlNode {
  id: string;
  value: number;
  height: number;
  leftId: string | null;
  rightId: string | null;
  parentId: string | null;
}

function getHeight(nodes: Map<string, AvlNode>, nodeId: string | null): number {
  if (!nodeId) return 0;
  return nodes.get(nodeId)?.height ?? 0;
}

function updateHeightAvl(nodes: Map<string, AvlNode>, nodeId: string): void {
  const node = nodes.get(nodeId);
  if (!node) return;
  node.height = 1 + Math.max(getHeight(nodes, node.leftId), getHeight(nodes, node.rightId));
}

function balanceFactorAvl(nodes: Map<string, AvlNode>, nodeId: string): number {
  const node = nodes.get(nodeId);
  if (!node) return 0;
  return getHeight(nodes, node.leftId) - getHeight(nodes, node.rightId);
}

function toTreeNodes(avlNodes: Map<string, AvlNode>, rootId: string | null): TreeNode[] {
  const posMap = new Map<string, { x: number; y: number }>();

  function assignPos(nodeId: string | null, depth: number, minX: number, maxX: number): void {
    if (!nodeId) return;
    const node = avlNodes.get(nodeId);
    if (!node) return;
    const midX = (minX + maxX) / 2;
    posMap.set(nodeId, { x: midX, y: depth * 80 + 40 });
    assignPos(node.leftId, depth + 1, minX, midX);
    assignPos(node.rightId, depth + 1, midX, maxX);
  }

  assignPos(rootId, 0, 20, 480);

  return Array.from(avlNodes.values()).map((node) => ({
    id: node.id,
    value: node.value,
    parentId: node.parentId,
    leftChildId: node.leftId,
    rightChildId: node.rightId,
    state: "default" as const,
    position: posMap.get(node.id) ?? { x: 200, y: 40 },
  }));
}

export function generateAvlInsertRotationSteps(input: AvlInsertRotationInput): ExecutionStep[] {
  const { values } = input;
  const avlNodes = new Map<string, AvlNode>();
  let rootId: string | null = null;
  let nodeCounter = 0;

  const tracker = new AdvancedTreeTracker([], "root", AVL_LINE_MAP);
  tracker.initialize("AVL Insert Rotation", { values });

  function makeId(): string {
    nodeCounter += 1;
    return `avl${nodeCounter}`;
  }

  function syncTracker(): void {
    const treeNodes = toTreeNodes(avlNodes, rootId);
    tracker.updateNodes(treeNodes, rootId ?? "root");
  }

  function rotateRight(pivotId: string): string {
    const pivot = avlNodes.get(pivotId)!;
    const leftChildId = pivot.leftId!;
    const leftChild = avlNodes.get(leftChildId)!;

    pivot.leftId = leftChild.rightId;
    if (leftChild.rightId) {
      avlNodes.get(leftChild.rightId)!.parentId = pivotId;
    }
    leftChild.rightId = pivotId;
    leftChild.parentId = pivot.parentId;
    pivot.parentId = leftChildId;

    if (rootId === pivotId) rootId = leftChildId;

    updateHeightAvl(avlNodes, pivotId);
    updateHeightAvl(avlNodes, leftChildId);

    syncTracker();
    tracker.rotateRight(leftChildId, {
      pivot: pivot.value,
      newRoot: leftChild.value,
      type: "right",
    });
    return leftChildId;
  }

  function rotateLeft(pivotId: string): string {
    const pivot = avlNodes.get(pivotId)!;
    const rightChildId = pivot.rightId!;
    const rightChild = avlNodes.get(rightChildId)!;

    pivot.rightId = rightChild.leftId;
    if (rightChild.leftId) {
      avlNodes.get(rightChild.leftId)!.parentId = pivotId;
    }
    rightChild.leftId = pivotId;
    rightChild.parentId = pivot.parentId;
    pivot.parentId = rightChildId;

    if (rootId === pivotId) rootId = rightChildId;

    updateHeightAvl(avlNodes, pivotId);
    updateHeightAvl(avlNodes, rightChildId);

    syncTracker();
    tracker.rotateLeft(rightChildId, {
      pivot: pivot.value,
      newRoot: rightChild.value,
      type: "left",
    });
    return rightChildId;
  }

  function insert(nodeId: string | null, value: number, parentId: string | null): string {
    if (!nodeId) {
      const newId = makeId();
      avlNodes.set(newId, {
        id: newId,
        value,
        height: 1,
        leftId: null,
        rightId: null,
        parentId,
      });
      syncTracker();
      tracker.insertNode(newId, value, { inserted: value, nodeId: newId });
      return newId;
    }

    const node = avlNodes.get(nodeId)!;
    if (value < node.value) {
      node.leftId = insert(node.leftId, value, nodeId);
    } else if (value > node.value) {
      node.rightId = insert(node.rightId, value, nodeId);
    } else {
      return nodeId;
    }

    updateHeightAvl(avlNodes, nodeId);
    const balance = balanceFactorAvl(avlNodes, nodeId);

    syncTracker();
    tracker.checkBalance(nodeId, balance, { node: node.value, balance });

    // LL case
    if (balance > 1 && node.leftId && value < avlNodes.get(node.leftId)!.value) {
      return rotateRight(nodeId);
    }
    // RR case
    if (balance < -1 && node.rightId && value > avlNodes.get(node.rightId)!.value) {
      return rotateLeft(nodeId);
    }
    // LR case
    if (balance > 1 && node.leftId) {
      node.leftId = rotateLeft(node.leftId);
      return rotateRight(nodeId);
    }
    // RL case
    if (balance < -1 && node.rightId) {
      node.rightId = rotateRight(node.rightId);
      return rotateLeft(nodeId);
    }

    return nodeId;
  }

  for (const value of values) {
    rootId = insert(rootId, value, null);
  }

  tracker.complete({ result: `AVL tree balanced with ${avlNodes.size} nodes`, rootId });

  return tracker.getSteps();
}
