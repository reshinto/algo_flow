/** Step generator for Is Balanced Tree — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IS_BALANCED_TREE!);

export interface IsBalancedTreeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateIsBalancedTreeSteps(input: IsBalancedTreeInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  // Returns -1 if unbalanced, height otherwise
  function checkHeight(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value });

    const leftHeight = checkHeight(node.leftChildId);
    if (leftHeight === -1) {
      tracker.markInvalid(nodeId, { currentNode: nodeId, reason: "left subtree unbalanced" });
      return -1;
    }

    const rightHeight = checkHeight(node.rightChildId);
    if (rightHeight === -1) {
      tracker.markInvalid(nodeId, { currentNode: nodeId, reason: "right subtree unbalanced" });
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      tracker.markInvalid(nodeId, {
        currentNode: nodeId,
        leftHeight,
        rightHeight,
        diff: Math.abs(leftHeight - rightHeight),
      });
      return -1;
    }

    const height = Math.max(leftHeight, rightHeight) + 1;
    tracker.markValid(nodeId, { currentNode: nodeId, leftHeight, rightHeight, height });
    return height;
  }

  const heightResult = checkHeight(rootId);
  const isBalanced = heightResult !== -1;
  tracker.recordResult(isBalanced, { result: isBalanced });
  tracker.complete({ result: isBalanced });

  return tracker.getSteps();
}
