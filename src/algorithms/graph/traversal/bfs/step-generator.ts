/** Step generator for BFS — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface BfsInput {
  adjacencyList: AdjacencyList;
  startNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const BFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BFS!);

export function generateBfsSteps(input: BfsInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, BFS_LINE_MAP);

  const visitedSet = new Set<string>();
  const nodeQueue: string[] = [startNodeId];
  visitedSet.add(startNodeId);

  tracker.initialize({
    adjacencyList,
    startNodeId,
    visitedSet: [...visitedSet],
    nodeQueue: [...nodeQueue],
  });

  tracker.enqueue(startNodeId, {
    nodeId: startNodeId,
    nodeQueue: [...nodeQueue],
    visitedSet: [...visitedSet],
  });

  while (nodeQueue.length > 0) {
    const currentNodeId = nodeQueue.shift()!;

    tracker.dequeue(currentNodeId, {
      currentNodeId,
      nodeQueue: [...nodeQueue],
      visitedSet: [...visitedSet],
    });

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      nodeQueue: [...nodeQueue],
      visitedSet: [...visitedSet],
    });

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        visitedSet.add(neighborId);

        tracker.visitEdge(currentNodeId, neighborId, {
          currentNodeId,
          neighborId,
          nodeQueue: [...nodeQueue],
          visitedSet: [...visitedSet],
        });

        nodeQueue.push(neighborId);

        tracker.enqueue(neighborId, {
          nodeId: neighborId,
          nodeQueue: [...nodeQueue],
          visitedSet: [...visitedSet],
        });
      }
    }
  }

  tracker.complete({
    visitOrder: [...visitedSet],
  });

  return tracker.getSteps();
}
