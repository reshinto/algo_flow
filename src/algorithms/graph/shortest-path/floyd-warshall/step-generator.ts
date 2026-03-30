/** Step generator for Floyd-Warshall — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type WeightedAdjacencyList = Record<string, [string, number][]>;

export interface FloydWarshallInput {
  adjacencyList: WeightedAdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const FLOYD_WARSHALL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLOYD_WARSHALL!);

export function generateFloydWarshallSteps(input: FloydWarshallInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, FLOYD_WARSHALL_LINE_MAP);

  // Initialize distance matrix
  const distances: Record<string, Record<string, number>> = {};
  for (const sourceId of nodeIds) {
    distances[sourceId] = {};
    for (const targetId of nodeIds) {
      distances[sourceId]![targetId] = sourceId === targetId ? 0 : Infinity;
    }
  }
  for (const sourceId of nodeIds) {
    const neighbors = adjacencyList[sourceId] ?? [];
    for (const [targetId, edgeWeight] of neighbors) {
      distances[sourceId]![targetId] = edgeWeight;
    }
  }

  // Flatten distances for tracker display
  const flatDistances = (): Record<string, number | string> => {
    const flat: Record<string, number | string> = {};
    for (const sourceId of nodeIds) {
      for (const targetId of nodeIds) {
        const dist = distances[sourceId]![targetId] ?? Infinity;
        flat[`${sourceId}→${targetId}`] = dist === Infinity ? "∞" : dist;
      }
    }
    return flat;
  };

  tracker.initialize({
    nodeIds,
    distances: flatDistances(),
  });

  for (const intermediateId of nodeIds) {
    tracker.processNode(intermediateId, {
      intermediateId,
      distances: flatDistances(),
    });

    for (const sourceId of nodeIds) {
      for (const targetId of nodeIds) {
        const distThroughIntermediate =
          (distances[sourceId]![intermediateId] ?? Infinity) +
          (distances[intermediateId]![targetId] ?? Infinity);

        tracker.relaxEdge(sourceId, targetId, {
          sourceId,
          targetId,
          intermediateId,
          distThroughIntermediate,
          currentDist: distances[sourceId]![targetId] ?? Infinity,
        });

        if (distThroughIntermediate < (distances[sourceId]![targetId] ?? Infinity)) {
          distances[sourceId]![targetId] = distThroughIntermediate;

          tracker.updateDistance(targetId, distThroughIntermediate, {
            sourceId,
            targetId,
            intermediateId,
            newDistance: distThroughIntermediate,
            distances: flatDistances(),
          });
        }
      }
    }
  }

  tracker.complete({
    distances: flatDistances(),
  });

  return tracker.getSteps();
}
