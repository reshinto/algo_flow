/** Step generator for Level-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LEVEL_ORDER_TRAVERSAL!);

export interface LevelOrderTraversalInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateLevelOrderTraversalSteps(input: LevelOrderTraversalInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, queue: [rootId], level: 0 });

  const queue: string[] = [rootId];
  let currentLevel = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelNodeIds: string[] = [];

    // Dequeue and visit each node at this level
    for (let nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
      const currentId = queue.shift();
      if (!currentId) break;
      const currentNode = nodeMap.get(currentId);
      if (!currentNode) break;

      levelNodeIds.push(currentId);
      tracker.visitNode(currentId, currentNode.value, {
        currentNode: currentId,
        value: currentNode.value,
        level: currentLevel,
        queueSize: queue.length,
      });

      // Enqueue children for next level
      if (currentNode.leftChildId) {
        queue.push(currentNode.leftChildId);
        tracker.traverseLeft(currentId, {
          currentNode: currentId,
          nextLevel: currentLevel + 1,
          queueSize: queue.length,
        });
      }

      if (currentNode.rightChildId) {
        queue.push(currentNode.rightChildId);
        tracker.traverseRight(currentId, {
          currentNode: currentId,
          nextLevel: currentLevel + 1,
          queueSize: queue.length,
        });
      }
    }

    currentLevel += 1;
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
