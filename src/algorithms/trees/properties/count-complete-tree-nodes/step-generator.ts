/** Step generator for Count Complete Tree Nodes — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COUNT_COMPLETE_TREE_NODES!);

export interface CountCompleteTreeNodesInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateCountCompleteTreeNodesSteps(
  input: CountCompleteTreeNodesInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  function countNodes(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value });

    // Compute leftmost height
    let leftHeight = 0;
    let leftCursorId: string | null = nodeId;
    while (leftCursorId) {
      leftHeight += 1;
      leftCursorId = nodeMap.get(leftCursorId)?.leftChildId ?? null;
    }

    // Compute rightmost height
    let rightHeight = 0;
    let rightCursorId: string | null = nodeId;
    while (rightCursorId) {
      rightHeight += 1;
      rightCursorId = nodeMap.get(rightCursorId)?.rightChildId ?? null;
    }

    if (leftHeight === rightHeight) {
      const perfectCount = Math.pow(2, leftHeight) - 1;
      tracker.recordResult(perfectCount, {
        currentNode: nodeId,
        leftHeight,
        rightHeight,
        perfectCount,
      });
      return perfectCount;
    }

    const leftCount = countNodes(node.leftChildId);
    const rightCount = countNodes(node.rightChildId);
    return leftCount + rightCount + 1;
  }

  const result = countNodes(rootId);
  tracker.recordResult(result, { result });
  tracker.complete({ result });

  return tracker.getSteps();
}
