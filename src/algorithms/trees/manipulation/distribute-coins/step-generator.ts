/** Step generator for Distribute Coins — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const DISTRIBUTE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DISTRIBUTE_COINS!);

export interface DistributeCoinsInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateDistributeCoinsSteps(input: DistributeCoinsInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, DISTRIBUTE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Distribute Coins", { rootId });

  let totalMoves = 0;

  function dfs(nodeId: string | null): number {
    if (!nodeId) return 0;
    const currentNode = nodeMap.get(nodeId);
    if (!currentNode) return 0;

    const leftExcess = dfs(currentNode.leftChildId);
    const rightExcess = dfs(currentNode.rightChildId);

    const moves = Math.abs(leftExcess) + Math.abs(rightExcess);
    totalMoves += moves;

    const excess = currentNode.value + leftExcess + rightExcess - 1;

    tracker.markProcessed(nodeId, {
      nodeId,
      value: currentNode.value,
      leftExcess,
      rightExcess,
      excess,
      moves,
      totalMoves,
    });

    return excess;
  }

  dfs(rootId);
  tracker.complete(null, { result: totalMoves });

  return tracker.getSteps();
}
