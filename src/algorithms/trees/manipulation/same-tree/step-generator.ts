/** Step generator for Same Tree — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SAME_TREE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SAME_TREE!);

export interface SameTreeInput {
  nodes: TreeNode[];
  rootId: string;
  secondaryNodes: TreeNode[];
  secondaryRootId: string;
}

export function generateSameTreeSteps(input: SameTreeInput): ExecutionStep[] {
  const { nodes, rootId, secondaryNodes, secondaryRootId } = input;
  const tracker = new TreeManipulationTracker(
    nodes,
    rootId,
    SAME_TREE_LINE_MAP,
    secondaryNodes,
    secondaryRootId,
  );
  const nodeMapA = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));
  const nodeMapB = new Map<string, TreeNode>(secondaryNodes.map((node) => [node.id, node]));

  tracker.initialize("Same Tree", { rootId, secondaryRootId });

  let result = true;

  function compare(idA: string | null, idB: string | null): boolean {
    if (!idA && !idB) return true;
    if (!idA || !idB) {
      result = false;
      return false;
    }

    const nodeA = nodeMapA.get(idA);
    const nodeB = nodeMapB.get(idB);

    if (!nodeA || !nodeB) {
      result = false;
      return false;
    }

    tracker.compareNodes(idA, idB, { idA, idB, valueA: nodeA.value, valueB: nodeB.value });

    if (nodeA.value !== nodeB.value) {
      result = false;
      return false;
    }

    const leftMatch = compare(nodeA.leftChildId, nodeB.leftChildId);
    const rightMatch = compare(nodeA.rightChildId, nodeB.rightChildId);
    const matches = leftMatch && rightMatch;

    if (matches) {
      tracker.markProcessed(idA, { idA, idB, matched: true });
    }

    return matches;
  }

  compare(rootId, secondaryRootId);
  tracker.complete(result, { result });

  return tracker.getSteps();
}
