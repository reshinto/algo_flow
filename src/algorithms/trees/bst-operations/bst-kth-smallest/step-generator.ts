/** Step generator for BST Kth Smallest (Recursive) — in-order with counter. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_KTH_SMALLEST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_KTH_SMALLEST!);

export interface BstKthSmallestInput {
  nodes: TreeNode[];
  rootId: string;
  kthPosition: number;
}

export function generateBstKthSmallestSteps(input: BstKthSmallestInput): ExecutionStep[] {
  const { nodes, rootId, kthPosition } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_KTH_SMALLEST_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId, kthPosition });

  let counter = 0;
  let resultValue = -1;
  let found = false;

  function inorder(nodeId: string | null): void {
    if (!nodeId || found) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    inorder(node.leftChildId);

    if (!found) {
      counter++;
      tracker.compareNode(nodeId, node.value, {
        currentNode: nodeId,
        counter,
        kthPosition,
        nodeValue: node.value,
      });

      if (counter === kthPosition) {
        resultValue = node.value;
        found = true;
        tracker.searchFound(nodeId, { kthPosition, result: resultValue });
        return;
      }

      inorder(node.rightChildId);
    }
  }

  inorder(rootId);
  tracker.complete({ kthPosition, result: resultValue });

  return tracker.getSteps();
}
