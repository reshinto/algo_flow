/** Step generator for Reverse Level-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.REVERSE_LEVEL_ORDER!);

export interface ReverseLevelOrderInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateReverseLevelOrderSteps(input: ReverseLevelOrderInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, queue: [rootId] });

  const queue: string[] = [rootId];
  // Collect levels top-down, then visit bottom-up
  const allLevels: string[][] = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevelIds: string[] = [];

    for (let nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
      const currentId = queue.shift();
      if (!currentId) break;
      const currentNode = nodeMap.get(currentId);
      if (!currentNode) break;

      currentLevelIds.push(currentId);

      if (currentNode.leftChildId) {
        queue.push(currentNode.leftChildId);
        tracker.traverseLeft(currentId, {
          currentNode: currentId,
          queueSize: queue.length,
        });
      }

      if (currentNode.rightChildId) {
        queue.push(currentNode.rightChildId);
        tracker.traverseRight(currentId, {
          currentNode: currentId,
          queueSize: queue.length,
        });
      }
    }

    allLevels.push(currentLevelIds);
  }

  // Visit levels in reverse order (bottom-up)
  for (let levelIndex = allLevels.length - 1; levelIndex >= 0; levelIndex--) {
    const levelIds = allLevels[levelIndex];
    if (!levelIds) continue;
    for (const nodeId of levelIds) {
      const currentNode = nodeMap.get(nodeId);
      if (!currentNode) continue;
      tracker.visitNode(nodeId, currentNode.value, {
        currentNode: nodeId,
        value: currentNode.value,
        level: levelIndex,
      });
    }
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
