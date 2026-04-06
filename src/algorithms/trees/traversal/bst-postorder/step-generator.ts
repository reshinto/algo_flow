/** Step generator for BST Post-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BST_POSTORDER!);

export interface BstPostorderInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateBstPostorderSteps(input: BstPostorderInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId });

  function postorder(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    if (node.leftChildId) {
      tracker.traverseLeft(nodeId, { currentNode: nodeId, direction: "left" });
      postorder(node.leftChildId);
    }

    if (node.rightChildId) {
      tracker.traverseRight(nodeId, { currentNode: nodeId, direction: "right" });
      postorder(node.rightChildId);
    }

    // Visit root last — after all descendants
    tracker.visitNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
    });
  }

  postorder(rootId);

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
