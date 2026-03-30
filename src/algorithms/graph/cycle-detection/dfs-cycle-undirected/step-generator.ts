/** Step generator for DFS Cycle Detection (Undirected) — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface DfsCycleUndirectedInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const DFS_CYCLE_UNDIRECTED_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DFS_CYCLE_UNDIRECTED!);

export function generateDfsCycleUndirectedSteps(input: DfsCycleUndirectedInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, DFS_CYCLE_UNDIRECTED_LINE_MAP, {
    undirected: true,
  });

  const visitedSet = new Set<string>();
  const parentMap: Record<string, string | null> = {};

  tracker.initialize({
    nodeIds,
    visitedSet: [...visitedSet],
    cycleDetected: false,
  });

  let cycleFound = false;

  function dfsVisit(currentNodeId: string, parentNodeId: string | null): boolean {
    visitedSet.add(currentNodeId);
    parentMap[currentNodeId] = parentNodeId;

    tracker.pushToStack(currentNodeId, {
      currentNodeId,
      parentNodeId,
      visitedSet: [...visitedSet],
      cycleDetected: false,
    });

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      parentNodeId,
      visitedSet: [...visitedSet],
      cycleDetected: false,
    });

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        tracker.classifyEdge(currentNodeId, neighborId, "tree-edge", {
          currentNodeId,
          neighborId,
          edgeType: "tree-edge",
          visitedSet: [...visitedSet],
          cycleDetected: false,
        });
        if (dfsVisit(neighborId, currentNodeId)) {
          return true;
        }
      } else if (neighborId !== parentNodeId) {
        tracker.classifyEdge(currentNodeId, neighborId, "back-edge", {
          currentNodeId,
          neighborId,
          edgeType: "back-edge",
          visitedSet: [...visitedSet],
          cycleDetected: true,
        });
        return true;
      }
    }

    tracker.popFromStack(currentNodeId, {
      currentNodeId,
      visitedSet: [...visitedSet],
      cycleDetected: false,
    });

    return false;
  }

  for (const nodeId of nodeIds) {
    if (!visitedSet.has(nodeId)) {
      if (dfsVisit(nodeId, null)) {
        cycleFound = true;
        break;
      }
    }
  }

  tracker.complete({
    cycleDetected: cycleFound,
    visitedSet: [...visitedSet],
  });

  return tracker.getSteps();
}
