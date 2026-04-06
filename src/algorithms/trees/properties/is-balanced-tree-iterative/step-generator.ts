/** Step generator for Is Balanced Tree (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IS_BALANCED_TREE_ITERATIVE!);

export interface IsBalancedTreeIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateIsBalancedTreeIterativeSteps(
  input: IsBalancedTreeIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const stack: Array<{ nodeId: string; phase: number }> = [{ nodeId: rootId, phase: 0 }];
  const heights = new Map<string, number>();
  let isBalanced = true;

  while (stack.length > 0 && isBalanced) {
    const entry = stack[stack.length - 1]!;
    const node = nodeMap.get(entry.nodeId);
    if (!node) {
      stack.pop();
      continue;
    }

    if (entry.phase === 0) {
      tracker.checkNode(entry.nodeId, { currentNode: entry.nodeId, value: node.value });
      entry.phase = 1;
      if (node.leftChildId) stack.push({ nodeId: node.leftChildId, phase: 0 });
    } else if (entry.phase === 1) {
      entry.phase = 2;
      if (node.rightChildId) stack.push({ nodeId: node.rightChildId, phase: 0 });
    } else {
      stack.pop();
      const leftHeight = node.leftChildId ? (heights.get(node.leftChildId) ?? 0) : 0;
      const rightHeight = node.rightChildId ? (heights.get(node.rightChildId) ?? 0) : 0;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        tracker.markInvalid(entry.nodeId, { currentNode: entry.nodeId, leftHeight, rightHeight });
        isBalanced = false;
      } else {
        const height = Math.max(leftHeight, rightHeight) + 1;
        heights.set(entry.nodeId, height);
        tracker.markValid(entry.nodeId, {
          currentNode: entry.nodeId,
          leftHeight,
          rightHeight,
          height,
        });
      }
    }
  }

  tracker.recordResult(isBalanced, { result: isBalanced });
  tracker.complete({ result: isBalanced });

  return tracker.getSteps();
}
