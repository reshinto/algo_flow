/** Step generator for IDDFS — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface IddfsInput {
  adjacencyList: AdjacencyList;
  startNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  maxDepth?: number;
}

/* Line map is built dynamically from @step markers in the source files */
const IDDFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.IDDFS!);

export function generateIddfsSteps(input: IddfsInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodes, edges, maxDepth } = input;
  const tracker = new GraphTracker(nodes, edges, IDDFS_LINE_MAP);

  const resolvedMaxDepth = maxDepth ?? Object.keys(adjacencyList).length;

  tracker.initialize({
    adjacencyList,
    startNodeId,
    resolvedMaxDepth,
    depthLimit: 0,
  });

  for (let depthLimit = 0; depthLimit <= resolvedMaxDepth; depthLimit++) {
    const visitedSet = new Set<string>();
    const nodeStack: Array<{ nodeId: string; depth: number }> = [{ nodeId: startNodeId, depth: 0 }];

    tracker.pushToStack(startNodeId, {
      nodeId: startNodeId,
      depthLimit,
      stackSize: nodeStack.length,
    });

    while (nodeStack.length > 0) {
      const frame = nodeStack.pop()!;
      const currentNodeId = frame.nodeId;
      const currentDepth = frame.depth;

      if (visitedSet.has(currentNodeId)) {
        tracker.backtrackNode(currentNodeId, {
          currentNodeId,
          currentDepth,
          depthLimit,
          reason: "already visited",
        });
        continue;
      }

      tracker.popFromStack(currentNodeId, {
        currentNodeId,
        currentDepth,
        depthLimit,
        stackSize: nodeStack.length,
      });

      visitedSet.add(currentNodeId);

      tracker.visitNode(currentNodeId, {
        currentNodeId,
        currentDepth,
        depthLimit,
        visitedSet: [...visitedSet],
      });

      if (currentDepth >= depthLimit) {
        continue;
      }

      const neighbors = adjacencyList[currentNodeId] ?? [];
      for (let neighborIndex = neighbors.length - 1; neighborIndex >= 0; neighborIndex--) {
        const neighborId = neighbors[neighborIndex]!;
        if (!visitedSet.has(neighborId)) {
          tracker.visitEdge(currentNodeId, neighborId, {
            currentNodeId,
            neighborId,
            currentDepth,
            depthLimit,
          });

          nodeStack.push({ nodeId: neighborId, depth: currentDepth + 1 });

          tracker.pushToStack(neighborId, {
            nodeId: neighborId,
            depth: currentDepth + 1,
            depthLimit,
            stackSize: nodeStack.length,
          });
        }
      }
    }

    const allVisited = Object.keys(adjacencyList).every((nodeId) => visitedSet.has(nodeId));
    if (allVisited) break;
  }

  tracker.complete({
    visitOrder: Object.keys(adjacencyList),
  });

  return tracker.getSteps();
}
