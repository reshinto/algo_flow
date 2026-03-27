/** Step generator for BST In-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_INORDER!);

export interface BstInorderInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstInorderSteps(input: BstInorderInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  function inorder(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    if (node.leftChildId) {
      tracker.traverseLeft(nodeId, { currentNode: nodeId, direction: "left" });
      inorder(node.leftChildId);
    }

    tracker.visitNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
    });

    if (node.rightChildId) {
      tracker.traverseRight(nodeId, { currentNode: nodeId, direction: "right" });
      inorder(node.rightChildId);
    }
  }

  inorder(rootId);

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
