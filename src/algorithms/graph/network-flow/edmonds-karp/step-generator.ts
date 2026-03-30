/** Step generator for Edmonds-Karp — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface EdmondsKarpInput {
  adjacencyList: Record<string, { target: string; capacity: number }[]>;
  sourceNodeId: string;
  sinkNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const EDMONDS_KARP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.EDMONDS_KARP!);

export function generateEdmondsKarpSteps(input: EdmondsKarpInput): ExecutionStep[] {
  const { adjacencyList, sourceNodeId, sinkNodeId, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, EDMONDS_KARP_LINE_MAP);

  const residualCapacity: Record<string, Record<string, number>> = {};
  for (const [nodeId, edgeList] of Object.entries(adjacencyList)) {
    residualCapacity[nodeId] ??= {};
    for (const { target, capacity } of edgeList) {
      const prev = residualCapacity[nodeId]![target] ?? 0;
      residualCapacity[nodeId]![target] = prev + capacity;
      residualCapacity[target] ??= {};
    }
  }

  let maxFlow = 0;

  tracker.initialize({
    adjacencyList,
    sourceNodeId,
    sinkNodeId,
    maxFlow,
  });

  function bfsFindPath(): Record<string, string> | null {
    const parentMap: Record<string, string> = {};
    const visitedSet = new Set<string>([sourceNodeId]);
    const nodeQueue: string[] = [sourceNodeId];

    tracker.enqueue(sourceNodeId, {
      nodeId: sourceNodeId,
      nodeQueue: [...nodeQueue],
      visitedSet: [...visitedSet],
    });

    while (nodeQueue.length > 0) {
      const currentId = nodeQueue.shift()!;

      tracker.dequeue(currentId, {
        currentId,
        nodeQueue: [...nodeQueue],
        visitedSet: [...visitedSet],
      });

      tracker.visitNode(currentId, {
        currentId,
        nodeQueue: [...nodeQueue],
        visitedSet: [...visitedSet],
      });

      const neighbors = Object.keys(residualCapacity[currentId] ?? {});
      for (const neighborId of neighbors) {
        const residual = residualCapacity[currentId]?.[neighborId] ?? 0;
        if (!visitedSet.has(neighborId) && residual > 0) {
          visitedSet.add(neighborId);
          parentMap[neighborId] = currentId;
          nodeQueue.push(neighborId);

          tracker.enqueue(neighborId, {
            nodeId: neighborId,
            nodeQueue: [...nodeQueue],
            visitedSet: [...visitedSet],
          });

          if (neighborId === sinkNodeId) return parentMap;
        }
      }
    }
    return null;
  }

  let parentMap = bfsFindPath();
  while (parentMap !== null) {
    let bottleneck = Infinity;
    let currentId = sinkNodeId;
    while (currentId !== sourceNodeId) {
      const parentId = parentMap[currentId]!;
      const residual = residualCapacity[parentId]?.[currentId] ?? 0;
      bottleneck = Math.min(bottleneck, residual);
      currentId = parentId;
    }

    currentId = sinkNodeId;
    while (currentId !== sourceNodeId) {
      const parentId = parentMap[currentId]!;
      const fwd = residualCapacity[parentId]?.[currentId] ?? 0;
      residualCapacity[parentId]![currentId] = fwd - bottleneck;
      residualCapacity[currentId] ??= {};
      const back = residualCapacity[currentId]?.[parentId] ?? 0;
      residualCapacity[currentId]![parentId] = back + bottleneck;

      const isSaturated = (residualCapacity[parentId]![currentId] ?? 0) === 0;
      if (isSaturated) {
        tracker.saturateEdge(parentId, currentId, {
          parentId,
          currentId,
          bottleneck,
          maxFlow: maxFlow + bottleneck,
        });
      } else {
        tracker.augmentFlow(parentId, currentId, {
          parentId,
          currentId,
          bottleneck,
          maxFlow: maxFlow + bottleneck,
        });
      }

      currentId = parentId;
    }

    maxFlow += bottleneck;
    tracker.setFlowState(maxFlow, maxFlow);
    parentMap = bfsFindPath();
  }

  tracker.complete({ maxFlow });

  return tracker.getSteps();
}
