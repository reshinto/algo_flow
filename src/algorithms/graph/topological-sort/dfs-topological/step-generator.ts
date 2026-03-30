/** Step generator for DFS Topological Sort — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface DfsTopologicalInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const DFS_TOPOLOGICAL_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DFS_TOPOLOGICAL!);

export function generateDfsTopologicalSteps(input: DfsTopologicalInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, DFS_TOPOLOGICAL_LINE_MAP);

  const visitedSet = new Set<string>();
  const topologicalOrder: string[] = [];

  tracker.initialize({
    nodeIds: [...nodeIds],
    visitedSet: [],
    topologicalOrder: [],
  });

  function dfsVisit(currentNodeId: string): void {
    visitedSet.add(currentNodeId);

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      visitedSet: [...visitedSet],
      topologicalOrder: [...topologicalOrder],
    });

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        tracker.pushToStack(neighborId, {
          currentNodeId,
          neighborId,
          visitedSet: [...visitedSet],
          topologicalOrder: [...topologicalOrder],
        });

        dfsVisit(neighborId);

        tracker.popFromStack(neighborId, {
          currentNodeId,
          neighborId,
          visitedSet: [...visitedSet],
          topologicalOrder: [...topologicalOrder],
        });
      }
    }

    topologicalOrder.unshift(currentNodeId);

    tracker.processNode(currentNodeId, {
      currentNodeId,
      visitedSet: [...visitedSet],
      topologicalOrder: [...topologicalOrder],
    });

    tracker.addToOrder(currentNodeId, {
      currentNodeId,
      topologicalOrder: [...topologicalOrder],
    });
  }

  for (const nodeId of nodeIds) {
    if (!visitedSet.has(nodeId)) {
      tracker.pushToStack(nodeId, {
        nodeId,
        visitedSet: [...visitedSet],
        topologicalOrder: [...topologicalOrder],
      });

      dfsVisit(nodeId);

      tracker.popFromStack(nodeId, {
        nodeId,
        visitedSet: [...visitedSet],
        topologicalOrder: [...topologicalOrder],
      });
    }
  }

  tracker.complete({
    topologicalOrder: [...topologicalOrder],
  });

  return tracker.getSteps();
}
