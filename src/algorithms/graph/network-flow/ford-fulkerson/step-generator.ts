/** Step generator for Ford-Fulkerson — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface FordFulkersonInput {
  adjacencyList: Record<string, { target: string; capacity: number }[]>;
  sourceNodeId: string;
  sinkNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const FORD_FULKERSON_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FORD_FULKERSON!);

export function generateFordFulkersonSteps(input: FordFulkersonInput): ExecutionStep[] {
  const { adjacencyList, sourceNodeId, sinkNodeId, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, FORD_FULKERSON_LINE_MAP);

  // Guard: source === sink is a trivial case
  if (sourceNodeId === sinkNodeId) {
    tracker.initialize({ sourceNodeId, sinkNodeId, maxFlow: 0 });
    tracker.complete({ maxFlow: 0 });
    return tracker.getSteps();
  }

  // Build residual capacity map — ensure every node has an entry
  const residualCapacity: Record<string, Record<string, number>> = {};
  for (const nodeId of Object.keys(adjacencyList)) {
    residualCapacity[nodeId] = {};
  }
  for (const [nodeId, edgeList] of Object.entries(adjacencyList)) {
    for (const { target, capacity } of edgeList) {
      residualCapacity[target] ??= {};
      const prev = residualCapacity[nodeId]![target] ?? 0;
      residualCapacity[nodeId]![target] = prev + capacity;
    }
  }

  let maxFlow = 0;

  tracker.initialize({
    adjacencyList,
    sourceNodeId,
    sinkNodeId,
    maxFlow,
    residualCapacity: { ...residualCapacity },
  });

  // DFS to find augmenting path, emitting tracker steps
  function dfsAugment(currentId: string, visitedSet: Set<string>, bottleneck: number): number {
    if (currentId === sinkNodeId) return bottleneck;
    visitedSet.add(currentId);

    tracker.visitNode(currentId, {
      currentId,
      visitedSet: [...visitedSet],
      bottleneck,
    });

    const neighbors = Object.keys(residualCapacity[currentId] ?? {});
    for (const neighborId of neighbors) {
      const residual = residualCapacity[currentId]?.[neighborId] ?? 0;
      if (!visitedSet.has(neighborId) && residual > 0) {
        tracker.visitEdge(currentId, neighborId, {
          currentId,
          neighborId,
          residual,
          bottleneck,
        });

        const flow = dfsAugment(neighborId, visitedSet, Math.min(bottleneck, residual));
        if (flow > 0) {
          residualCapacity[currentId]![neighborId] = residual - flow;
          residualCapacity[neighborId] ??= {};
          const back = residualCapacity[neighborId]![currentId] ?? 0;
          residualCapacity[neighborId]![currentId] = back + flow;

          const isSaturated = (residualCapacity[currentId]![neighborId] ?? 0) === 0;
          if (isSaturated) {
            tracker.saturateEdge(currentId, neighborId, {
              currentId,
              neighborId,
              flow,
              maxFlow: maxFlow + flow,
            });
          } else {
            tracker.augmentFlow(currentId, neighborId, {
              currentId,
              neighborId,
              flow,
              maxFlow: maxFlow + flow,
            });
          }
          return flow;
        }
      }
    }
    return 0;
  }

  while (true) {
    const visitedSet = new Set<string>();
    const pathFlow = dfsAugment(sourceNodeId, visitedSet, Infinity);
    if (pathFlow === 0) break;
    maxFlow += pathFlow;
    tracker.setFlowState(maxFlow, maxFlow);
  }

  tracker.complete({ maxFlow });

  return tracker.getSteps();
}
