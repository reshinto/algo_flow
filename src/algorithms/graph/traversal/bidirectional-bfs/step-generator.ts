/** Step generator for Bidirectional BFS — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface BidirectionalBfsInput {
  adjacencyList: AdjacencyList;
  startNodeId: string;
  targetNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const BIDIRECTIONAL_BFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BIDIRECTIONAL_BFS!);

/** Build an undirected neighbor map from a directed adjacency list. */
function buildUndirectedNeighbors(adjacencyList: AdjacencyList): AdjacencyList {
  const undirected: AdjacencyList = {};
  for (const [nodeId, neighbors] of Object.entries(adjacencyList)) {
    undirected[nodeId] ??= [];
    for (const neighborId of neighbors) {
      undirected[nodeId]!.push(neighborId);
      undirected[neighborId] ??= [];
      if (!undirected[neighborId]!.includes(nodeId)) {
        undirected[neighborId]!.push(nodeId);
      }
    }
  }
  return undirected;
}

export function generateBidirectionalBfsSteps(input: BidirectionalBfsInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, targetNodeId, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, BIDIRECTIONAL_BFS_LINE_MAP);

  const undirectedNeighbors = buildUndirectedNeighbors(adjacencyList);

  // Each visited map stores nodeId -> parentId (null for roots)
  const forwardVisited = new Map<string, string | null>();
  const backwardVisited = new Map<string, string | null>();
  const forwardQueue: string[] = [];
  const backwardQueue: string[] = [];

  forwardVisited.set(startNodeId, null);
  backwardVisited.set(targetNodeId, null);
  forwardQueue.push(startNodeId);
  backwardQueue.push(targetNodeId);

  tracker.initialize({
    startNodeId,
    targetNodeId,
    forwardQueue: [...forwardQueue],
    backwardQueue: [...backwardQueue],
    forwardVisited: [...forwardVisited.keys()],
    backwardVisited: [...backwardVisited.keys()],
  });

  // Enqueue both starting nodes visually
  tracker.enqueue(startNodeId, {
    nodeId: startNodeId,
    frontier: "forward",
    forwardQueue: [...forwardQueue],
    backwardQueue: [...backwardQueue],
  });

  if (startNodeId !== targetNodeId) {
    tracker.enqueue(targetNodeId, {
      nodeId: targetNodeId,
      frontier: "backward",
      forwardQueue: [...forwardQueue],
      backwardQueue: [...backwardQueue],
    });
  }

  // Early exit: same start and target
  if (startNodeId === targetNodeId) {
    tracker.visitNode(startNodeId, {
      currentNodeId: startNodeId,
      forwardVisited: [...forwardVisited.keys()],
      backwardVisited: [...backwardVisited.keys()],
    });
    tracker.complete({
      path: [startNodeId],
      meetingNodeId: startNodeId,
    });
    return tracker.getSteps();
  }

  while (forwardQueue.length > 0 || backwardQueue.length > 0) {
    // Expand the forward frontier one step
    if (forwardQueue.length > 0) {
      const currentNodeId = forwardQueue.shift()!;

      tracker.dequeue(currentNodeId, {
        currentNodeId,
        frontier: "forward",
        forwardQueue: [...forwardQueue],
        backwardQueue: [...backwardQueue],
      });

      tracker.visitNode(currentNodeId, {
        currentNodeId,
        frontier: "forward",
        forwardVisited: [...forwardVisited.keys()],
        backwardVisited: [...backwardVisited.keys()],
      });

      const forwardNeighbors = undirectedNeighbors[currentNodeId] ?? [];
      for (const neighborId of forwardNeighbors) {
        if (!forwardVisited.has(neighborId)) {
          forwardVisited.set(neighborId, currentNodeId);

          tracker.visitEdge(currentNodeId, neighborId, {
            currentNodeId,
            neighborId,
            frontier: "forward",
            forwardQueue: [...forwardQueue],
            backwardQueue: [...backwardQueue],
            forwardVisited: [...forwardVisited.keys()],
          });

          forwardQueue.push(neighborId);

          tracker.enqueue(neighborId, {
            nodeId: neighborId,
            frontier: "forward",
            forwardQueue: [...forwardQueue],
            backwardQueue: [...backwardQueue],
          });

          if (backwardVisited.has(neighborId)) {
            tracker.complete({
              meetingNodeId: neighborId,
              forwardVisited: [...forwardVisited.keys()],
              backwardVisited: [...backwardVisited.keys()],
            });
            return tracker.getSteps();
          }
        }
      }
    }

    // Expand the backward frontier one step
    if (backwardQueue.length > 0) {
      const currentNodeId = backwardQueue.shift()!;

      tracker.dequeue(currentNodeId, {
        currentNodeId,
        frontier: "backward",
        forwardQueue: [...forwardQueue],
        backwardQueue: [...backwardQueue],
      });

      tracker.visitNode(currentNodeId, {
        currentNodeId,
        frontier: "backward",
        forwardVisited: [...forwardVisited.keys()],
        backwardVisited: [...backwardVisited.keys()],
      });

      const backwardNeighbors = undirectedNeighbors[currentNodeId] ?? [];
      for (const neighborId of backwardNeighbors) {
        if (!backwardVisited.has(neighborId)) {
          backwardVisited.set(neighborId, currentNodeId);

          tracker.visitEdge(currentNodeId, neighborId, {
            currentNodeId,
            neighborId,
            frontier: "backward",
            forwardQueue: [...forwardQueue],
            backwardQueue: [...backwardQueue],
            backwardVisited: [...backwardVisited.keys()],
          });

          backwardQueue.push(neighborId);

          tracker.enqueue(neighborId, {
            nodeId: neighborId,
            frontier: "backward",
            forwardQueue: [...forwardQueue],
            backwardQueue: [...backwardQueue],
          });

          if (forwardVisited.has(neighborId)) {
            tracker.complete({
              meetingNodeId: neighborId,
              forwardVisited: [...forwardVisited.keys()],
              backwardVisited: [...backwardVisited.keys()],
            });
            return tracker.getSteps();
          }
        }
      }
    }
  }

  tracker.complete({
    path: null,
    forwardVisited: [...forwardVisited.keys()],
    backwardVisited: [...backwardVisited.keys()],
  });

  return tracker.getSteps();
}
