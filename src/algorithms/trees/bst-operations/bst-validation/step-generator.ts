/** Step generator for BST Validation (Recursive) — produces ExecutionStep[] using BSTOperationTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_VALIDATION_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_VALIDATION!);

export interface BstValidationInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstValidationSteps(input: BstValidationInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_VALIDATION_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId });

  let isValid = true;

  function validate(nodeId: string | null, minVal: number, maxVal: number): boolean {
    if (!nodeId) return true;
    const node = nodeMap.get(nodeId);
    if (!node) return true;

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      nodeValue: node.value,
      minBound: minVal,
      maxBound: maxVal,
    });

    if (node.value <= minVal || node.value >= maxVal) {
      tracker.searchFound(nodeId, {
        violation: true,
        nodeValue: node.value,
        minBound: minVal,
        maxBound: maxVal,
      });
      return false;
    }

    return (
      validate(node.leftChildId, minVal, node.value) &&
      validate(node.rightChildId, node.value, maxVal)
    );
  }

  isValid = validate(rootId, -Infinity, Infinity);
  tracker.complete({ isValid });

  return tracker.getSteps();
}
