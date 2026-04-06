/** Step generator for Morris In-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.MORRIS_INORDER_TRAVERSAL!);

export interface MorrisInorderTraversalInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateMorrisInorderTraversalSteps(
  input: MorrisInorderTraversalInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, current: rootId });

  // Simulate Morris traversal using the node IDs
  // We track "threads" as a separate map so we don't mutate the original nodeMap
  const threadMap = new Map<string, string>(); // predecessor -> threaded-to node

  let currentId: string | null = rootId;

  while (currentId !== null) {
    const currentNode = nodeMap.get(currentId);
    if (!currentNode) break;

    if (!currentNode.leftChildId) {
      // No left child: visit and move right
      tracker.visitNode(currentId, currentNode.value, {
        currentNode: currentId,
        value: currentNode.value,
      });
      tracker.traverseRight(currentId, { currentNode: currentId, direction: "right" });
      currentId = currentNode.rightChildId ?? threadMap.get(currentId) ?? null;
    } else {
      // Find inorder predecessor in left subtree
      let predecessorId: string = currentNode.leftChildId;
      let predecessorNode = nodeMap.get(predecessorId);

      while (
        predecessorNode?.rightChildId &&
        predecessorNode.rightChildId !== currentId &&
        !threadMap.has(predecessorId)
      ) {
        predecessorId = predecessorNode.rightChildId;
        predecessorNode = nodeMap.get(predecessorId);
      }

      const isThreaded = threadMap.get(predecessorId) === currentId;

      if (!isThreaded) {
        // Create thread: predecessor -> current
        threadMap.set(predecessorId, currentId);
        tracker.traverseLeft(currentId, {
          currentNode: currentId,
          predecessorId,
          phase: "threading",
        });
        currentId = currentNode.leftChildId;
      } else {
        // Remove thread and visit current
        threadMap.delete(predecessorId);
        tracker.visitNode(currentId, currentNode.value, {
          currentNode: currentId,
          value: currentNode.value,
          phase: "unthreading",
        });
        tracker.traverseRight(currentId, { currentNode: currentId, direction: "right" });
        currentId = currentNode.rightChildId;
      }
    }
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
