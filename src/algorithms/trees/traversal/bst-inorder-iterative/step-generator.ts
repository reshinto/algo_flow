/** Step generator for BST In-Order Traversal (Iterative) — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_INORDER_ITERATIVE!);

export interface BstInorderIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstInorderIterativeSteps(input: BstInorderIterativeInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, stack: [], current: rootId });

  const stack: string[] = [];
  let currentId: string | null = rootId;

  while (currentId !== null || stack.length > 0) {
    // Push all left children onto the stack
    while (currentId !== null) {
      const currentNode = nodeMap.get(currentId);
      if (!currentNode) break;
      stack.push(currentId);
      tracker.traverseLeft(currentId, { currentNode: currentId, stackSize: stack.length });
      currentId = currentNode.leftChildId;
    }

    // Pop the top node
    const poppedId = stack.pop();
    if (!poppedId) break;
    const poppedNode = nodeMap.get(poppedId);
    if (!poppedNode) break;

    tracker.visitNode(poppedId, poppedNode.value, {
      currentNode: poppedId,
      value: poppedNode.value,
      stackSize: stack.length,
    });

    // Move to right subtree
    if (poppedNode.rightChildId) {
      tracker.traverseRight(poppedId, { currentNode: poppedId, direction: "right" });
      currentId = poppedNode.rightChildId;
    } else {
      currentId = null;
    }
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
