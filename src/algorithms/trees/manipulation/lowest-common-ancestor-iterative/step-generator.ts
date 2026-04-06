/** Step generator for Lowest Common Ancestor Iterative — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LCA_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.LOWEST_COMMON_ANCESTOR_ITERATIVE!,
);

export interface LowestCommonAncestorIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  nodeValueA: number;
  nodeValueB: number;
}

export function generateLowestCommonAncestorIterativeSteps(
  input: LowestCommonAncestorIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId, nodeValueA, nodeValueB } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, LCA_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Lowest Common Ancestor (Iterative)", { rootId, nodeValueA, nodeValueB });

  // Phase 1: build parent map with BFS
  const parentMap = new Map<string, string | null>();
  parentMap.set(rootId, null);
  const bfsQueue: string[] = [rootId];
  let foundNodeAId: string | null = null;
  let foundNodeBId: string | null = null;

  while (bfsQueue.length > 0 && (!foundNodeAId || !foundNodeBId)) {
    const currentId = bfsQueue.shift();
    if (!currentId) continue;
    const currentNode = nodeMap.get(currentId);
    if (!currentNode) continue;

    tracker.compareNodes(currentId, currentId, {
      currentId,
      value: currentNode.value,
      nodeValueA,
      nodeValueB,
    });

    if (currentNode.value === nodeValueA) foundNodeAId = currentId;
    if (currentNode.value === nodeValueB) foundNodeBId = currentId;

    if (currentNode.leftChildId) {
      parentMap.set(currentNode.leftChildId, currentId);
      bfsQueue.push(currentNode.leftChildId);
    }
    if (currentNode.rightChildId) {
      parentMap.set(currentNode.rightChildId, currentId);
      bfsQueue.push(currentNode.rightChildId);
    }
  }

  // Phase 2: trace ancestors
  let lcaId: string | null = null;

  if (foundNodeAId && foundNodeBId) {
    const ancestorsA = new Set<string>();
    let traceId: string | null = foundNodeAId;
    while (traceId) {
      ancestorsA.add(traceId);
      traceId = parentMap.get(traceId) ?? null;
    }

    traceId = foundNodeBId;
    while (traceId) {
      if (ancestorsA.has(traceId)) {
        lcaId = traceId;
        break;
      }
      traceId = parentMap.get(traceId) ?? null;
    }
  }

  if (lcaId) {
    tracker.markProcessed(lcaId, { lcaId, value: nodeMap.get(lcaId)?.value });
  }

  const lcaValue = lcaId ? (nodeMap.get(lcaId)?.value ?? null) : null;
  tracker.complete(null, { result: lcaValue, lcaNodeId: lcaId });

  return tracker.getSteps();
}
