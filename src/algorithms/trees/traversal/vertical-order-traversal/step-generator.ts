/** Step generator for Vertical-Order Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.VERTICAL_ORDER_TRAVERSAL!);

export interface VerticalOrderTraversalInput {
  nodes: TreeNode[];
  rootId: string;
}

export function generateVerticalOrderTraversalSteps(
  input: VerticalOrderTraversalInput,
): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, column: 0 });

  // BFS with column tracking
  const queue: [string, number][] = [[rootId, 0]];
  const columnToNodes = new Map<number, string[]>();
  let minColumn = 0;
  let maxColumn = 0;

  while (queue.length > 0) {
    const entry = queue.shift();
    if (!entry) break;
    const [currentId, column] = entry;
    const currentNode = nodeMap.get(currentId);
    if (!currentNode) break;

    // Record column assignment
    if (!columnToNodes.has(column)) {
      columnToNodes.set(column, []);
    }
    columnToNodes.get(column)!.push(currentId);

    if (column < minColumn) minColumn = column;
    if (column > maxColumn) maxColumn = column;

    if (currentNode.leftChildId) {
      queue.push([currentNode.leftChildId, column - 1]);
      tracker.traverseLeft(currentId, {
        currentNode: currentId,
        column,
        nextColumn: column - 1,
      });
    }

    if (currentNode.rightChildId) {
      queue.push([currentNode.rightChildId, column + 1]);
      tracker.traverseRight(currentId, {
        currentNode: currentId,
        column,
        nextColumn: column + 1,
      });
    }
  }

  // Visit nodes in vertical column order (left to right)
  for (let col = minColumn; col <= maxColumn; col++) {
    const columnNodeIds = columnToNodes.get(col);
    if (!columnNodeIds) continue;
    for (const nodeId of columnNodeIds) {
      const currentNode = nodeMap.get(nodeId);
      if (!currentNode) continue;
      tracker.visitNode(nodeId, currentNode.value, {
        currentNode: nodeId,
        value: currentNode.value,
        column: col,
      });
    }
  }

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
