/** Step generator for DFS — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface DfsInput {
  adjacencyList: AdjacencyList;
  startNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const DFS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DFS!);

export function generateDfsSteps(input: DfsInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, DFS_LINE_MAP);

  const visitedSet = new Set<string>();
  const nodeStack: string[] = [startNodeId];

  tracker.initialize({
    adjacencyList,
    startNodeId,
    visitedSet: [...visitedSet],
    nodeStack: [...nodeStack],
  });

  tracker.pushToStack(startNodeId, {
    nodeId: startNodeId,
    nodeStack: [...nodeStack],
    visitedSet: [...visitedSet],
  });

  while (nodeStack.length > 0) {
    const currentNodeId = nodeStack.pop()!;

    tracker.popFromStack(currentNodeId, {
      currentNodeId,
      nodeStack: [...nodeStack],
      visitedSet: [...visitedSet],
    });

    if (visitedSet.has(currentNodeId)) {
      continue;
    }

    visitedSet.add(currentNodeId);

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      nodeStack: [...nodeStack],
      visitedSet: [...visitedSet],
    });

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        tracker.visitEdge(currentNodeId, neighborId, {
          currentNodeId,
          neighborId,
          nodeStack: [...nodeStack],
          visitedSet: [...visitedSet],
        });

        nodeStack.push(neighborId);

        tracker.pushToStack(neighborId, {
          nodeId: neighborId,
          nodeStack: [...nodeStack],
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
