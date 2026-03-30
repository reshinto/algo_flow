/** Step generator for A* search — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type WeightedAdjacencyList = Record<string, [string, number][]>;

export interface AStarInput {
  adjacencyList: WeightedAdjacencyList;
  startNodeId: string;
  targetNodeId: string;
  heuristic: Record<string, number>;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const A_STAR_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.A_STAR!);

export function generateAStarSteps(input: AStarInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, targetNodeId, heuristic, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, A_STAR_LINE_MAP);

  const gCosts: Record<string, number> = {};
  const predecessors: Record<string, string | null> = {};
  const visitedSet = new Set<string>();

  for (const nodeId of Object.keys(adjacencyList)) {
    gCosts[nodeId] = Infinity;
    predecessors[nodeId] = null;
  }
  gCosts[startNodeId] = 0;

  const openQueue: [number, string][] = [[heuristic[startNodeId] ?? 0, startNodeId]];

  tracker.initialize({
    startNodeId,
    targetNodeId,
    heuristic,
    gCosts: { ...gCosts },
    openQueue: openQueue.map(([fCost, nodeId]) => `${nodeId}(f=${fCost})`),
  });

  while (openQueue.length > 0) {
    openQueue.sort((pairA, pairB) => pairA[0] - pairB[0]);
    const top = openQueue.shift()!;
    const currentNodeId = top[1];

    tracker.dequeue(currentNodeId, {
      currentNodeId,
      gCost: gCosts[currentNodeId] ?? Infinity,
      heuristic: heuristic[currentNodeId] ?? 0,
      openQueue: openQueue.map(([fCost, nodeId]) => `${nodeId}(f=${fCost})`),
    });

    if (visitedSet.has(currentNodeId)) {
      continue;
    }
    visitedSet.add(currentNodeId);

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      gCosts: { ...gCosts },
      visitedSet: [...visitedSet],
    });

    if (currentNodeId === targetNodeId) {
      // Reconstruct path for the complete step
      const path: string[] = [];
      let traceId: string | null = currentNodeId;
      while (traceId !== null) {
        path.unshift(traceId);
        traceId = predecessors[traceId] ?? null;
      }

      tracker.complete({
        path,
        gCosts: { ...gCosts },
        targetReached: true,
      });

      return tracker.getSteps();
    }

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const [neighborId, edgeWeight] of neighbors) {
      if (visitedSet.has(neighborId)) continue;

      const tentativeGCost = (gCosts[currentNodeId] ?? Infinity) + edgeWeight;

      tracker.relaxEdge(currentNodeId, neighborId, {
        currentNodeId,
        neighborId,
        edgeWeight,
        tentativeGCost,
        currentGCost: gCosts[neighborId] ?? Infinity,
        heuristicValue: heuristic[neighborId] ?? 0,
      });

      if (tentativeGCost < (gCosts[neighborId] ?? Infinity)) {
        gCosts[neighborId] = tentativeGCost;
        predecessors[neighborId] = currentNodeId;
        const fCost = tentativeGCost + (heuristic[neighborId] ?? 0);
        openQueue.push([fCost, neighborId]);

        tracker.updateDistance(neighborId, tentativeGCost, {
          neighborId,
          newGCost: tentativeGCost,
          fCost,
          gCosts: { ...gCosts },
          openQueue: openQueue.map(([fc, nodeId]) => `${nodeId}(f=${fc})`),
        });
      }
    }
  }

  tracker.complete({
    path: null,
    gCosts: { ...gCosts },
    targetReached: false,
  });

  return tracker.getSteps();
}
