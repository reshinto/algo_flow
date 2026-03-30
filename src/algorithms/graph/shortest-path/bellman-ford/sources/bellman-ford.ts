// Bellman-Ford — finds shortest paths tolerating negative edge weights; detects negative cycles
type WeightedAdjacencyList = Record<string, [string, number][]>;

function bellmanFord(
  adjacencyList: WeightedAdjacencyList,
  startNodeId: string,
  nodeIds: string[],
): Record<string, number> {
  const distances: Record<string, number> = {}; // @step:initialize

  for (const nodeId of nodeIds) {
    distances[nodeId] = Infinity; // @step:initialize
  }
  distances[startNodeId] = 0; // @step:initialize

  const vertexCount = nodeIds.length;

  // Relax all edges (V - 1) times
  for (let passIndex = 0; passIndex < vertexCount - 1; passIndex++) {
    for (const sourceId of nodeIds) {
      const neighbors = adjacencyList[sourceId] ?? [];
      for (const [targetId, edgeWeight] of neighbors) {
        const sourceDist = distances[sourceId] ?? Infinity;
        if (sourceDist === Infinity) continue; // @step:visit-edge
        const tentativeDistance = sourceDist + edgeWeight; // @step:relax-edge
        if (tentativeDistance < (distances[targetId] ?? Infinity)) {
          distances[targetId] = tentativeDistance; // @step:update-distance
        }
      }
    }
  }

  // Detect negative cycles — one more pass; any improvement means a negative cycle
  for (const sourceId of nodeIds) {
    const neighbors = adjacencyList[sourceId] ?? [];
    for (const [targetId, edgeWeight] of neighbors) {
      const sourceDist = distances[sourceId] ?? Infinity;
      if (sourceDist === Infinity) continue;
      if (sourceDist + edgeWeight < (distances[targetId] ?? Infinity)) {
        distances[targetId] = -Infinity; // @step:update-distance
      }
    }
  }

  return distances; // @step:complete
}
