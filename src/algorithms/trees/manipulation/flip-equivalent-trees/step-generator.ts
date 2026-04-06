/** Step generator for Flip Equivalent Trees — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FLIP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLIP_EQUIVALENT_TREES!);

export interface FlipEquivalentTreesInput {
  nodes: TreeNode[];
  rootId: string;
  secondaryNodes: TreeNode[];
  secondaryRootId: string;
}

export function generateFlipEquivalentTreesSteps(input: FlipEquivalentTreesInput): ExecutionStep[] {
  const { nodes, rootId, secondaryNodes, secondaryRootId } = input;
  const tracker = new TreeManipulationTracker(
    nodes,
    rootId,
    FLIP_LINE_MAP,
    secondaryNodes,
    secondaryRootId,
  );
  const nodeMapA = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));
  const nodeMapB = new Map<string, TreeNode>(secondaryNodes.map((node) => [node.id, node]));

  tracker.initialize("Flip Equivalent Trees", { rootId, secondaryRootId });

  function flipEquiv(idA: string | null, idB: string | null): boolean {
    if (!idA && !idB) return true;
    if (!idA || !idB) return false;

    const nodeA = nodeMapA.get(idA);
    const nodeB = nodeMapB.get(idB);

    if (!nodeA || !nodeB) return false;

    tracker.compareNodes(idA, idB, {
      idA,
      idB,
      valueA: nodeA.value,
      valueB: nodeB.value,
    });

    if (nodeA.value !== nodeB.value) return false;

    const noFlip =
      flipEquiv(nodeA.leftChildId, nodeB.leftChildId) &&
      flipEquiv(nodeA.rightChildId, nodeB.rightChildId);

    const withFlip =
      flipEquiv(nodeA.leftChildId, nodeB.rightChildId) &&
      flipEquiv(nodeA.rightChildId, nodeB.leftChildId);

    const result = noFlip || withFlip;

    if (result) {
      tracker.markProcessed(idA, { idA, idB, equivalent: true, flipped: withFlip && !noFlip });
    }

    return result;
  }

  const result = flipEquiv(rootId, secondaryRootId);
  tracker.complete(result, { result });

  return tracker.getSteps();
}
