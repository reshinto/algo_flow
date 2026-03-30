/** Step generator for Hierholzer's Algorithm — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface HierholzersInput {
  adjacencyList: AdjacencyList;
  startNodeId: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* Line map is built dynamically from @step markers in the source files */
const HIERHOLZERS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HIERHOLZERS!);

export function generateHierholzersSteps(input: HierholzersInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, HIERHOLZERS_LINE_MAP, { undirected: true });

  // Build a mutable copy of the adjacency list to track remaining (unused) edges
  const remainingEdges: Record<string, string[]> = {};
  for (const nodeId of Object.keys(adjacencyList)) {
    remainingEdges[nodeId] = [...(adjacencyList[nodeId] ?? [])];
  }

  const circuit: string[] = [];
  const nodeStack: string[] = [startNodeId];

  tracker.initialize({
    adjacencyList,
    startNodeId,
    nodeStack: [...nodeStack],
    circuit: [...circuit],
  });

  tracker.pushToStack(startNodeId, {
    nodeStack: [...nodeStack],
    circuit: [...circuit],
  });

  while (nodeStack.length > 0) {
    const currentNodeId = nodeStack[nodeStack.length - 1]!;

    tracker.visitNode(currentNodeId, {
      currentNodeId,
      nodeStack: [...nodeStack],
      circuit: [...circuit],
    });

    const currentNeighbors = remainingEdges[currentNodeId] ?? [];

    if (currentNeighbors.length > 0) {
      const nextNodeId = currentNeighbors.shift()!;

      // Remove the reverse edge for undirected graph
      const reverseNeighbors = remainingEdges[nextNodeId] ?? [];
      const reverseIndex = reverseNeighbors.indexOf(currentNodeId);
      if (reverseIndex !== -1) {
        reverseNeighbors.splice(reverseIndex, 1);
      }

      tracker.useEdge(currentNodeId, nextNodeId, {
        currentNodeId,
        nextNodeId,
        nodeStack: [...nodeStack],
        circuit: [...circuit],
      });

      nodeStack.push(nextNodeId);

      tracker.pushToStack(nextNodeId, {
        nodeStack: [...nodeStack],
        circuit: [...circuit],
      });
    } else {
      // No unused edges — pop and add to circuit
      nodeStack.pop();

      tracker.popFromStack(currentNodeId, {
        currentNodeId,
        nodeStack: [...nodeStack],
        circuit: [...circuit],
      });

      circuit.unshift(currentNodeId);
    }
  }

  tracker.complete({
    circuit: [...circuit],
  });

  return tracker.getSteps();
}
