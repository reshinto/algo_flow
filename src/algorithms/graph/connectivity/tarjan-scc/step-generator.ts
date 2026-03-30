/** Step generator for Tarjan's SCC — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface TarjanSccInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const TARJAN_SCC_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TARJAN_SCC!);

export function generateTarjanSccSteps(input: TarjanSccInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, TARJAN_SCC_LINE_MAP);

  const discoveryTime: Record<string, number> = {};
  const lowLink: Record<string, number> = {};
  const onStack: Record<string, boolean> = {};
  const nodeStack: string[] = [];
  let timer = 0;
  let componentIndex = 0;

  tracker.initialize({
    adjacencyList,
    nodeIds,
    discoveryTime: { ...discoveryTime },
    lowLink: { ...lowLink },
    nodeStack: [...nodeStack],
  });

  function dfs(nodeId: string): void {
    discoveryTime[nodeId] = timer;
    lowLink[nodeId] = timer;
    timer++;

    tracker.visitNode(nodeId, {
      nodeId,
      discoveryTime: discoveryTime[nodeId],
      lowLink: lowLink[nodeId],
      timer,
    });

    nodeStack.push(nodeId);
    onStack[nodeId] = true;

    tracker.pushToStack(nodeId, {
      nodeId,
      nodeStack: [...nodeStack],
    });

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (discoveryTime[neighborId] === undefined) {
        tracker.visitEdge(nodeId, neighborId, {
          sourceId: nodeId,
          neighborId,
          edgeType: "tree-edge",
        });
        dfs(neighborId);
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, lowLink[neighborId]!);
      } else if (onStack[neighborId]) {
        tracker.visitEdge(nodeId, neighborId, {
          sourceId: nodeId,
          neighborId,
          edgeType: "back-edge",
        });
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, discoveryTime[neighborId]!);
      }
    }

    if (lowLink[nodeId] === discoveryTime[nodeId]) {
      let poppedNodeId: string;
      const componentNodes: string[] = [];
      do {
        poppedNodeId = nodeStack.pop()!;
        onStack[poppedNodeId] = false;
        componentNodes.push(poppedNodeId);

        tracker.popFromStack(poppedNodeId, {
          nodeId: poppedNodeId,
          nodeStack: [...nodeStack],
        });
      } while (poppedNodeId !== nodeId);

      for (const componentNodeId of componentNodes) {
        tracker.assignComponent(componentNodeId, componentIndex, {
          nodeId: componentNodeId,
          componentIndex,
          componentNodes: [...componentNodes],
        });
      }
      componentIndex++;
    }
  }

  for (const nodeId of nodeIds) {
    if (discoveryTime[nodeId] === undefined) {
      dfs(nodeId);
    }
  }

  tracker.complete({
    componentCount: componentIndex,
  });

  return tracker.getSteps();
}
