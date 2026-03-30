/** Step generator for DAG Shortest Path — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type WeightedAdjacencyList = Record<string, [string, number][]>;

export interface DagShortestPathInput {
  adjacencyList: WeightedAdjacencyList;
  startNodeId: string;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const DAG_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DAG_SHORTEST_PATH!);

export function generateDagShortestPathSteps(input: DagShortestPathInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, DAG_LINE_MAP);

  const distances: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    distances[nodeId] = Infinity;
  }
  distances[startNodeId] = 0;

  tracker.initialize({
    startNodeId,
    nodeIds,
    distances: { ...distances },
  });

  // Topological sort via DFS
  const visitedSet = new Set<string>();
  const topologicalOrder: string[] = [];

  function dfsVisit(nodeId: string): void {
    visitedSet.add(nodeId);
    const neighbors = adjacencyList[nodeId] ?? [];
    for (const [neighborId] of neighbors) {
      if (!visitedSet.has(neighborId)) {
        dfsVisit(neighborId);
      }
    }
    topologicalOrder.unshift(nodeId);

    tracker.addToOrder(nodeId, {
      nodeId,
      topologicalOrder: [...topologicalOrder],
    });
  }

  for (const nodeId of nodeIds) {
    if (!visitedSet.has(nodeId)) {
      dfsVisit(nodeId);
    }
  }

  // Relax edges in topological order
  for (const nodeId of topologicalOrder) {
    if (distances[nodeId] === Infinity) {
      tracker.processNode(nodeId, {
        nodeId,
        distances: { ...distances },
        skippedReason: "unreachable",
      });
      continue;
    }

    tracker.processNode(nodeId, {
      nodeId,
      distances: { ...distances },
      currentDistance: distances[nodeId],
    });

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const [neighborId, edgeWeight] of neighbors) {
      const tentativeDistance = (distances[nodeId] ?? Infinity) + edgeWeight;

      tracker.relaxEdge(nodeId, neighborId, {
        nodeId,
        neighborId,
        edgeWeight,
        tentativeDistance,
        currentDistance: distances[neighborId] ?? Infinity,
      });

      if (tentativeDistance < (distances[neighborId] ?? Infinity)) {
        distances[neighborId] = tentativeDistance;

        tracker.updateDistance(neighborId, tentativeDistance, {
          neighborId,
          newDistance: tentativeDistance,
          distances: { ...distances },
        });
      }
    }
  }

  tracker.complete({
    distances: { ...distances },
    topologicalOrder: [...topologicalOrder],
  });

  return tracker.getSteps();
}
