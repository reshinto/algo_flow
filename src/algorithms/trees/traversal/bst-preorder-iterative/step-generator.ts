/** Step generator for BST Pre-Order Traversal (Iterative) — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_PREORDER_ITERATIVE!);

export interface BstPreorderIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstPreorderIterativeSteps(
  input: BstPreorderIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, stack: [rootId] });

  const stack: string[] = [rootId];

  while (stack.length > 0) {
    const poppedId = stack.pop();
    if (!poppedId) break;
    const poppedNode = nodeMap.get(poppedId);
    if (!poppedNode) break;

    tracker.visitNode(poppedId, poppedNode.value, {
      currentNode: poppedId,
      value: poppedNode.value,
      stackSize: stack.length,
    });

    // Push right first so left is processed first (LIFO)
    if (poppedNode.rightChildId) {
      stack.push(poppedNode.rightChildId);
      tracker.traverseRight(poppedId, {
        currentNode: poppedId,
        direction: "right",
        stackSize: stack.length,
      });
    }

    if (poppedNode.leftChildId) {
      stack.push(poppedNode.leftChildId);
      tracker.traverseLeft(poppedId, {
        currentNode: poppedId,
        direction: "left",
        stackSize: stack.length,
      });
    }
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
