/** Step generator for DFS Cycle Detection (Directed) — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface DfsCycleDirectedInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const DFS_CYCLE_DIRECTED_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.DFS_CYCLE_DIRECTED!);

type NodeColor = "white" | "gray" | "black";

export function generateDfsCycleDirectedSteps(input: DfsCycleDirectedInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, DFS_CYCLE_DIRECTED_LINE_MAP);

  const colorMap: Record<string, NodeColor> = {};
  for (const nodeId of nodeIds) {
    colorMap[nodeId] = "white";
  }

  tracker.initialize({
    nodeIds,
    colorMap: { ...colorMap },
    cycleDetected: false,
  });

  let cycleFound = false;

  function dfsVisit(currentNodeId: string): boolean {
    colorMap[currentNodeId] = "gray";

    tracker.pushToStack(currentNodeId, {
      currentNodeId,
      colorMap: { ...colorMap },
      cycleDetected: false,
    });

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      colorMap: { ...colorMap },
      cycleDetected: false,
    });

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      if (colorMap[neighborId] === "gray") {
        tracker.classifyEdge(currentNodeId, neighborId, "back-edge", {
          currentNodeId,
          neighborId,
          edgeType: "back-edge",
          colorMap: { ...colorMap },
          cycleDetected: true,
        });
        return true;
      }
      if (colorMap[neighborId] === "white") {
        tracker.classifyEdge(currentNodeId, neighborId, "tree-edge", {
          currentNodeId,
          neighborId,
          edgeType: "tree-edge",
          colorMap: { ...colorMap },
          cycleDetected: false,
        });
        if (dfsVisit(neighborId)) {
          return true;
        }
      }
    }

    colorMap[currentNodeId] = "black";

    tracker.processNode(currentNodeId, {
      currentNodeId,
      colorMap: { ...colorMap },
      cycleDetected: false,
    });

    tracker.popFromStack(currentNodeId, {
      currentNodeId,
      colorMap: { ...colorMap },
      cycleDetected: false,
    });

    return false;
  }

  for (const nodeId of nodeIds) {
    if (colorMap[nodeId] === "white") {
      if (dfsVisit(nodeId)) {
        cycleFound = true;
        break;
      }
    }
  }

  tracker.complete({
    cycleDetected: cycleFound,
    colorMap: { ...colorMap },
  });

  return tracker.getSteps();
}
