/** Step generator for BST Iterator — stack-based controlled in-order traversal. */

import type { ExecutionStep, TreeNode } from "@/types";
import { BSTOperationTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_ITERATOR_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_ITERATOR!);

export interface BstIteratorInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstIteratorSteps(input: BstIteratorInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new BSTOperationTracker(nodes, rootId, BST_ITERATOR_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize(null, { rootId });

  const stack: string[] = [];
  const result: number[] = [];

  function pushLeft(nodeId: string | null): void {
    let currentId = nodeId;
    while (currentId !== null) {
      const node = nodeMap.get(currentId);
      if (!node) break;
      stack.push(currentId);
      tracker.compareNode(currentId, node.value, {
        currentNode: currentId,
        pushing: true,
        stackSize: stack.length,
      });
      currentId = node.leftChildId;
    }
  }

  pushLeft(rootId);

  while (stack.length > 0) {
    const currentId = stack.pop();
    if (!currentId) break;
    const node = nodeMap.get(currentId);
    if (!node) break;

    result.push(node.value);
    tracker.searchFound(currentId, { value: node.value, iterationCount: result.length });
    pushLeft(node.rightChildId);
  }

  tracker.complete({ iterationOrder: result.join(", "), count: result.length });

  return tracker.getSteps();
}
