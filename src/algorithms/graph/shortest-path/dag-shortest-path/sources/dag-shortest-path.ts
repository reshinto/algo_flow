// DAG Shortest Path — finds shortest paths from a source in a directed acyclic graph
// using topological sort followed by edge relaxation in topological order
type WeightedAdjacencyList = Record<string, [string, number][]>;

function dagShortestPath(
  adjacencyList: WeightedAdjacencyList,
  startNodeId: string,
  nodeIds: string[],
): Record<string, number> {
  const distances: Record<string, number> = {}; // @step:initialize
  for (const nodeId of nodeIds) {
    distances[nodeId] = Infinity; // @step:initialize
  }
  distances[startNodeId] = 0; // @step:initialize

  // Topological sort via DFS
  const visited = new Set<string>(); // @step:initialize
  const topologicalOrder: string[] = []; // @step:initialize

  function dfsVisit(nodeId: string): void {
    visited.add(nodeId);
    const neighbors = adjacencyList[nodeId] ?? [];
    for (const [neighborId] of neighbors) {
      if (!visited.has(neighborId)) {
        dfsVisit(neighborId);
      }
    }
    topologicalOrder.unshift(nodeId); // @step:add-to-order
  }

  for (const nodeId of nodeIds) {
    if (!visited.has(nodeId)) {
      dfsVisit(nodeId);
    }
  }

  // Relax edges in topological order
  for (const nodeId of topologicalOrder) {
    if (distances[nodeId] === Infinity) continue; // @step:process-node
    const neighbors = adjacencyList[nodeId] ?? [];
    for (const [neighborId, edgeWeight] of neighbors) {
      const tentativeDistance = (distances[nodeId] ?? Infinity) + edgeWeight; // @step:relax-edge
      if (tentativeDistance < (distances[neighborId] ?? Infinity)) {
        distances[neighborId] = tentativeDistance; // @step:update-distance
      }
    }
  }

  return distances; // @step:complete
}
