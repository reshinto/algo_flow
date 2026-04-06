/** Step generator for Maximum Depth (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAXIMUM_DEPTH_ITERATIVE!);

export interface MaximumDepthIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateMaximumDepthIterativeSteps(
  input: MaximumDepthIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const queue: string[] = [rootId];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    depth += 1;

    for (let nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) {
      const nodeId = queue.shift()!;
      const node = nodeMap.get(nodeId);
      if (!node) continue;

      tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, depth });

      if (node.leftChildId) queue.push(node.leftChildId);
      if (node.rightChildId) queue.push(node.rightChildId);
    }

    tracker.updateDepth(rootId, depth, { depth, levelSize });
  }

  tracker.recordResult(depth, { result: depth });
  tracker.complete({ result: depth });

  return tracker.getSteps();
}
