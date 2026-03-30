// Dijkstra's algorithm — finds shortest paths from a source using a min-priority queue
type WeightedAdjacencyList = Record<string, [string, number][]>;

function dijkstraShortestPath(
  adjacencyList: WeightedAdjacencyList,
  startNodeId: string,
): Record<string, number> {
  const distances: Record<string, number> = {}; // @step:initialize
  const visited = new Set<string>(); // @step:initialize

  // Initialize all distances to Infinity
  for (const nodeId of Object.keys(adjacencyList)) {
    distances[nodeId] = Infinity; // @step:initialize
  }
  distances[startNodeId] = 0; // @step:initialize

  // Min-priority queue: [distance, nodeId]
  const priorityQueue: [number, string][] = [[0, startNodeId]]; // @step:initialize

  while (priorityQueue.length > 0) {
    priorityQueue.sort((pairA, pairB) => pairA[0] - pairB[0]);
    const [currentDist, currentNodeId] = priorityQueue.shift()!; // @step:dequeue

    if (visited.has(currentNodeId)) continue; // @step:dequeue
    visited.add(currentNodeId); // @step:visit

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const [neighborId, edgeWeight] of neighbors) {
      const tentativeDistance = currentDist + edgeWeight; // @step:relax-edge
      if (tentativeDistance < (distances[neighborId] ?? Infinity)) {
        distances[neighborId] = tentativeDistance; // @step:update-distance
        priorityQueue.push([tentativeDistance, neighborId]); // @step:update-distance
      }
    }
  }

  return distances; // @step:complete
}
