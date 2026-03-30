/** Step generator for Prim's algorithm — produces ExecutionStep[] using GraphTracker. */

import type { ExecutionStep, GraphNode, GraphEdge } from "@/types";
import { GraphTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

export interface PrimsInput {
  adjacencyList: Record<string, [string, number][]>;
  startNodeId: string;
  nodes: GraphNode[];
  graphEdges: GraphEdge[];
}

const PRIMS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PRIMS!);

/** Priority queue entry for Prim's: [weight, sourceId, targetId] */
type PQEntry = [number, string, string];

export function generatePrimsSteps(input: PrimsInput): ExecutionStep[] {
  const { adjacencyList, startNodeId, nodes, graphEdges } = input;
  const tracker = new GraphTracker(nodes, graphEdges, PRIMS_LINE_MAP, { undirected: true });

  const inMstSet = new Set<string>();
  inMstSet.add(startNodeId);
  const mstEdges: { source: string; target: string; weight: number }[] = [];

  const priorityQueue: PQEntry[] = [];

  for (const [neighborId, edgeWeight] of adjacencyList[startNodeId] ?? []) {
    priorityQueue.push([edgeWeight, startNodeId, neighborId]);
  }
  priorityQueue.sort((entryA, entryB) => entryA[0] - entryB[0]);

  tracker.initialize({
    startNodeId,
    inMstSet: [...inMstSet],
    queueSize: priorityQueue.length,
  });

  tracker.visitNode(startNodeId, {
    startNodeId,
    inMstSet: [...inMstSet],
  });

  while (priorityQueue.length > 0) {
    const [edgeWeight, sourceId, targetId] = priorityQueue.shift()!;

    tracker.dequeue(targetId, {
      edge: { source: sourceId, target: targetId, weight: edgeWeight },
      inMstSet: [...inMstSet],
      queueSize: priorityQueue.length,
    });

    if (inMstSet.has(targetId)) {
      continue;
    }

    inMstSet.add(targetId);
    mstEdges.push({ source: sourceId, target: targetId, weight: edgeWeight });

    tracker.visitNode(targetId, {
      targetId,
      inMstSet: [...inMstSet],
    });

    tracker.addToMST(sourceId, targetId, {
      edge: { source: sourceId, target: targetId, weight: edgeWeight },
      mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
      mstWeight: mstEdges.reduce((total, mstEdge) => total + mstEdge.weight, 0),
    });

    for (const [neighborId, neighborWeight] of adjacencyList[targetId] ?? []) {
      if (!inMstSet.has(neighborId)) {
        priorityQueue.push([neighborWeight, targetId, neighborId]);
        priorityQueue.sort((entryA, entryB) => entryA[0] - entryB[0]);

        tracker.relaxEdge(targetId, neighborId, {
          edge: { source: targetId, target: neighborId, weight: neighborWeight },
          inMstSet: [...inMstSet],
          queueSize: priorityQueue.length,
        });
      }
    }
  }

  const totalWeight = mstEdges.reduce((total, mstEdge) => total + mstEdge.weight, 0);
  tracker.complete({
    mstEdges: mstEdges.map((mstEdge) => `${mstEdge.source}-${mstEdge.target}`),
    totalWeight,
  });

  return tracker.getSteps();
}
