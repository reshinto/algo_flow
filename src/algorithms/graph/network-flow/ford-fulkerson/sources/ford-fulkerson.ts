// Ford-Fulkerson — max flow via DFS augmenting paths in a residual graph
function fordFulkerson(
  adjacencyList: Record<string, { target: string; capacity: number }[]>,
  sourceNodeId: string,
  sinkNodeId: string,
): number {
  if (sourceNodeId === sinkNodeId) return 0; // @step:initialize

  const residualCapacity: Record<string, Record<string, number>> = {}; // @step:initialize
  for (const nodeId of Object.keys(adjacencyList)) {
    residualCapacity[nodeId] = {}; // @step:initialize
  }
  for (const [nodeId, edges] of Object.entries(adjacencyList)) {
    for (const { target, capacity } of edges) {
      residualCapacity[target] ??= {}; // @step:initialize
      const prev = residualCapacity[nodeId]![target] ?? 0; // @step:initialize
      residualCapacity[nodeId]![target] = prev + capacity; // @step:initialize
    }
  }

  let maxFlow = 0; // @step:initialize

  function dfsAugment(currentId: string, visitedSet: Set<string>, bottleneck: number): number {
    if (currentId === sinkNodeId) return bottleneck; // @step:dfs-augment
    visitedSet.add(currentId); // @step:dfs-augment
    const neighbors = Object.keys(residualCapacity[currentId] ?? {}); // @step:visit-edge
    for (const neighborId of neighbors) {
      const residual = residualCapacity[currentId]?.[neighborId] ?? 0; // @step:visit-edge
      if (!visitedSet.has(neighborId) && residual > 0) {
        const flow = dfsAugment(neighborId, visitedSet, Math.min(bottleneck, residual)); // @step:augment-flow
        if (flow > 0) {
          residualCapacity[currentId]![neighborId] = residual - flow; // @step:augment-flow
          residualCapacity[neighborId] ??= {}; // @step:augment-flow
          const back = residualCapacity[neighborId]![currentId] ?? 0; // @step:augment-flow
          residualCapacity[neighborId]![currentId] = back + flow; // @step:augment-flow
          return flow; // @step:augment-flow
        }
      }
    }
    return 0; // @step:dfs-augment
  }

  while (true) {
    const visitedSet = new Set<string>(); // @step:augment-flow
    const pathFlow = dfsAugment(sourceNodeId, visitedSet, Infinity); // @step:augment-flow
    if (pathFlow === 0) break; // @step:augment-flow
    maxFlow += pathFlow; // @step:augment-flow
  }

  return maxFlow; // @step:complete
}
