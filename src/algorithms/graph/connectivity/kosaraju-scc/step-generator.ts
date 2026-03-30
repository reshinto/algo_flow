/** Step generator for Kosaraju's SCC — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

type AdjacencyList = Record<string, string[]>;

export interface KosarajuSccInput {
  adjacencyList: AdjacencyList;
  nodeIds: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const KOSARAJU_SCC_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.KOSARAJU_SCC!);

export function generateKosarajuSccSteps(input: KosarajuSccInput): ExecutionStep[] {
  const { adjacencyList, nodeIds, nodes, edges } = input;
  const tracker = new GraphTracker(nodes, edges, KOSARAJU_SCC_LINE_MAP);

  const visitedSet = new Set<string>();
  const finishOrder: string[] = [];

  tracker.initialize({
    adjacencyList,
    nodeIds,
    phase: "first-pass",
    visitedSet: [...visitedSet],
    finishOrder: [...finishOrder],
  });

  // First pass: DFS on original graph
  function dfsFirstPass(nodeId: string): void {
    visitedSet.add(nodeId);

    tracker.visitNode(nodeId, {
      nodeId,
      phase: "first-pass",
      visitedSet: [...visitedSet],
    });

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        tracker.visitEdge(nodeId, neighborId, {
          sourceId: nodeId,
          neighborId,
          phase: "first-pass",
        });
        dfsFirstPass(neighborId);
      }
    }

    finishOrder.push(nodeId);
    tracker.pushToStack(nodeId, {
      nodeId,
      finishOrder: [...finishOrder],
    });
  }

  for (const nodeId of nodeIds) {
    if (!visitedSet.has(nodeId)) {
      dfsFirstPass(nodeId);
    }
  }

  // Build transposed adjacency list
  const transposedList: AdjacencyList = {};
  for (const nodeId of nodeIds) {
    transposedList[nodeId] = [];
  }
  for (const sourceId of nodeIds) {
    const neighbors = adjacencyList[sourceId] ?? [];
    for (const targetId of neighbors) {
      (transposedList[targetId] ??= []).push(sourceId);
    }
  }

  // Second pass: DFS on transposed graph in reverse finish order
  visitedSet.clear();
  let componentIndex = 0;

  function dfsSecondPass(nodeId: string, componentNodes: string[]): void {
    visitedSet.add(nodeId);
    componentNodes.push(nodeId);

    tracker.visitNode(nodeId, {
      nodeId,
      phase: "second-pass",
      componentIndex,
      visitedSet: [...visitedSet],
    });

    const neighbors = transposedList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        tracker.visitEdge(nodeId, neighborId, {
          sourceId: nodeId,
          neighborId,
          phase: "second-pass",
        });
        dfsSecondPass(neighborId, componentNodes);
      }
    }
  }

  for (let index = finishOrder.length - 1; index >= 0; index--) {
    const nodeId = finishOrder[index]!;
    if (!visitedSet.has(nodeId)) {
      tracker.popFromStack(nodeId, {
        nodeId,
        finishOrder: [...finishOrder],
        componentIndex,
      });

      const componentNodes: string[] = [];
      dfsSecondPass(nodeId, componentNodes);

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

  tracker.complete({
    componentCount: componentIndex,
  });

  return tracker.getSteps();
}
