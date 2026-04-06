/** Step generator for BST Recover Swapped — in-order detect and fix two swapped nodes. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers/bst-operation-tracker";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_RECOVER_SWAPPED_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_RECOVER_SWAPPED!);

export interface BstRecoverSwappedInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstRecoverSwappedSteps(input: BstRecoverSwappedInput): ExecutionStep[] {
  const { nodes, rootId } = input;

  const mutableNodes = nodes.map((node) => ({ ...node }));
  const tracker = new BSTOperationTracker(mutableNodes, rootId, BST_RECOVER_SWAPPED_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(mutableNodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId });

  let firstViolationId: string | null = null;
  let secondViolationId: string | null = null;
  let previousId: string | null = null;

  function inorder(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    inorder(node.leftChildId);

    tracker.compareNode(nodeId, node.value, {
      currentNode: nodeId,
      nodeValue: node.value,
      previousNode: previousId,
    });

    if (previousId !== null) {
      const prevNode = nodeMap.get(previousId);
      if (prevNode && prevNode.value > node.value) {
        if (firstViolationId === null) {
          firstViolationId = previousId;
          tracker.searchFound(previousId, {
            violation: "first",
            nodeId: previousId,
            value: prevNode.value,
          });
        }
        secondViolationId = nodeId;
        tracker.searchFound(nodeId, { violation: "second", nodeId, value: node.value });
      }
    }

    previousId = nodeId;
    inorder(node.rightChildId);
  }

  inorder(rootId);

  // Swap the two misplaced nodes
  if (firstViolationId && secondViolationId) {
    const firstNode = nodeMap.get(firstViolationId);
    const secondNode = nodeMap.get(secondViolationId);
    if (firstNode && secondNode) {
      const temp = firstNode.value;
      firstNode.value = secondNode.value;
      secondNode.value = temp;
      tracker.markPath([firstViolationId, secondViolationId], {
        swapped: true,
        firstNode: firstViolationId,
        secondNode: secondViolationId,
      });
    }
  }

  tracker.complete({ firstViolation: firstViolationId, secondViolation: secondViolationId });

  return tracker.getSteps();
}
