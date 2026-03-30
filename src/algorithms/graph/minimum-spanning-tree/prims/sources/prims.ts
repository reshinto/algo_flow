// Prim's Algorithm — grow MST from start node by always selecting the cheapest outgoing edge

type AdjacencyEntry = [string, number];

function primsAlgorithm(
  adjacencyList: Record<string, AdjacencyEntry[]>,
  startNodeId: string,
): { source: string; target: string; weight: number }[] {
  const mstEdges: { source: string; target: string; weight: number }[] = []; // @step:initialize
  const inMstSet = new Set<string>(); // @step:initialize
  inMstSet.add(startNodeId); // @step:initialize

  // Priority queue entries: [weight, sourceNodeId, targetNodeId]
  type PQEntry = [number, string, string];
  const priorityQueue: PQEntry[] = []; // @step:initialize

  for (const [neighborId, edgeWeight] of adjacencyList[startNodeId] ?? []) {
    priorityQueue.push([edgeWeight, startNodeId, neighborId]); // @step:initialize
  }
  priorityQueue.sort((entryA, entryB) => entryA[0] - entryB[0]); // @step:initialize

  while (priorityQueue.length > 0) {
    const [edgeWeight, sourceId, targetId] = priorityQueue.shift()!; // @step:dequeue

    if (inMstSet.has(targetId)) {
      continue; // @step:dequeue
    }

    inMstSet.add(targetId); // @step:visit
    mstEdges.push({ source: sourceId, target: targetId, weight: edgeWeight }); // @step:add-to-mst

    for (const [neighborId, neighborWeight] of adjacencyList[targetId] ?? []) {
      if (!inMstSet.has(neighborId)) {
        priorityQueue.push([neighborWeight, targetId, neighborId]); // @step:relax-edge
        priorityQueue.sort((entryA, entryB) => entryA[0] - entryB[0]); // @step:relax-edge
      }
    }
  }

  return mstEdges; // @step:complete
}
