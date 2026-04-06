/** Step generator for Path Sum (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PATH_SUM_ITERATIVE!);

export interface PathSumIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  targetSum: number;
}

export function generatePathSumIterativeSteps(input: PathSumIterativeInput): ExecutionStep[] {
  const { nodes, rootId, targetSum } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, targetSum });

  const rootNode = nodeMap.get(rootId);
  if (!rootNode) {
    tracker.recordResult(false, { result: false });
    tracker.complete({ result: false });
    return tracker.getSteps();
  }

  const stack: Array<[string, number]> = [[rootId, rootNode.value]];
  let found = false;

  while (stack.length > 0 && !found) {
    const entry = stack.pop()!;
    const [nodeId, runningSum] = entry;
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    tracker.checkNode(nodeId, { currentNode: nodeId, value: node.value, runningSum });

    if (!node.leftChildId && !node.rightChildId) {
      if (runningSum === targetSum) {
        found = true;
        tracker.markValid(nodeId, {
          currentNode: nodeId,
          runningSum,
          targetSum,
          pathSumFound: true,
        });
      } else {
        tracker.markInvalid(nodeId, { currentNode: nodeId, runningSum, targetSum });
      }
    }

    if (node.rightChildId) {
      const rightNode = nodeMap.get(node.rightChildId);
      if (rightNode) stack.push([node.rightChildId, runningSum + rightNode.value]);
    }
    if (node.leftChildId) {
      const leftNode = nodeMap.get(node.leftChildId);
      if (leftNode) stack.push([node.leftChildId, runningSum + leftNode.value]);
    }
  }

  tracker.recordResult(found, { result: found });
  tracker.complete({ result: found });

  return tracker.getSteps();
}
