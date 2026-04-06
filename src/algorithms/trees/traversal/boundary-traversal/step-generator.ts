/** Step generator for Boundary Traversal — produces ExecutionStep[] using TreeTracker. */

import type { ExecutionStep, TreeNode } from "@/types";
import { TreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const BST_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BOUNDARY_TRAVERSAL!);

export interface BoundaryTraversalInput {
  nodes: TreeNode[];
  rootId: string;
}

function isLeafNode(node: TreeNode): boolean {
  return node.leftChildId === null && node.rightChildId === null;
}

export function generateBoundaryTraversalSteps(input: BoundaryTraversalInput): ExecutionStep[] {
  const { nodes, rootId } = input;
  const tracker = new TreeTracker(nodes, rootId, BST_LINE_MAP);

  const nodeMap = new Map<string, TreeNode>(nodes.map((node) => [node.id, node]));

  tracker.initialize({ rootId, phase: "start" });

  const rootNode = nodeMap.get(rootId);
  if (!rootNode) {
    tracker.complete({ result: 0 });
    return tracker.getSteps();
  }

  // Visit root if not a leaf
  if (!isLeafNode(rootNode)) {
    tracker.visitNode(rootId, rootNode.value, {
      currentNode: rootId,
      value: rootNode.value,
      phase: "root",
    });
  }

  // Left boundary (top-down, excluding leaves)
  function addLeftBoundary(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node || isLeafNode(node)) return;
    tracker.traverseLeft(nodeId, { currentNode: nodeId, phase: "left-boundary" });
    tracker.visitNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
      phase: "left-boundary",
    });
    if (node.leftChildId) {
      addLeftBoundary(node.leftChildId);
    } else {
      addLeftBoundary(node.rightChildId);
    }
  }

  // Leaf nodes (left to right)
  function addLeaves(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node) return;
    if (isLeafNode(node)) {
      tracker.visitNode(nodeId, node.value, {
        currentNode: nodeId,
        value: node.value,
        phase: "leaves",
      });
      return;
    }
    addLeaves(node.leftChildId);
    addLeaves(node.rightChildId);
  }

  // Right boundary (bottom-up, excluding leaves)
  function addRightBoundary(nodeId: string | null): void {
    if (!nodeId) return;
    const node = nodeMap.get(nodeId);
    if (!node || isLeafNode(node)) return;
    if (node.rightChildId) {
      addRightBoundary(node.rightChildId);
    } else {
      addRightBoundary(node.leftChildId);
    }
    tracker.traverseRight(nodeId, { currentNode: nodeId, phase: "right-boundary" });
    tracker.visitNode(nodeId, node.value, {
      currentNode: nodeId,
      value: node.value,
      phase: "right-boundary",
    });
  }

  addLeftBoundary(rootNode.leftChildId);
  addLeaves(rootId);
  addRightBoundary(rootNode.rightChildId);

  tracker.complete({ result: tracker.getSteps().length });

  return tracker.getSteps();
}
