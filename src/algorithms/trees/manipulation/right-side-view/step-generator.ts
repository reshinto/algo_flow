/** Step generator for Right Side View (BFS) — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const RIGHT_SIDE_VIEW_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.RIGHT_SIDE_VIEW!);

export interface RightSideViewInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateRightSideViewSteps(input: RightSideViewInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, RIGHT_SIDE_VIEW_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Right Side View (BFS)", { rootId, result: [] });

  const bfsQueue: string[] = [rootId];
  const result: number[] = [];

  while (bfsQueue.length > 0) {
    const levelSize = bfsQueue.length;

    for (let position = 0; position < levelSize; position++) {
      const currentId = bfsQueue.shift();
      if (!currentId) continue;
      const currentNode = nodeMap.get(currentId);
      if (!currentNode) continue;

      if (position === levelSize - 1) {
        // Rightmost node at this level
        result.push(currentNode.value);
        tracker.markProcessed(currentId, {
          currentId,
          value: currentNode.value,
          isRightmost: true,
          result: [...result],
        });
      } else {
        tracker.compareNodes(currentId, currentId, {
          currentId,
          value: currentNode.value,
          isRightmost: false,
        });
      }

      if (currentNode.leftChildId) bfsQueue.push(currentNode.leftChildId);
      if (currentNode.rightChildId) bfsQueue.push(currentNode.rightChildId);
    }
  }

  tracker.complete(null, { result });
  return tracker.getSteps();
}
