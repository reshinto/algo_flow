/** Step generator for Diameter of Binary Tree — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DIAMETER_OF_BINARY_TREE!);

export interface DiameterOfBinaryTreeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateDiameterOfBinaryTreeSteps(
  input: DiameterOfBinaryTreeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  let maxDiameter = 0;

  function computeHeight(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value });

    const leftHeight = computeHeight(node.leftChildId);
    const rightHeight = computeHeight(node.rightChildId);

    const localDiameter = leftHeight + rightHeight;
    if (localDiameter > maxDiameter) {
      maxDiameter = localDiameter;
    }

    const height = Math.max(leftHeight, rightHeight) + 1;
    tracker.updateHeight(nodeId, height, { currentNode: nodeId, height, diameter: maxDiameter });
    return height;
  }

  computeHeight(rootId);
  tracker.recordResult(maxDiameter, { result: maxDiameter });
  tracker.complete({ result: maxDiameter });

  return tracker.getSteps();
}
