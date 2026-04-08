/** Step generator for BST Lowest Common Ancestor (Recursive). */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LCA_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_LOWEST_COMMON_ANCESTOR!);

export interface BstLowestCommonAncestorInput {
  nodes: TreeNode[];
  rootId: string;
  nodeValueA: number;
  nodeValueB: number;
}

export function generateBstLowestCommonAncestorSteps(
  input: BstLowestCommonAncestorInput,
): ExecutionStep[] {
  const { nodes, rootId, nodeValueA, nodeValueB } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_LCA_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId, nodeValueA, nodeValueB });

  function findLca(nodeId: string | null): string | null {
    if (!nodeId) return null;
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      nodeValue: node.value,
      nodeValueA,
      nodeValueB,
    });

    if (nodeValueA < node.value && nodeValueB < node.value) {
      return findLca(node.leftChildId);
    }
    if (nodeValueA > node.value && nodeValueB > node.value) {
      return findLca(node.rightChildId);
    }

    tracker.searchFound(nodeId, { lcaNode: nodeId, lcaValue: node.value });
    return nodeId;
  }

  const lcaId = findLca(rootId);
  const lcaNode = lcaId ? nodeMap.get(lcaId) : null;
  tracker.complete({ lcaValue: lcaNode?.value ?? null, nodeValueA, nodeValueB });

  return tracker.getSteps();
}
