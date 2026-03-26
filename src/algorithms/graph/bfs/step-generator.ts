import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import type { LineMap } from "@/trackers";

import type { AdjacencyList } from "./bfs";

export interface BfsInput {
  adjacencyList: AdjacencyList;
  startNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/*
 * Line mapping: step type → source file line numbers per language.
 *
 * BFS traverses the graph level-by-level using a FIFO queue, guaranteeing
 * nodes are visited in order of their distance from the start. Nodes are
 * marked visited when enqueued (not when dequeued) to prevent duplicates.
 */
const BFS_LINE_MAP: LineMap = {
  /* Create visit-order list, visited set, and seed the queue with start */
  initialize: {
    typescript: [1, 5, 6, 7, 8],
    python: [4, 5, 6, 7, 8],
    java: [4, 5, 6, 7, 8, 9],
  },
  /* Push a newly-discovered neighbor into the queue */
  enqueue: {
    typescript: [17],
    python: [18],
    java: [18],
  },
  /* Pop the front of the queue and record the visit */
  dequeue: {
    typescript: [11, 12],
    python: [11, 12],
    java: [11, 12],
  },
  /* Record the node in the visit-order output */
  visit: {
    typescript: [12],
    python: [12],
    java: [13],
  },
  /* Check each neighbor: if unvisited, mark and enqueue */
  "visit-edge": {
    typescript: [15, 16, 17],
    python: [16, 17, 18],
    java: [16, 17, 18],
  },
  /* Queue empty — all reachable nodes visited */
  complete: {
    typescript: [21],
    python: [20],
    java: [22],
  },
};

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
