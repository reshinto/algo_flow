/** Step generator for Binary Tree Tilt — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BINARY_TREE_TILT!);

export interface BinaryTreeTiltInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBinaryTreeTiltSteps(input: BinaryTreeTiltInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  let totalTilt = 0;

  function subtreeSum(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value });

    const leftSum = subtreeSum(node.leftChildId);
    const rightSum = subtreeSum(node.rightChildId);

    const nodeTilt = Math.abs(leftSum - rightSum);
    totalTilt += nodeTilt;

    tracker.updateHeight(nodeId, totalTilt, {
      currentNode: nodeId,
      leftSum,
      rightSum,
      nodeTilt,
      totalTilt,
    });
    return leftSum + rightSum + node.value;
  }

  subtreeSum(rootId);
  tracker.recordResult(totalTilt, { result: totalTilt });
  tracker.complete({ result: totalTilt });

  return tracker.getSteps();
}
