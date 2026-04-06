/** Step generator for Diagonal Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TREE_DIAGONAL_TRAVERSAL!);

export interface DiagonalTraversalInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateDiagonalTraversalSteps(input: DiagonalTraversalInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, diagonal: 0 });

  // BFS with diagonal tracking
  const queue: [string, number][] = [[rootId, 0]];
  const diagonalToNodes = new Map<number, string[]>();
  let maxDiagonal = 0;

  while (queue.length > 0) {
    const entry = queue.shift();
    if (!entry) break;
    const [currentId, diagonal] = entry;
    const currentNode = nodeMap.get(currentId);
    if (!currentNode) break;

    if (!diagonalToNodes.has(diagonal)) {
      diagonalToNodes.set(diagonal, []);
    }
    diagonalToNodes.get(diagonal)!.push(currentId);

    if (diagonal > maxDiagonal) maxDiagonal = diagonal;

    // Right child stays on same diagonal
    if (currentNode.rightChildId) {
      queue.push([currentNode.rightChildId, diagonal]);
      tracker.traverseRight(currentId, {
        currentNode: currentId,
        diagonal,
        nextDiagonal: diagonal,
      });
    }

    // Left child moves to next diagonal
    if (currentNode.leftChildId) {
      queue.push([currentNode.leftChildId, diagonal + 1]);
      tracker.traverseLeft(currentId, {
        currentNode: currentId,
        diagonal,
        nextDiagonal: diagonal + 1,
      });
    }
  }

  // Visit nodes in diagonal order
  for (let diag = 0; diag <= maxDiagonal; diag++) {
    const diagonalNodeIds = diagonalToNodes.get(diag);
    if (!diagonalNodeIds) continue;
    for (const nodeId of diagonalNodeIds) {
      const currentNode = nodeMap.get(nodeId);
      if (!currentNode) continue;
      tracker.visitNode(nodeId, currentNode.value, {
        currentNode: nodeId,
        value: currentNode.value,
        diagonal: diag,
      });
    }
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
