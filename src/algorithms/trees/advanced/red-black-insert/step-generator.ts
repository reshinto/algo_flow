/** Step generator for Red-Black Tree Insert — inserts values with color fixes and rotations. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RB_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RED_BLACK_INSERT!);

export interface RedBlackInsertInput {
  values: number[];
}

type RBColor = "red" | "black";

interface RBNode {
  id: string;
  value: number;
  color: RBColor;
  leftId: string | null;
  rightId: string | null;
  parentId: string | null;
}

const NULL_ID = "__nil__";

function toTreeNodes(rbNodes: Map<string, RBNode>, rootId: string | null): TreeNode[] {
  const posMap = new Map<string, { x: number; y: number }>();

  function assignPos(nodeId: string | null, depth: number, minX: number, maxX: number): void {
    if (!nodeId || nodeId === NULL_ID) return;
    const node = rbNodes.get(nodeId);
    if (!node) return;
    const midX = (minX + maxX) / 2;
    posMap.set(nodeId, { x: midX, y: depth * 80 + 40 });
    assignPos(node.leftId, depth + 1, minX, midX);
    assignPos(node.rightId, depth + 1, midX, maxX);
  }

  assignPos(rootId, 0, 20, 480);

  return Array.from(rbNodes.values())
    .filter((node) => node.id !== NULL_ID)
    .map((node) => ({
      id: node.id,
      value: node.value,
      parentId: node.parentId === NULL_ID ? null : node.parentId,
      leftChildId: node.leftId === NULL_ID ? null : node.leftId,
      rightChildId: node.rightId === NULL_ID ? null : node.rightId,
      // Red nodes use "comparing" state, black use "visited"
      state: node.color === "red" ? ("comparing" as const) : ("visited" as const),
      position: posMap.get(node.id) ?? { x: 200, y: 40 },
    }));
}

export function generateRedBlackInsertSteps(input: RedBlackInsertInput): ExecutionStep[] {
  const { values } = input;
  const rbNodes = new Map<string, RBNode>();
  let rootId: string | null = null;
  let nodeCounter = 0;

  const tracker = new AdvancedTreeTracker([], "root", RB_LINE_MAP);
  tracker.initialize("Red-Black Tree Insert", { values });

  function makeId(): string {
    nodeCounter += 1;
    return `rb${nodeCounter}`;
  }

  function syncTracker(): void {
    const treeNodes = toTreeNodes(rbNodes, rootId);
    tracker.updateNodes(treeNodes, rootId ?? "root");
  }

  function getNode(nodeId: string | null): RBNode | null {
    if (!nodeId || nodeId === NULL_ID) return null;
    return rbNodes.get(nodeId) ?? null;
  }

  function rotateLeft(pivotId: string): void {
    const pivot = getNode(pivotId)!;
    const rightId = pivot.rightId!;
    const rightNode = getNode(rightId)!;

    pivot.rightId = rightNode.leftId;
    if (rightNode.leftId && rightNode.leftId !== NULL_ID) {
      getNode(rightNode.leftId)!.parentId = pivotId;
    }
    rightNode.parentId = pivot.parentId;
    if (!pivot.parentId || pivot.parentId === NULL_ID) {
      rootId = rightId;
    } else {
      const parent = getNode(pivot.parentId)!;
      if (parent.leftId === pivotId) parent.leftId = rightId;
      else parent.rightId = rightId;
    }
    rightNode.leftId = pivotId;
    pivot.parentId = rightId;

    syncTracker();
    tracker.rotateLeft(rightId, { pivot: pivot.value, newRoot: rightNode.value });
  }

  function rotateRight(pivotId: string): void {
    const pivot = getNode(pivotId)!;
    const leftId = pivot.leftId!;
    const leftNode = getNode(leftId)!;

    pivot.leftId = leftNode.rightId;
    if (leftNode.rightId && leftNode.rightId !== NULL_ID) {
      getNode(leftNode.rightId)!.parentId = pivotId;
    }
    leftNode.parentId = pivot.parentId;
    if (!pivot.parentId || pivot.parentId === NULL_ID) {
      rootId = leftId;
    } else {
      const parent = getNode(pivot.parentId)!;
      if (parent.rightId === pivotId) parent.rightId = leftId;
      else parent.leftId = leftId;
    }
    leftNode.rightId = pivotId;
    pivot.parentId = leftId;

    syncTracker();
    tracker.rotateRight(leftId, { pivot: pivot.value, newRoot: leftNode.value });
  }

  function fixInsert(insertedId: string): void {
    let currentId = insertedId;
    let currentNode = getNode(currentId)!;

    while (currentNode.parentId && getNode(currentNode.parentId)?.color === "red") {
      const parentId = currentNode.parentId;
      const parentNode = getNode(parentId)!;
      const grandparentId = parentNode.parentId!;
      const grandparentNode = getNode(grandparentId)!;

      if (parentId === grandparentNode.leftId) {
        const uncleId = grandparentNode.rightId;
        const uncleNode = getNode(uncleId ?? null);
        if (uncleNode?.color === "red") {
          // Case 1: recolor
          parentNode.color = "black";
          uncleNode.color = "black";
          grandparentNode.color = "red";
          syncTracker();
          tracker.recolorNode(parentId, "black", { node: parentNode.value, color: "black" });
          tracker.recolorNode(uncleId!, "black", { node: uncleNode.value, color: "black" });
          tracker.recolorNode(grandparentId, "red", { node: grandparentNode.value, color: "red" });
          currentId = grandparentId;
          currentNode = getNode(currentId)!;
        } else {
          if (currentId === parentNode.rightId) {
            // Case 2: triangle — rotate left at parent
            currentId = parentId;
            currentNode = getNode(currentId)!;
            rotateLeft(currentId);
          }
          // Case 3: line — rotate right at grandparent
          const updatedParent = getNode(currentNode.parentId!)!;
          updatedParent.color = "black";
          grandparentNode.color = "red";
          syncTracker();
          tracker.recolorNode(currentNode.parentId!, "black", { color: "black" });
          tracker.recolorNode(grandparentId, "red", { color: "red" });
          rotateRight(grandparentId);
        }
      } else {
        const uncleId = grandparentNode.leftId;
        const uncleNode = getNode(uncleId ?? null);
        if (uncleNode?.color === "red") {
          parentNode.color = "black";
          uncleNode.color = "black";
          grandparentNode.color = "red";
          syncTracker();
          tracker.recolorNode(parentId, "black", { node: parentNode.value, color: "black" });
          tracker.recolorNode(uncleId!, "black", { node: uncleNode.value, color: "black" });
          tracker.recolorNode(grandparentId, "red", { node: grandparentNode.value, color: "red" });
          currentId = grandparentId;
          currentNode = getNode(currentId)!;
        } else {
          if (currentId === parentNode.leftId) {
            currentId = parentId;
            currentNode = getNode(currentId)!;
            rotateRight(currentId);
          }
          const updatedParent = getNode(currentNode.parentId!)!;
          updatedParent.color = "black";
          grandparentNode.color = "red";
          syncTracker();
          tracker.recolorNode(currentNode.parentId!, "black", { color: "black" });
          tracker.recolorNode(grandparentId, "red", { color: "red" });
          rotateLeft(grandparentId);
        }
      }

      if (!currentNode.parentId || currentNode.parentId === NULL_ID) break;
    }

    if (rootId) {
      const rootNode = getNode(rootId)!;
      rootNode.color = "black";
      syncTracker();
      tracker.recolorNode(rootId, "black", { node: rootNode.value, color: "black (root)" });
    }
  }

  function insertValue(value: number): void {
    const newId = makeId();
    rbNodes.set(newId, {
      id: newId,
      value,
      color: "red",
      leftId: null,
      rightId: null,
      parentId: null,
    });

    if (!rootId) {
      rootId = newId;
      rbNodes.get(newId)!.color = "black";
      syncTracker();
      tracker.insertNode(newId, value, { inserted: value, color: "black" });
      return;
    }

    let currentId: string = rootId;
    while (true) {
      const currentNode = getNode(currentId)!;
      if (value < currentNode.value) {
        if (!currentNode.leftId) {
          currentNode.leftId = newId;
          rbNodes.get(newId)!.parentId = currentId;
          break;
        }
        currentId = currentNode.leftId;
      } else {
        if (!currentNode.rightId) {
          currentNode.rightId = newId;
          rbNodes.get(newId)!.parentId = currentId;
          break;
        }
        currentId = currentNode.rightId;
      }
    }

    syncTracker();
    tracker.insertNode(newId, value, { inserted: value, color: "red" });
    fixInsert(newId);
  }

  for (const value of values) {
    insertValue(value);
  }

  tracker.complete({ result: `Red-Black tree with ${rbNodes.size} nodes` });

  return tracker.getSteps();
}
