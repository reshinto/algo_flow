/** Step generator for Greedy Graph Coloring — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface GreedyColoringInput {
  adjacencyList: Record<string, string[]>;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const GREEDY_COLORING_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.GREEDY_COLORING!);

export function generateGreedyColoringSteps(input: GreedyColoringInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, GREEDY_COLORING_LINE_MAP, { undirected: true });

  const colorAssignment: Record<string, number> = {};

  tracker.initialize({
    adjacencyList,
    nodeIds,
    colorAssignment: { ...colorAssignment },
  });

  for (const nodeId of nodeIds) {
    const neighborColors = new Set<number>();
    const neighbors = adjacencyList[nodeId] ?? [];

    tracker.visitNode(nodeId, {
      nodeId,
      neighbors,
      colorAssignment: { ...colorAssignment },
    });

    for (const neighborId of neighbors) {
      if (colorAssignment[neighborId] !== undefined) {
        neighborColors.add(colorAssignment[neighborId]!);
      }
    }

    let assignedColor = 0;
    while (neighborColors.has(assignedColor)) {
      assignedColor++;
    }
    colorAssignment[nodeId] = assignedColor;

    tracker.assignColor(nodeId, assignedColor, {
      nodeId,
      assignedColor,
      neighborColors: [...neighborColors],
      colorAssignment: { ...colorAssignment },
    });
  }

  tracker.complete({
    colorAssignment: { ...colorAssignment },
    chromaticNumber: Math.max(...Object.values(colorAssignment)) + 1,
  });

  return tracker.getSteps();
}
