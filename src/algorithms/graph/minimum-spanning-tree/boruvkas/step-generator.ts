/** Step generator for Borůvka's algorithm — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface WeightedEdgeInput {
  source: string;
  target: string;
  weight: number;
}

export interface BoruvkasInput {
  edges: WeightedEdgeInput[];
  nodeIds: string[];
  nodes: GraphNode[];
  graphEdges: GraphEdge[];
}

const BORUVKAS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BORUVKAS!);

function makeUnionFind(nodeIds: string[]): {
  parent: Record<string, string>;
  rank: Record<string, number>;
} {
  const parent: Record<string, string> = {};
  const rank: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    parent[nodeId] = nodeId;
    rank[nodeId] = 0;
  }
  return { parent, rank };
}

function findRoot(parent: Record<string, string>, nodeId: string): string {
  if (parent[nodeId] !== nodeId) {
    parent[nodeId] = findRoot(parent, parent[nodeId]!);
  }
  return parent[nodeId]!;
}

function unionComponents(
  parent: Record<string, string>,
  rank: Record<string, number>,
  nodeA: string,
  nodeB: string,
): void {
  const rootA = findRoot(parent, nodeA);
  const rootB = findRoot(parent, nodeB);
  if (rootA === rootB) return;
  if ((rank[rootA] ?? 0) < (rank[rootB] ?? 0)) {
    parent[rootA] = rootB;
  } else if ((rank[rootA] ?? 0) > (rank[rootB] ?? 0)) {
    parent[rootB] = rootA;
  } else {
    parent[rootB] = rootA;
    rank[rootA] = (rank[rootA] ?? 0) + 1;
  }
}

export function generateBoruvkasSteps(input: BoruvkasInput): ExecutionStep[] {
  const { edges, nodeIds, nodes, graphEdges } = input;
  const tracker = new GraphTracker(nodes, graphEdges, BORUVKAS_LINE_MAP, { undirected: true });

  const { parent, rank } = makeUnionFind(nodeIds);
  const mstEdges: WeightedEdgeInput[] = [];
  let componentCount = nodeIds.length;

  tracker.initialize({
    nodeIds,
    componentCount,
    edgeCount: edges.length,
  });

  while (componentCount > 1) {
    const cheapestEdge: Record<string, WeightedEdgeInput | null> = {};

    for (const edge of edges) {
      const sourceRoot = findRoot(parent, edge.source);
      const targetRoot = findRoot(parent, edge.target);

      if (sourceRoot === targetRoot) continue;

      tracker.visitEdge(edge.source, edge.target, {
        edge,
        sourceRoot,
        targetRoot,
        componentCount,
        mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
      });

      const existingForSource = cheapestEdge[sourceRoot];
      if (!existingForSource || edge.weight < existingForSource.weight) {
        cheapestEdge[sourceRoot] = edge;
      }
      const existingForTarget = cheapestEdge[targetRoot];
      if (!existingForTarget || edge.weight < existingForTarget.weight) {
        cheapestEdge[targetRoot] = edge;
      }
    }

    for (const cheapest of Object.values(cheapestEdge)) {
      if (!cheapest) continue;
      const sourceRoot = findRoot(parent, cheapest.source);
      const targetRoot = findRoot(parent, cheapest.target);
      if (sourceRoot === targetRoot) continue;

      unionComponents(parent, rank, cheapest.source, cheapest.target);
      mstEdges.push(cheapest);
      componentCount--;

      tracker.addToMST(cheapest.source, cheapest.target, {
        edge: cheapest,
        mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
        mstWeight: mstEdges.reduce((total, mstEdge) => total + mstEdge.weight, 0),
      });

      tracker.mergeComponents(cheapest.source, cheapest.target, {
        sourceRoot,
        targetRoot,
        componentCount,
        mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
      });
    }
  }

  const totalWeight = mstEdges.reduce((total, mstEdge) => total + mstEdge.weight, 0);
  tracker.complete({
    mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
    totalWeight,
  });

  return tracker.getSteps();
}
