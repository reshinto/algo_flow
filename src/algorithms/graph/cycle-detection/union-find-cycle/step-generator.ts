/** Step generator for Union-Find Cycle Detection — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface EdgeInput {
  source: string;
  target: string;
}

export interface UnionFindCycleInput {
  edges: EdgeInput[];
  nodeIds: string[];
  nodes: GraphNode[];
  graphEdges: GraphEdge[];
}

const UNION_FIND_CYCLE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.UNION_FIND_CYCLE!);

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

export function generateUnionFindCycleSteps(input: UnionFindCycleInput): ExecutionStep[] {
  const { edges, nodeIds, nodes, graphEdges } = input;
  const tracker = new GraphTracker(nodes, graphEdges, UNION_FIND_CYCLE_LINE_MAP, {
    undirected: true,
  });

  const { parent, rank } = makeUnionFind(nodeIds);

  tracker.initialize({
    nodeIds,
    edgeCount: edges.length,
    parent: { ...parent },
    cycleDetected: false,
  });

  let cycleFound = false;

  for (const edge of edges) {
    const sourceRoot = findRoot(parent, edge.source);
    const targetRoot = findRoot(parent, edge.target);

    tracker.visitEdge(edge.source, edge.target, {
      edge,
      sourceRoot,
      targetRoot,
      parent: { ...parent },
      cycleDetected: sourceRoot === targetRoot,
    });

    if (sourceRoot === targetRoot) {
      cycleFound = true;
      break;
    }

    unionComponents(parent, rank, edge.source, edge.target);

    tracker.mergeComponents(edge.source, edge.target, {
      edge,
      sourceRoot,
      targetRoot,
      parent: { ...parent },
      cycleDetected: false,
    });
  }

  tracker.complete({
    cycleDetected: cycleFound,
    parent: { ...parent },
  });

  return tracker.getSteps();
}
