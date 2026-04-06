/** Step generator for N-ary Tree Traversal — preorder traversal using childrenIds. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const N_ARY_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.N_ARY_TREE_TRAVERSAL!);

export interface NAryTreeTraversalInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateNAryTreeTraversalSteps(input: NAryTreeTraversalInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new AdvancedTreeTracker(nodes, rootId, N_ARY_LINE_MAP);
  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize("N-ary Tree Traversal (Preorder)", { rootId });

  function preorder(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;

    // Visit current node first (preorder)
    tracker.visitNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
    });

    // Traverse all children
    const childrenIds = node.childrenIds ?? [];
    for (const childId of childrenIds) {
      tracker.traverseNext(nodeId, childId, {
        fromNode: nodeId,
        toChild: childId,
      });
      preorder(childId);
    }
  }

  preorder(rootId);

  tracker.complete({ result: `Visited all nodes in preorder` });

  return tracker.getSteps();
}
