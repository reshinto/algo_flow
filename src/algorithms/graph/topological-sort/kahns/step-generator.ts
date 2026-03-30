/** Step generator for Kahn's Algorithm — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface KahnsInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const KAHNS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KAHNS!);

export function generateKahnsSteps(input: KahnsInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, KAHNS_LINE_MAP);

  /* --- Compute in-degrees --- */
  const inDegreeMap: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    inDegreeMap[nodeId] = 0;
  }
  for (const nodeId of nodeIds) {
    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      inDegreeMap[neighborId] = (inDegreeMap[neighborId] ?? 0) + 1;
    }
  }

  tracker.setInDegree({ ...inDegreeMap });

  tracker.initialize({
    inDegreeMap: { ...inDegreeMap },
    nodeIds: [...nodeIds],
  });

  /* --- Seed queue with zero in-degree nodes --- */
  const nodeQueue: string[] = [];
  for (const nodeId of nodeIds) {
    if (inDegreeMap[nodeId] === 0) {
      nodeQueue.push(nodeId);
      tracker.enqueue(nodeId, {
        nodeId,
        nodeQueue: [...nodeQueue],
        inDegreeMap: { ...inDegreeMap },
      });
    }
  }

  const topologicalOrder: string[] = [];

  /* --- BFS processing loop --- */
  while (nodeQueue.length > 0) {
    const currentNodeId = nodeQueue.shift()!;

    tracker.dequeue(currentNodeId, {
      currentNodeId,
      nodeQueue: [...nodeQueue],
      topologicalOrder: [...topologicalOrder],
      inDegreeMap: { ...inDegreeMap },
    });

    topologicalOrder.push(currentNodeId);

    tracker.addToOrder(currentNodeId, {
      currentNodeId,
      topologicalOrder: [...topologicalOrder],
      nodeQueue: [...nodeQueue],
    });

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      inDegreeMap[neighborId] = (inDegreeMap[neighborId] ?? 1) - 1;
      tracker.setInDegree({ ...inDegreeMap });

      tracker.visitNode(neighborId, {
        currentNodeId,
        neighborId,
        newInDegree: inDegreeMap[neighborId],
        nodeQueue: [...nodeQueue],
        inDegreeMap: { ...inDegreeMap },
      });

      if (inDegreeMap[neighborId] === 0) {
        nodeQueue.push(neighborId);
        tracker.enqueue(neighborId, {
          nodeId: neighborId,
          nodeQueue: [...nodeQueue],
          inDegreeMap: { ...inDegreeMap },
        });
      }
    }
  }

  tracker.complete({
    topologicalOrder: [...topologicalOrder],
  });

  return tracker.getSteps();
}
