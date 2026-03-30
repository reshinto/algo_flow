/** Step generator for Kruskal's algorithm — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface WeightedEdgeInput {
  source: string;
  target: string;
  weight: number;
}

export interface KruskalsInput {
  edges: WeightedEdgeInput[];
  nodeIds: string[];
  nodes: GraphNode[];
  graphEdges: GraphEdge[];
}

const KRUSKALS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KRUSKALS!);

/** Union-Find parent map for cycle detection during step generation. */
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

export function generateKruskalsSteps(input: KruskalsInput): ExecutionStep[] {
  const { edges, nodeIds, nodes, graphEdges } = input;
  const tracker = new GraphTracker(nodes, graphEdges, KRUSKALS_LINE_MAP, { undirected: true });

  const { parent, rank } = makeUnionFind(nodeIds);
  const mstEdges: WeightedEdgeInput[] = [];

  tracker.initialize({
    nodeIds,
    edgeCount: edges.length,
    mstEdges: [],
  });

  const sortedEdges = [...edges].sort((edgeA, edgeB) => edgeA.weight - edgeB.weight);

  for (const edge of sortedEdges) {
    const sourceRoot = findRoot(parent, edge.source);
    const targetRoot = findRoot(parent, edge.target);

    tracker.visitEdge(edge.source, edge.target, {
      edge,
      sourceRoot,
      targetRoot,
      mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
    });

    if (sourceRoot !== targetRoot) {
      unionComponents(parent, rank, edge.source, edge.target);
      mstEdges.push(edge);

      tracker.addToMST(edge.source, edge.target, {
        edge,
        mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
        mstWeight: mstEdges.reduce((total, mstEdge) => total + mstEdge.weight, 0),
      });

      tracker.mergeComponents(edge.source, edge.target, {
        sourceRoot,
        targetRoot,
        mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
      });
    } else {
      tracker.rejectEdge(edge.source, edge.target, {
        edge,
        reason: "would create a cycle",
        mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
      });
    }

    if (mstEdges.length === nodeIds.length - 1) break;
  }

  const totalWeight = mstEdges.reduce((total, mstEdge) => total + mstEdge.weight, 0);
  tracker.complete({
    mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
    totalWeight,
  });

  return tracker.getSteps();
}
