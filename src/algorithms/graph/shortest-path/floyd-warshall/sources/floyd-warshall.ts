// Floyd-Warshall — computes all-pairs shortest paths via dynamic programming
type WeightedAdjacencyList = Record<string, [string, number][]>;

function floydWarshall(
  adjacencyList: WeightedAdjacencyList,
  nodeIds: string[],
): Record<string, Record<string, number>> {
  // Initialize distance matrix
  const distances: Record<string, Record<string, number>> = {}; // @step:initialize

  for (const sourceId of nodeIds) {
    distances[sourceId] = {};
    for (const targetId of nodeIds) {
      if (sourceId === targetId) {
        distances[sourceId][targetId] = 0; // @step:initialize
      } else {
        distances[sourceId][targetId] = Infinity; // @step:initialize
      }
    }
  }

  // Set direct edge weights
  for (const sourceId of nodeIds) {
    const neighbors = adjacencyList[sourceId] ?? [];
    for (const [targetId, edgeWeight] of neighbors) {
      distances[sourceId]![targetId] = edgeWeight; // @step:initialize
    }
  }

  // Triple nested loop: try every intermediate node k
  for (const intermediateId of nodeIds) {
    for (const sourceId of nodeIds) {
      for (const targetId of nodeIds) {
        const throughIntermediate =
          (distances[sourceId]![intermediateId] ?? Infinity) +
          (distances[intermediateId]![targetId] ?? Infinity); // @step:relax-edge
        if (throughIntermediate < (distances[sourceId]![targetId] ?? Infinity)) {
          distances[sourceId]![targetId] = throughIntermediate; // @step:update-distance
        }
      }
    }
  }

  return distances; // @step:complete
}
