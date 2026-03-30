/** Step generator for Bridges (Cut Edges) — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface BridgesInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const BRIDGES_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BRIDGES!);

export function generateBridgesSteps(input: BridgesInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, BRIDGES_LINE_MAP, { undirected: true });

  const discoveryTime: Record<string, number> = {};
  const lowLink: Record<string, number> = {};
  const bridgeList: [string, string][] = [];
  let timer = 0;

  tracker.initialize({
    adjacencyList,
    nodeIds,
    discoveryTime: { ...discoveryTime },
    lowLink: { ...lowLink },
    bridges: [],
  });

  function dfs(nodeId: string, parentId: string | null): void {
    discoveryTime[nodeId] = timer;
    lowLink[nodeId] = timer;
    timer++;

    tracker.visitNode(nodeId, {
      nodeId,
      discoveryTime: discoveryTime[nodeId],
      lowLink: lowLink[nodeId],
      timer,
    });

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (discoveryTime[neighborId] === undefined) {
        tracker.visitEdge(nodeId, neighborId, {
          sourceId: nodeId,
          neighborId,
          edgeType: "tree-edge",
        });

        dfs(neighborId, nodeId);
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, lowLink[neighborId]!);

        if (lowLink[neighborId]! > discoveryTime[nodeId]!) {
          bridgeList.push([nodeId, neighborId]);
          tracker.markBridge(nodeId, neighborId, {
            sourceId: nodeId,
            targetId: neighborId,
            bridges: [...bridgeList],
          });
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
    bridges: bridgeList,
    bridgeCount: bridgeList.length,
  });

  return tracker.getSteps();
}
