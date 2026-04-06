/** Step generator for Is Symmetric Tree (Iterative) — produces ExecutionStep[] using TreePropertyTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreePropertyTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IS_SYMMETRIC_TREE_ITERATIVE!);

export interface IsSymmetricTreeIterativeInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateIsSymmetricTreeIterativeSteps(
  input: IsSymmetricTreeIterativeInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreePropertyTracker(nodes, rootId, LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  const rootNode = nodeMap.get(rootId);
  if (!rootNode) {
    tracker.recordResult(true, { result: true });
    tracker.complete({ result: true });
    return tracker.getSteps();
  }

  const queue: Array<[string | null, string | null]> = [
    [rootNode.leftChildId, rootNode.rightChildId],
  ];
  let isSymmetric = true;

  while (queue.length > 0 && isSymmetric) {
    const pair = queue.shift()!;
    const [leftId, rightId] = pair;

    if (!leftId && !rightId) continue;

    if (!leftId || !rightId) {
      isSymmetric = false;
      break;
    }

    const leftNode = nodeMap.get(leftId);
    const rightNode = nodeMap.get(rightId);
    if (!leftNode || !rightNode) {
      isSymmetric = false;
      break;
    }

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
      isSymmetric = false;
      break;
    }

    tracker.markValid(leftId, { currentNode: leftId, mirrorNode: rightId, value: leftNode.value });

    queue.push([leftNode.leftChildId, rightNode.rightChildId]);
    queue.push([leftNode.rightChildId, rightNode.leftChildId]);
  }

  tracker.recordResult(isSymmetric, { result: isSymmetric });
  tracker.complete({ result: isSymmetric });

  return tracker.getSteps();
}
