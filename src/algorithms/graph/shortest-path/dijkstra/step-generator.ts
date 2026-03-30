/** Step generator for Dijkstra's algorithm — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type WeightedAdjacencyList = Record<string, [string, number][]>;

export interface DijkstraInput {
  adjacencyList: WeightedAdjacencyList;
  startNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const DIJKSTRA_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DIJKSTRA!);

export function generateDijkstraSteps(input: DijkstraInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, DIJKSTRA_LINE_MAP);

  const distances: Record<string, number> = {};
  const visitedSet = new Set<string>();

  for (const nodeId of Object.keys(adjacencyList)) {
    distances[nodeId] = Infinity;
  }
  distances[startNodeId] = 0;

  // Min-priority queue: [distance, nodeId]
  const priorityQueue: [number, string][] = [[0, startNodeId]];

  tracker.setDistances({ ...distances });
  tracker.initialize({
    startNodeId,
    distances: { ...distances },
    priorityQueue: priorityQueue.map(([dist, nodeId]) => `${nodeId}(${dist})`),
  });

  while (priorityQueue.length > 0) {
    priorityQueue.sort((pairA, pairB) => pairA[0] - pairB[0]);
    const top = priorityQueue.shift()!;
    const currentDist = top[0];
    const currentNodeId = top[1];

    tracker.dequeue(currentNodeId, {
      currentNodeId,
      currentDist,
      distances: { ...distances },
      priorityQueue: priorityQueue.map(([dist, nodeId]) => `${nodeId}(${dist})`),
    });

    if (visitedSet.has(currentNodeId)) {
      continue;
    }
    visitedSet.add(currentNodeId);

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      distances: { ...distances },
      visitedSet: [...visitedSet],
    });

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const [neighborId, edgeWeight] of neighbors) {
      const tentativeDistance = currentDist + edgeWeight;

      tracker.relaxEdge(currentNodeId, neighborId, {
        currentNodeId,
        neighborId,
        edgeWeight,
        tentativeDistance,
        currentDistance: distances[neighborId] ?? Infinity,
      });

      if (tentativeDistance < (distances[neighborId] ?? Infinity)) {
        distances[neighborId] = tentativeDistance;
        priorityQueue.push([tentativeDistance, neighborId]);

        tracker.updateDistance(neighborId, tentativeDistance, {
          neighborId,
          newDistance: tentativeDistance,
          distances: { ...distances },
          priorityQueue: priorityQueue.map(([dist, nodeId]) => `${nodeId}(${dist})`),
        });
      }
    }
  }

  tracker.complete({
    distances: { ...distances },
    visitedSet: [...visitedSet],
  });

  return tracker.getSteps();
}
