/** Utility functions for computing trie tree layout positions. */

import type { TrieNode, TrieEdge } from "@/types";

export interface TrieLayoutNode {
  id: number;
  x: number;
  y: number;
}

/**
 * Compute (x, y) positions for trie nodes using a breadth-first level layout.
 * The root node (id=0) is placed at the top-center. Each subsequent level
 * distributes children evenly across the canvas width.
 */
export function computeTrieLayout(
  nodes: TrieNode[],
  edges: TrieEdge[],
  canvasWidth: number,
  levelHeight: number,
): TrieLayoutNode[] {
  if (nodes.length === 0) return [];

  // Build parent → children adjacency map from edges
  const childrenMap = new Map<number, number[]>();
  for (const node of nodes) {
    childrenMap.set(node.id, []);
  }
  for (const edge of edges) {
    const children = childrenMap.get(edge.from);
    if (children !== undefined) {
      children.push(edge.to);
    }
  }

  // BFS from root (id=0) to assign levels
  const levelGroups: number[][] = [];
  const visited = new Set<number>();
  const queue: number[] = [0];
  visited.add(0);

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let levelIndex = 0; levelIndex < levelSize; levelIndex++) {
      const nodeId = queue.shift();
      if (nodeId === undefined) break;
      currentLevel.push(nodeId);

      const children = childrenMap.get(nodeId) ?? [];
      for (const childId of children) {
        if (!visited.has(childId)) {
          visited.add(childId);
          queue.push(childId);
        }
      }
    }

    levelGroups.push(currentLevel);
  }

  // Assign (x, y) by spreading each level evenly across canvasWidth
  const layout: TrieLayoutNode[] = [];

  for (let levelIndex = 0; levelIndex < levelGroups.length; levelIndex++) {
    const levelNodes = levelGroups[levelIndex];
    if (levelNodes === undefined) continue;

    const nodeCount = levelNodes.length;
    const yPosition = levelIndex * levelHeight + levelHeight / 2;

    for (let positionIndex = 0; positionIndex < nodeCount; positionIndex++) {
      const nodeId = levelNodes[positionIndex];
      if (nodeId === undefined) continue;

      // Distribute evenly: divide canvas into nodeCount slots, center within each
      const slotWidth = canvasWidth / nodeCount;
      const xPosition = slotWidth * positionIndex + slotWidth / 2;

      layout.push({ id: nodeId, x: xPosition, y: yPosition });
    }
  }

  return layout;
}
