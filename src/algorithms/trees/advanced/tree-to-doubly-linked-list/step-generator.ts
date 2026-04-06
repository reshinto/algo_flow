/** Step generator for Tree to Doubly Linked List — in-order conversion. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TREE_DLL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TREE_TO_DOUBLY_LINKED_LIST!);

export interface TreeToDoublyLinkedListInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateTreeToDoublyLinkedListSteps(
  input: TreeToDoublyLinkedListInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new AdvancedTreeTracker(nodes, rootId, TREE_DLL_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("BST to Doubly Linked List", { rootId });

  const dllOrder: string[] = [];

  function inorder(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    if (node.leftChildId) {
      inorder(node.leftChildId);
    }

    dllOrder.push(nodeId);
    tracker.visitNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
      dllOrder: [...dllOrder],
    });

    if (node.rightChildId) {
      inorder(node.rightChildId);
    }
  }

  inorder(rootId);

  tracker.complete({
    result: `DLL with ${dllOrder.length} nodes in sorted order`,
    dllOrder,
  });

  return tracker.getSteps();
}
