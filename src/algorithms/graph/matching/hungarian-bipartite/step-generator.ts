/** Step generator for Hungarian Bipartite Matching — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface HungarianBipartiteInput {
  adjacencyList: AdjacencyList;
  leftNodes: string[];
  rightNodes: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const HUNGARIAN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HUNGARIAN_BIPARTITE!);

/** Attempt to find an augmenting path from leftNode using DFS, emitting steps via tracker. */
function tryAugmentWithSteps(
  leftNodeId: string,
  adjacencyList: AdjacencyList,
  matchLeft: Record<string, string>,
  matchRight: Record<string, string>,
  visitedRight: Set<string>,
  tracker: GraphTracker,
): boolean {
  const neighbors = adjacencyList[leftNodeId] ?? [];

  for (const rightNodeId of neighbors) {
    if (visitedRight.has(rightNodeId)) continue;
    visitedRight.add(rightNodeId);

    tracker.visitEdge(leftNodeId, rightNodeId, {
      leftNodeId,
      rightNodeId,
      visitedRight: [...visitedRight],
      matchLeft: { ...matchLeft },
      matchRight: { ...matchRight },
    });

    const currentOwner = matchRight[rightNodeId];
    const canAugment =
      currentOwner === undefined ||
      tryAugmentWithSteps(
        currentOwner,
        adjacencyList,
        matchLeft,
        matchRight,
        visitedRight,
        tracker,
      );

    if (canAugment) {
      matchLeft[leftNodeId] = rightNodeId;
      matchRight[rightNodeId] = leftNodeId;

      tracker.matchEdge(leftNodeId, rightNodeId, {
        leftNodeId,
        rightNodeId,
        matchLeft: { ...matchLeft },
        matchRight: { ...matchRight },
      });

      return true;
    }
  }

  return false;
}

export function generateHungarianBipartiteSteps(input: HungarianBipartiteInput): ExecutionStep[] {
  const { adjacencyList, leftNodes, rightNodes, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, HUNGARIAN_LINE_MAP, { undirected: true });

  const matchLeft: Record<string, string> = {};
  const matchRight: Record<string, string> = {};

  tracker.initialize({
    adjacencyList,
    leftNodes,
    rightNodes,
    matchLeft: { ...matchLeft },
    matchRight: { ...matchRight },
  });

  for (const leftNodeId of leftNodes) {
    const visitedRight = new Set<string>();

    tracker.visitNode(leftNodeId, {
      leftNodeId,
      visitedRight: [...visitedRight],
      matchLeft: { ...matchLeft },
      matchRight: { ...matchRight },
    });

    tryAugmentWithSteps(leftNodeId, adjacencyList, matchLeft, matchRight, visitedRight, tracker);
  }

  tracker.complete({
    matchLeft: { ...matchLeft },
    matchRight: { ...matchRight },
    matchingSize: Object.keys(matchLeft).length,
  });

  return tracker.getSteps();
}
