/** Step generator for Merge Binary Trees — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const MERGE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MERGE_BINARY_TREES!);

export interface MergeBinaryTreesInput {
  nodes: TreeNode[];
  rootId: string;
  secondaryNodes: TreeNode[];
  secondaryRootId: string;
}

export function generateMergeBinaryTreesSteps(input: MergeBinaryTreesInput): ExecutionStep[] {
  const { nodes, rootId, secondaryNodes, secondaryRootId } = input;
  const tracker = new TreeManipulationTracker(
    nodes,
    rootId,
    MERGE_LINE_MAP,
    secondaryNodes,
    secondaryRootId,
  );
  const nodeMapA = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));
  const nodeMapB = new Map<string, TreeNode>(secondaryNodes.map((node) => [node.id, node]));

  tracker.initialize("Merge Binary Trees", { rootId, secondaryRootId });

  function mergeNodes(idA: string | null, idB: string | null): void {
    if (!idA && !idB) return;

    const nodeA = idA ? nodeMapA.get(idA) : undefined;
    const nodeB = idB ? nodeMapB.get(idB) : undefined;

    if (!nodeA) return; // Tree B node adopted by Tree A — no step needed
    if (!nodeB) {
      // Tree A node stays, mark it processed
      tracker.markProcessed(idA!, { idA, idB: null, merged: false });
      return;
    }

    // Both exist — merge values
    const mergedValue = nodeA.value + nodeB.value;
    tracker.mergeNodes(idA!, idB!, mergedValue, {
      idA,
      idB,
      valueA: nodeA.value,
      valueB: nodeB.value,
      mergedValue,
    });

    mergeNodes(nodeA.leftChildId, nodeB.leftChildId);
    mergeNodes(nodeA.rightChildId, nodeB.rightChildId);

    tracker.markProcessed(idA!, { idA, idB, mergedValue });
  }

  mergeNodes(rootId, secondaryRootId);
  tracker.complete(null, { result: "merged" });

  return tracker.getSteps();
}
