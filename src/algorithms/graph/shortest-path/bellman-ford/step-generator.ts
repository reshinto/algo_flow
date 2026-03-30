/** Step generator for Bellman-Ford — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type WeightedAdjacencyList = Record<string, [string, number][]>;

export interface BellmanFordInput {
  adjacencyList: WeightedAdjacencyList;
  startNodeId: string;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const BELLMAN_FORD_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BELLMAN_FORD!);

export function generateBellmanFordSteps(input: BellmanFordInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, BELLMAN_FORD_LINE_MAP);

  const distances: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    distances[nodeId] = Infinity;
  }
  distances[startNodeId] = 0;

  tracker.setDistances({ ...distances });
  tracker.initialize({
    startNodeId,
    nodeIds,
    distances: { ...distances },
    passCount: nodeIds.length - 1,
  });

  const vertexCount = nodeIds.length;

  for (let passIndex = 0; passIndex < vertexCount - 1; passIndex++) {
    for (const sourceId of nodeIds) {
      const neighbors = adjacencyList[sourceId] ?? [];
      for (const [targetId, edgeWeight] of neighbors) {
        const sourceDist = distances[sourceId] ?? Infinity;
        if (sourceDist === Infinity) {
          tracker.visitEdge(sourceId, targetId, {
            sourceId,
            targetId,
            sourceDist,
            passIndex,
            skipped: true,
          });
          continue;
        }

        const tentativeDistance = sourceDist + edgeWeight;

        tracker.relaxEdge(sourceId, targetId, {
          sourceId,
          targetId,
          edgeWeight,
          tentativeDistance,
          currentDistance: distances[targetId] ?? Infinity,
          passIndex,
        });

        if (tentativeDistance < (distances[targetId] ?? Infinity)) {
          distances[targetId] = tentativeDistance;
          tracker.updateDistance(targetId, tentativeDistance, {
            targetId,
            newDistance: tentativeDistance,
            distances: { ...distances },
            passIndex,
          });
        }
      }
    }
  }

  // Negative cycle detection pass
  for (const sourceId of nodeIds) {
    const neighbors = adjacencyList[sourceId] ?? [];
    for (const [targetId, edgeWeight] of neighbors) {
      const sourceDist = distances[sourceId] ?? Infinity;
      if (sourceDist === Infinity) continue;
      if (sourceDist + edgeWeight < (distances[targetId] ?? Infinity)) {
        distances[targetId] = -Infinity;
        tracker.updateDistance(targetId, "-∞", {
          targetId,
          negativeCycleDetected: true,
          distances: { ...distances },
        });
      }
    }
  }

  tracker.complete({
    distances: { ...distances },
  });

  return tracker.getSteps();
}
