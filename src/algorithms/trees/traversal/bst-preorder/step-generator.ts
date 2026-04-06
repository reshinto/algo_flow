/** Step generator for BST Pre-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_PREORDER!);

export interface BstPreorderInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstPreorderSteps(input: BstPreorderInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  function preorder(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    // Visit root first
    tracker.visitNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
    });

    if (node.leftChildId) {
      tracker.traverseLeft(nodeId, { currentNode: nodeId, direction: "left" });
      preorder(node.leftChildId);
    }

    if (node.rightChildId) {
      tracker.traverseRight(nodeId, { currentNode: nodeId, direction: "right" });
      preorder(node.rightChildId);
    }
  }

  preorder(rootId);

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
