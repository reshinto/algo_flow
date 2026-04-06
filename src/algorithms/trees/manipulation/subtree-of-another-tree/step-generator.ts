/** Step generator for Subtree of Another Tree — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SUBTREE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SUBTREE_OF_ANOTHER_TREE!);

export interface SubtreeOfAnotherTreeInput {
  nodes: TreeNode[];
  rootId: string;
  secondaryNodes: TreeNode[];
  secondaryRootId: string;
}

export function generateSubtreeOfAnotherTreeSteps(
  input: SubtreeOfAnotherTreeInput,
): ExecutionStep[] {
  const { nodes, rootId, secondaryNodes, secondaryRootId } = input;
  const tracker = new TreeManipulationTracker(
    nodes,
    rootId,
    SUBTREE_LINE_MAP,
    secondaryNodes,
    secondaryRootId,
  );
  const nodeMapA = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));
  const nodeMapB = new Map<string, TreeNode>(secondaryNodes.map((node) => [node.id, node]));

  tracker.initialize("Subtree of Another Tree", { rootId, secondaryRootId });

  function isSameTree(idA: string | null, idB: string | null): boolean {
    if (!idA && !idB) return true;
    if (!idA || !idB) return false;
    const nodeA = nodeMapA.get(idA) ?? nodeMapB.get(idA);
    const nodeB = nodeMapB.get(idB);
    if (!nodeA || !nodeB) return false;
    if (nodeA.value !== nodeB.value) return false;
    return (
      isSameTree(nodeA.leftChildId, nodeB.leftChildId) &&
      isSameTree(nodeA.rightChildId, nodeB.rightChildId)
    );
  }

  let found = false;

  function search(mainId: string | null): boolean {
    if (!mainId) return false;
    const mainNode = nodeMapA.get(mainId);
    if (!mainNode) return false;

    tracker.compareNodes(mainId, secondaryRootId, {
      mainId,
      secondaryRootId,
      mainValue: mainNode.value,
    });

    if (isSameTree(mainId, secondaryRootId)) {
      found = true;
      tracker.markProcessed(mainId, { mainId, matched: true });
      return true;
    }

    const leftResult = search(mainNode.leftChildId);
    if (leftResult) return true;
    return search(mainNode.rightChildId);
  }

  search(rootId);
  tracker.complete(found, { result: found });

  return tracker.getSteps();
}
