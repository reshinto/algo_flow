/** Step generator for Articulation Points — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface ArticulationPointsInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const ARTICULATION_POINTS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ARTICULATION_POINTS!);

export function generateArticulationPointsSteps(input: ArticulationPointsInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, ARTICULATION_POINTS_LINE_MAP, {
    undirected: true,
  });

  const discoveryTime: Record<string, number> = {};
  const lowLink: Record<string, number> = {};
  const articulationSet = new Set<string>();
  let timer = 0;

  tracker.initialize({
    adjacencyList,
    nodeIds,
    discoveryTime: { ...discoveryTime },
    lowLink: { ...lowLink },
    articulationPoints: [],
  });

  function dfs(nodeId: string, parentId: string | null): void {
    discoveryTime[nodeId] = timer;
    lowLink[nodeId] = timer;
    timer++;
    let childCount = 0;

    tracker.visitNode(nodeId, {
      nodeId,
      discoveryTime: discoveryTime[nodeId],
      lowLink: lowLink[nodeId],
      timer,
    });

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (discoveryTime[neighborId] === undefined) {
        childCount++;
        tracker.visitEdge(nodeId, neighborId, {
          sourceId: nodeId,
          neighborId,
          edgeType: "tree-edge",
        });

        dfs(neighborId, nodeId);
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, lowLink[neighborId]!);

        const isRootWithMultipleChildren = parentId === null && childCount > 1;
        const isNonRootArticulation =
          parentId !== null && lowLink[neighborId]! >= discoveryTime[nodeId]!;

        if (isRootWithMultipleChildren || isNonRootArticulation) {
          if (!articulationSet.has(nodeId)) {
            articulationSet.add(nodeId);
            tracker.markArticulationPoint(nodeId, {
              nodeId,
              articulationPoints: [...articulationSet],
            });
          }
        }
      } else if (neighborId !== parentId) {
        tracker.visitEdge(nodeId, neighborId, {
          sourceId: nodeId,
          neighborId,
          edgeType: "back-edge",
        });
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, discoveryTime[neighborId]!);
      }
    }
  }

  for (const nodeId of nodeIds) {
    if (discoveryTime[nodeId] === undefined) {
      dfs(nodeId, null);
    }
  }

  tracker.complete({
    articulationPoints: [...articulationSet],
    articulationCount: articulationSet.size,
  });

  return tracker.getSteps();
}
