/** Step generator for Minimum Depth (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MINIMUM_DEPTH_ITERATIVE!);

export interface MinimumDepthIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateMinimumDepthIterativeSteps(
  input: MinimumDepthIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const queue: Array<[string, number]> = [[rootId, 1]];
  let result = 0;

  while (queue.length > 0) {
    const entry = queue.shift()!;
    const [nodeId, depth] = entry;
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, depth });

    if (!node.leftChildId && !node.rightChildId) {
      result = depth;
      tracker.updateDepth(nodeId, depth, { currentNode: nodeId, depth, isLeaf: true });
      break;
    }

    if (node.leftChildId) queue.push([node.leftChildId, depth + 1]);
    if (node.rightChildId) queue.push([node.rightChildId, depth + 1]);
  }

  tracker.recordResult(result, { result });
  tracker.complete({ result });

  return tracker.getSteps();
}
