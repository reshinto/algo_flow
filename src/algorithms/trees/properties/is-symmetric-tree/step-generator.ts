/** Step generator for Is Symmetric Tree — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IS_SYMMETRIC_TREE!);

export interface IsSymmetricTreeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateIsSymmetricTreeSteps(input: IsSymmetricTreeInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  function isMirror(leftId: string | null, rightId: string | null): boolean {
    if (!leftId && !rightId) return true;
    if (!leftId || !rightId) {
      tracker.recordResult(false, { leftId, rightId, reason: "one null" });
      return false;
    }

    const leftNode = nodeMap.get(leftId);
    const rightNode = nodeMap.get(rightId);
    if (!leftNode || !rightNode) return false;

    tracker.checkNode(leftId, {
      currentNode: leftId,
      mirrorNode: rightId,
      leftValue: leftNode.value,
      rightValue: rightNode.value,
    });

    if (leftNode.value !== rightNode.value) {
      tracker.markInvalid(leftId, {
        currentNode: leftId,
        mirrorNode: rightId,
        leftValue: leftNode.value,
        rightValue: rightNode.value,
      });
      return false;
    }

    tracker.markValid(leftId, { currentNode: leftId, mirrorNode: rightId, value: leftNode.value });

    const outerMatch = isMirror(leftNode.leftChildId, rightNode.rightChildId);
    if (!outerMatch) return false;
    return isMirror(leftNode.rightChildId, rightNode.leftChildId);
  }

  const rootNode = nodeMap.get(rootId);
  const result = !rootNode ? true : isMirror(rootNode.leftChildId, rootNode.rightChildId);

  tracker.recordResult(result, { result });
  tracker.complete({ result });

  return tracker.getSteps();
}
