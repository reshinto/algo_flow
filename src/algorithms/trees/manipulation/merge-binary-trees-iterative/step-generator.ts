/** Step generator for Merge Binary Trees Iterative — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MERGE_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.MERGE_BINARY_TREES_ITERATIVE!,
);

export interface MergeBinaryTreesIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  secondaryNodes: TreeNode[];
  secondaryRootId: string;
}

export function generateMergeBinaryTreesIterativeSteps(
  input: MergeBinaryTreesIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId, secondaryNodes, secondaryRootId } = input;
  const tracker = new TreeManipulationTracker(
    nodes,
    rootId,
    MERGE_ITERATIVE_LINE_MAP,
    secondaryNodes,
    secondaryRootId,
  );
  const nodeMapA = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));
  const nodeMapB = new Map<string, TreeNode>(secondaryNodes.map((node) => [node.id, node]));

  tracker.initialize("Merge Binary Trees (Iterative)", { rootId, secondaryRootId });

  const pairStack: [string, string][] = [[rootId, secondaryRootId]];

  while (pairStack.length > 0) {
    const pair = pairStack.pop();
    if (!pair) continue;
    const [idA, idB] = pair;

    const nodeA = nodeMapA.get(idA);
    const nodeB = nodeMapB.get(idB);

    if (!nodeA || !nodeB) continue;

    const mergedValue = nodeA.value + nodeB.value;
    tracker.mergeNodes(idA, idB, mergedValue, {
      idA,
      idB,
      valueA: nodeA.value,
      valueB: nodeB.value,
      mergedValue,
    });

    // Handle right children
    if (!nodeA.rightChildId && nodeB.rightChildId) {
      tracker.markProcessed(idA, { idA, side: "right", adopted: nodeB.rightChildId });
    } else if (nodeA.rightChildId && nodeB.rightChildId) {
      pairStack.push([nodeA.rightChildId, nodeB.rightChildId]);
    }

    // Handle left children
    if (!nodeA.leftChildId && nodeB.leftChildId) {
      tracker.markProcessed(idA, { idA, side: "left", adopted: nodeB.leftChildId });
    } else if (nodeA.leftChildId && nodeB.leftChildId) {
      pairStack.push([nodeA.leftChildId, nodeB.leftChildId]);
    }
  }

  tracker.complete(null, { result: "merged" });
  return tracker.getSteps();
}
