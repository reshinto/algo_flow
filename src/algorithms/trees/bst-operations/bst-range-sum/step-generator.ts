/** Step generator for BST Range Sum (Recursive) — sum nodes within [low, high]. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_RANGE_SUM_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_RANGE_SUM!);

export interface BstRangeSumInput {
  nodes: TreeNode[];
  rootId: string;
  lowValue: number;
  highValue: number;
}

export function generateBstRangeSumSteps(input: BstRangeSumInput): ExecutionStep[] {
  const { nodes, rootId, lowValue, highValue } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_RANGE_SUM_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId, lowValue, highValue });

  let runningSum = 0;

  function rangeSum(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      nodeValue: node.value,
      lowValue,
      highValue,
      runningSum,
    });

    if (node.value >= lowValue && node.value <= highValue) {
      runningSum += node.value;
      tracker.searchFound(nodeId, { nodeValue: node.value, runningSum });
    }

    if (node.value > lowValue) rangeSum(node.leftChildId);
    if (node.value < highValue) rangeSum(node.rightChildId);
  }

  rangeSum(rootId);
  tracker.complete({ lowValue, highValue, totalSum: runningSum });

  return tracker.getSteps();
}
