/** Step generator for Bipartite Check — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface BipartiteCheckInput {
  adjacencyList: Record<string, string[]>;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const BIPARTITE_CHECK_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BIPARTITE_CHECK!);

export function generateBipartiteCheckSteps(input: BipartiteCheckInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, BIPARTITE_CHECK_LINE_MAP, { undirected: true });

  const coloring: Record<string, number> = {};

  tracker.initialize({
    adjacencyList,
    nodeIds,
    coloring: { ...coloring },
    isBipartite: true,
  });

  for (const startNodeId of nodeIds) {
    if (coloring[startNodeId] !== undefined) continue;

    coloring[startNodeId] = 0;
    const nodeQueue: string[] = [startNodeId];

    tracker.enqueue(startNodeId, {
      nodeId: startNodeId,
      color: 0,
      nodeQueue: [...nodeQueue],
      coloring: { ...coloring },
    });

    while (nodeQueue.length > 0) {
      const currentId = nodeQueue.shift()!;
      const currentColor = coloring[currentId]!;

      tracker.dequeue(currentId, {
        currentId,
        currentColor,
        nodeQueue: [...nodeQueue],
        coloring: { ...coloring },
      });

      tracker.visitNode(currentId, {
        currentId,
        currentColor,
        coloring: { ...coloring },
      });

      const neighbors = adjacencyList[currentId] ?? [];
      for (const neighborId of neighbors) {
        if (coloring[neighborId] === undefined) {
          coloring[neighborId] = 1 - currentColor;
          nodeQueue.push(neighborId);

          tracker.assignColor(neighborId, coloring[neighborId], {
            neighborId,
            assignedColor: coloring[neighborId],
            currentId,
            nodeQueue: [...nodeQueue],
            coloring: { ...coloring },
          });
        } else if (coloring[neighborId] === currentColor) {
          tracker.markConflict(neighborId, {
            neighborId,
            currentId,
            conflictColor: currentColor,
            coloring: { ...coloring },
            isBipartite: false,
          });

          tracker.complete({
            isBipartite: false,
            coloring: { ...coloring },
          });

          return tracker.getSteps();
        }
      }
    }
  }

  tracker.complete({
    isBipartite: true,
    coloring: { ...coloring },
  });

  return tracker.getSteps();
}
