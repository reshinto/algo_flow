/** Step generator for Zigzag Level-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ZIGZAG_LEVEL_ORDER!);

export interface ZigzagLevelOrderInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateZigzagLevelOrderSteps(input: ZigzagLevelOrderInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, queue: [rootId], leftToRight: true });

  const queue: string[] = [rootId];
  let leftToRight = true;
  let currentLevel = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelIds: string[] = [];

    for (let nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
      const currentId = queue.shift();
      if (!currentId) break;
      const currentNode = nodeMap.get(currentId);
      if (!currentNode) break;

      levelIds.push(currentId);

      if (currentNode.leftChildId) {
        queue.push(currentNode.leftChildId);
        tracker.traverseLeft(currentId, {
          currentNode: currentId,
          direction: leftToRight ? "left-to-right" : "right-to-left",
          queueSize: queue.length,
        });
      }

      if (currentNode.rightChildId) {
        queue.push(currentNode.rightChildId);
        tracker.traverseRight(currentId, {
          currentNode: currentId,
          direction: leftToRight ? "left-to-right" : "right-to-left",
          queueSize: queue.length,
        });
      }
    }

    // Visit in zigzag order: left-to-right or right-to-left
    const orderedIds = leftToRight ? levelIds : [...levelIds].reverse();
    for (const nodeId of orderedIds) {
      const currentNode = nodeMap.get(nodeId);
      if (!currentNode) continue;
      tracker.visitNode(nodeId, currentNode.value, {
        currentNode: nodeId,
        value: currentNode.value,
        level: currentLevel,
        direction: leftToRight ? "left-to-right" : "right-to-left",
      });
    }

    leftToRight = !leftToRight;
    currentLevel += 1;
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
