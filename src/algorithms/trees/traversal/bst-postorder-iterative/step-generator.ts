/** Step generator for BST Post-Order Traversal (Iterative) — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_POSTORDER_ITERATIVE!);

export interface BstPostorderIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstPostorderIterativeSteps(
  input: BstPostorderIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, stack1: [rootId], stack2: [] });

  // Phase 1: build post-order sequence onto stack2
  const stack1: string[] = [rootId];
  const stack2: string[] = [];

  while (stack1.length > 0) {
    const poppedId = stack1.pop();
    if (!poppedId) break;
    const poppedNode = nodeMap.get(poppedId);
    if (!poppedNode) break;

    stack2.push(poppedId);
    tracker.traverseLeft(poppedId, {
      currentNode: poppedId,
      stack1Size: stack1.length,
      stack2Size: stack2.length,
    });

    if (poppedNode.leftChildId) {
      stack1.push(poppedNode.leftChildId);
    }

    if (poppedNode.rightChildId) {
      stack1.push(poppedNode.rightChildId);
      tracker.traverseRight(poppedId, {
        currentNode: poppedId,
        stack1Size: stack1.length,
        stack2Size: stack2.length,
      });
    }
  }

  // Phase 2: pop stack2 to visit nodes in post-order
  while (stack2.length > 0) {
    const visitId = stack2.pop();
    if (!visitId) break;
    const visitNode = nodeMap.get(visitId);
    if (!visitNode) break;

    tracker.visitNode(visitId, visitNode.value, {
      currentNode: visitId,
      value: visitNode.value,
      stack2Size: stack2.length,
    });
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
