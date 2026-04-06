/** Step generator for Maximum Path Sum — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MAXIMUM_PATH_SUM!);

export interface MaximumPathSumInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateMaximumPathSumSteps(input: MaximumPathSumInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const rootNode = nodeMap.get(rootId);
  let globalMax = rootNode ? rootNode.value : -Infinity;

  function maxGain(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value });

    const leftGain = Math.max(maxGain(node.leftChildId), 0);
    const rightGain = Math.max(maxGain(node.rightChildId), 0);

    const pathThroughNode = node.value + leftGain + rightGain;
    if (pathThroughNode > globalMax) {
      globalMax = pathThroughNode;
    }

    tracker.updateHeight(nodeId, globalMax, {
      currentNode: nodeId,
      leftGain,
      rightGain,
      pathThroughNode,
      globalMax,
    });
    return node.value + Math.max(leftGain, rightGain);
  }

  maxGain(rootId);
  tracker.recordResult(globalMax, { result: globalMax });
  tracker.complete({ result: globalMax });

  return tracker.getSteps();
}
