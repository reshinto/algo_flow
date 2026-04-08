/** Step generator for BST Lowest Common Ancestor (Iterative). */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LCA_ITERATIVE_LINE_MAP = buildLineMapFromSources(
  ALGORITHM_ID.BST_LOWEST_COMMON_ANCESTOR_ITERATIVE!,
);

export interface BstLowestCommonAncestorIterativeInput {
  nodes: TreeNode[];
  rootId: string;
  nodeValueA: number;
  nodeValueB: number;
}

export function generateBstLowestCommonAncestorIterativeSteps(
  input: BstLowestCommonAncestorIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId, nodeValueA, nodeValueB } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_LCA_ITERATIVE_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId, nodeValueA, nodeValueB });

  let currentId: string | null = rootId;
  let lcaValue: number | null = null;

  while (currentId !== null) {
    const node = nodeMap.get(currentId);
    if (!node) break;

    tracker.compareNode(currentId, node.value, {
      currentNode: currentId,
      nodeValue: node.value,
      nodeValueA,
      nodeValueB,
    });

    if (nodeValueA < node.value && nodeValueB < node.value) {
      currentId = node.leftChildId;
    } else if (nodeValueA > node.value && nodeValueB > node.value) {
      currentId = node.rightChildId;
    } else {
      lcaValue = node.value;
      tracker.searchFound(currentId, { lcaNode: currentId, lcaValue });
      break;
    }
  }

  tracker.complete({ lcaValue, nodeValueA, nodeValueB });

  return tracker.getSteps();
}
