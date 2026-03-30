/** Step generator for Connected Components — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface ConnectedComponentsInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const CONNECTED_COMPONENTS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.CONNECTED_COMPONENTS!);

export function generateConnectedComponentsSteps(input: ConnectedComponentsInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, CONNECTED_COMPONENTS_LINE_MAP, {
    undirected: true,
  });

  const visitedSet = new Set<string>();
  let componentIndex = 0;

  tracker.initialize({
    adjacencyList,
    nodeIds,
    visitedSet: [...visitedSet],
    components: [],
  });

  for (const startNodeId of nodeIds) {
    if (visitedSet.has(startNodeId)) continue;

    const currentComponentNodes: string[] = [];
    const nodeQueue: string[] = [startNodeId];
    visitedSet.add(startNodeId);

    tracker.enqueue(startNodeId, {
      nodeId: startNodeId,
      nodeQueue: [...nodeQueue],
      visitedSet: [...visitedSet],
      componentIndex,
    });

    while (nodeQueue.length > 0) {
      const currentNodeId = nodeQueue.shift()!;
      currentComponentNodes.push(currentNodeId);

      tracker.dequeue(currentNodeId, {
        currentNodeId,
        nodeQueue: [...nodeQueue],
        visitedSet: [...visitedSet],
      });

      tracker.visitNode(currentNodeId, {
        currentNodeId,
        nodeQueue: [...nodeQueue],
        visitedSet: [...visitedSet],
      });

      const neighbors = adjacencyList[currentNodeId] ?? [];
      for (const neighborId of neighbors) {
        if (!visitedSet.has(neighborId)) {
          visitedSet.add(neighborId);

          tracker.visitEdge(currentNodeId, neighborId, {
            currentNodeId,
            neighborId,
            nodeQueue: [...nodeQueue],
            visitedSet: [...visitedSet],
          });

          nodeQueue.push(neighborId);

          tracker.enqueue(neighborId, {
            nodeId: neighborId,
            nodeQueue: [...nodeQueue],
            visitedSet: [...visitedSet],
            componentIndex,
          });
        }
      }
    }

    for (const nodeId of currentComponentNodes) {
      tracker.assignComponent(nodeId, componentIndex, {
        nodeId,
        componentIndex,
        componentNodes: [...currentComponentNodes],
      });
    }

    componentIndex++;
  }

  tracker.complete({
    componentCount: componentIndex,
  });

  return tracker.getSteps();
}
