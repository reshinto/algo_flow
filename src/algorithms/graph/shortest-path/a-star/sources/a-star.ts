// A* search — finds shortest path using f = g + h (cost-so-far + heuristic estimate)
type WeightedAdjacencyList = Record<string, [string, number][]>;

function aStarSearch(
  adjacencyList: WeightedAdjacencyList,
  startNodeId: string,
  targetNodeId: string,
  heuristic: Record<string, number>,
): string[] | null {
  const gCosts: Record<string, number> = {}; // @step:initialize
  const predecessors: Record<string, string | null> = {}; // @step:initialize
  const visited = new Set<string>(); // @step:initialize

  for (const nodeId of Object.keys(adjacencyList)) {
    gCosts[nodeId] = Infinity; // @step:initialize
    predecessors[nodeId] = null; // @step:initialize
  }
  gCosts[startNodeId] = 0; // @step:initialize

  // Open set as priority queue: [fCost, nodeId]
  const openQueue: [number, string][] = [[heuristic[startNodeId] ?? 0, startNodeId]]; // @step:initialize

  while (openQueue.length > 0) {
    openQueue.sort((pairA, pairB) => pairA[0] - pairB[0]);
    const [, currentNodeId] = openQueue.shift()!; // @step:dequeue

    if (visited.has(currentNodeId)) continue; // @step:dequeue
    visited.add(currentNodeId); // @step:visit

    if (currentNodeId === targetNodeId) {
      // Reconstruct path
      const path: string[] = [];
      let traceId: string | null = currentNodeId;
      while (traceId !== null) {
        path.unshift(traceId);
        traceId = predecessors[traceId] ?? null;
      }
      return path; // @step:complete
    }

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const [neighborId, edgeWeight] of neighbors) {
      if (visited.has(neighborId)) continue;
      const tentativeGCost = (gCosts[currentNodeId] ?? Infinity) + edgeWeight; // @step:relax-edge
      if (tentativeGCost < (gCosts[neighborId] ?? Infinity)) {
        gCosts[neighborId] = tentativeGCost; // @step:update-distance
        predecessors[neighborId] = currentNodeId; // @step:update-distance
        const fCost = tentativeGCost + (heuristic[neighborId] ?? 0);
        openQueue.push([fCost, neighborId]); // @step:update-distance
      }
    }
  }

  return null; // @step:complete
}
