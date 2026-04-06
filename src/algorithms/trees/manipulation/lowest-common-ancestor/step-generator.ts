/** Step generator for Lowest Common Ancestor — produces ExecutionStep[] using TreeManipulationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeManipulationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LCA_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LOWEST_COMMON_ANCESTOR!);

export interface LowestCommonAncestorInput {
  nodes: TreeNode[];
  rootId: string;
  nodeValueA: number;
  nodeValueB: number;
}

export function generateLowestCommonAncestorSteps(
  input: LowestCommonAncestorInput,
): ExecutionStep[] {
  const { nodes, rootId, nodeValueA, nodeValueB } = input;
  const tracker = new TreeManipulationTracker(nodes, rootId, LCA_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("Lowest Common Ancestor", { rootId, nodeValueA, nodeValueB });

  let lcaNodeId: string | null = null;

  function findLCA(nodeId: string | null): string | null {
    if (!nodeId) return null;
    const currentNode = nodeMap.get(nodeId);
    if (!currentNode) return null;

    tracker.compareNodes(nodeId, nodeId, {
      nodeId,
      value: currentNode.value,
      nodeValueA,
      nodeValueB,
    });

    if (currentNode.value === nodeValueA || currentNode.value === nodeValueB) {
      tracker.markProcessed(nodeId, { nodeId, value: currentNode.value, isTarget: true });
      return nodeId;
    }

    const leftResult = findLCA(currentNode.leftChildId);
    const rightResult = findLCA(currentNode.rightChildId);

    if (leftResult && rightResult) {
      lcaNodeId = nodeId;
      tracker.markProcessed(nodeId, { nodeId, value: currentNode.value, isLCA: true });
      return nodeId;
    }

    return leftResult ?? rightResult;
  }

  const result = findLCA(rootId);
  if (!lcaNodeId) lcaNodeId = result;

  const lcaValue = lcaNodeId ? (nodeMap.get(lcaNodeId)?.value ?? null) : null;
  tracker.complete(null, { result: lcaValue, lcaNodeId });

  return tracker.getSteps();
}
