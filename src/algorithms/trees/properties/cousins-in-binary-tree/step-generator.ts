/** Step generator for Cousins in Binary Tree — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.COUSINS_IN_BINARY_TREE!);

export interface CousinsInBinaryTreeInput {
  nodes: TreeNode[];
  rootId: string;
  nodeValueA: number;
  nodeValueB: number;
}

export function generateCousinsInBinaryTreeSteps(input: CousinsInBinaryTreeInput): ExecutionStep[] {
  const { nodes, rootId, nodeValueA, nodeValueB } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, nodeValueA, nodeValueB });

  const queue: Array<[string, string | null, number]> = [[rootId, null, 0]];
  let parentAId: string | null = null;
  let parentBId: string | null = null;
  let depthA = -1;
  let depthB = -1;

  while (queue.length > 0) {
    const entry = queue.shift()!;
    const [nodeId, parentId, depth] = entry;
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, depth, parent: parentId });

    if (node.value === nodeValueA) {
      parentAId = parentId;
      depthA = depth;
      tracker.updateDepth(nodeId, depth, {
        currentNode: nodeId,
        foundNodeA: nodeValueA,
        depth,
        parent: parentId,
      });
    }

    if (node.value === nodeValueB) {
      parentBId = parentId;
      depthB = depth;
      tracker.updateDepth(nodeId, depth, {
        currentNode: nodeId,
        foundNodeB: nodeValueB,
        depth,
        parent: parentId,
      });
    }

    if (node.leftChildId) queue.push([node.leftChildId, nodeId, depth + 1]);
    if (node.rightChildId) queue.push([node.rightChildId, nodeId, depth + 1]);
  }

  const areCousins = depthA === depthB && parentAId !== parentBId;
  tracker.recordResult(areCousins, { result: areCousins, depthA, depthB, parentAId, parentBId });
  tracker.complete({ result: areCousins });

  return tracker.getSteps();
}
