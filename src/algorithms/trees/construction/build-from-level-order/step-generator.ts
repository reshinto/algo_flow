/** Step generator for Build BST from Level-Order — produces ExecutionStep[] using TreeConstructionTracker. */

import type { ExecutionStep } from "@/types";
import { TreeConstructionTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BUILD_FROM_LEVEL_ORDER!);

export interface BuildFromLevelOrderInput {
  levelOrder: number[];
}

/** Compute a BST node's visual position based on its parent's position and which side it is on. */
function computeNodePosition(
  parentPosition: { x: number; y: number } | null,
  side: "left" | "right" | null,
  depth: number,
): { x: number; y: number } {
  if (!parentPosition || !side) {
    return { x: 200, y: 60 };
  }
  const levelHeight = 100;
  const horizontalOffset = Math.max(60 / depth, 30);
  return {
    x: side === "left" ? parentPosition.x - horizontalOffset : parentPosition.x + horizontalOffset,
    y: parentPosition.y + levelHeight,
  };
}

export function generateBuildFromLevelOrderSteps(input: BuildFromLevelOrderInput): ExecutionStep[] {
  const { levelOrder } = input;

  const tracker = new TreeConstructionTracker([], "", LINE_MAP);
  tracker.initialize({ levelOrder: [...levelOrder] });

  if (levelOrder.length === 0) {
    tracker.complete({ totalNodes: 0 });
    return tracker.getSteps();
  }

  // Track inserted nodes for BST traversal
  interface InsertedNode {
    nodeId: string;
    value: number;
    position: { x: number; y: number };
  }

  const insertedNodes = new Map<number, InsertedNode>();
  const bstLeft = new Map<number, number | null>();
  const bstRight = new Map<number, number | null>();
  let nodeCounter = 0;

  function insertIntoBST(
    rootValue: number | null,
    targetValue: number,
    parentValue: number | null,
    side: "left" | "right" | null,
    depth: number,
  ): number {
    if (rootValue === null) {
      nodeCounter++;
      const nodeId = `node-${String(nodeCounter)}`;
      const parentNode = parentValue !== null ? insertedNodes.get(parentValue) : null;
      const position = computeNodePosition(parentNode?.position ?? null, side, Math.max(depth, 1));
      insertedNodes.set(targetValue, { nodeId, value: targetValue, position });
      bstLeft.set(targetValue, null);
      bstRight.set(targetValue, null);

      tracker.buildNode(nodeId, targetValue, { nodeId, value: targetValue, depth });

      if (parentNode && side) {
        tracker.connectChild(parentNode.nodeId, nodeId, side, {
          parentId: parentNode.nodeId,
          childId: nodeId,
          side,
        });
        if (side === "left") {
          bstLeft.set(parentValue!, targetValue);
        } else {
          bstRight.set(parentValue!, targetValue);
        }
      }

      tracker.markBuilt(nodeId, { nodeId, value: targetValue });
      return targetValue;
    }

    tracker.partitionArray(rootValue, targetValue, rootValue, {
      currentValue: rootValue,
      targetValue,
      direction: targetValue < rootValue ? "left" : "right",
    });

    if (targetValue < rootValue) {
      const leftChild = bstLeft.get(rootValue) ?? null;
      insertIntoBST(leftChild, targetValue, rootValue, "left", depth + 1);
    } else if (targetValue > rootValue) {
      const rightChild = bstRight.get(rootValue) ?? null;
      insertIntoBST(rightChild, targetValue, rootValue, "right", depth + 1);
    }

    return rootValue;
  }

  let rootValue: number | null = null;

  for (const value of levelOrder) {
    tracker.selectElement(value, { value, levelOrderIndex: levelOrder.indexOf(value) });
    rootValue = insertIntoBST(rootValue, value, null, null, 0);
  }

  tracker.complete({ totalNodes: nodeCounter });

  return tracker.getSteps();
}
