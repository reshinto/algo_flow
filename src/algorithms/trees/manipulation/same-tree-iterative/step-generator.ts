/** Step generator for Same Tree Iterative — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SAME_TREE_ITERATIVE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SAME_TREE_ITERATIVE!);

export interface SameTreeIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  secondaryNodes: TreeNode[];
  secondaryRootId: string;
}

export function generateSameTreeIterativeSteps(input: SameTreeIterativeInput): ExecutionStep[] {
  const { nodes, rootId, secondaryNodes, secondaryRootId } = input;
  const tracker = new TreeManipulationTracker(
    nodes,
    rootId,
    SAME_TREE_ITERATIVE_LINE_MAP,
    secondaryNodes,
    secondaryRootId,
  );
  const nodeMapA = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));
  const nodeMapB = new Map<string, TreeNode>(secondaryNodes.map((node) => [node.id, node]));

  tracker.initialize("Same Tree (Iterative)", { rootId, secondaryRootId });

  const bfsQueue: [string | null, string | null][] = [[rootId, secondaryRootId]];
  let result = true;

  while (bfsQueue.length > 0) {
    const pair = bfsQueue.shift();
    if (!pair) continue;
    const [idA, idB] = pair;

    if (!idA && !idB) continue;

    if (!idA || !idB) {
      result = false;
      break;
    }

    const nodeA = nodeMapA.get(idA);
    const nodeB = nodeMapB.get(idB);

    if (!nodeA || !nodeB) {
      result = false;
      break;
    }

    tracker.compareNodes(idA, idB, { idA, idB, valueA: nodeA.value, valueB: nodeB.value });

    if (nodeA.value !== nodeB.value) {
      result = false;
      break;
    }

    tracker.markProcessed(idA, { idA, idB, matched: true });

    bfsQueue.push([nodeA.leftChildId, nodeB.leftChildId]);
    bfsQueue.push([nodeA.rightChildId, nodeB.rightChildId]);
  }

  tracker.complete(result, { result });
  return tracker.getSteps();
}
