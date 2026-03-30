// Edmonds-Karp — max flow via BFS shortest augmenting paths (guaranteed O(VE^2))
function edmondsKarp(
  adjacencyList: Record<string, { target: string; capacity: number }[]>,
  sourceNodeId: string,
  sinkNodeId: string,
): number {
  const residualCapacity: Record<string, Record<string, number>> = {}; // @step:initialize
  for (const [nodeId, edges] of Object.entries(adjacencyList)) {
    residualCapacity[nodeId] ??= {}; // @step:initialize
    for (const { target, capacity } of edges) {
      const prev = residualCapacity[nodeId]![target] ?? 0; // @step:initialize
      residualCapacity[nodeId]![target] = prev + capacity; // @step:initialize
      residualCapacity[target] ??= {}; // @step:initialize
    }
  }

  let maxFlow = 0; // @step:initialize

  // BFS to find shortest augmenting path; returns parent map or null if no path
  function bfsFindPath(): Record<string, string> | null {
    const parentMap: Record<string, string> = {}; // @step:enqueue
    const visitedSet = new Set<string>([sourceNodeId]); // @step:enqueue
    const nodeQueue: string[] = [sourceNodeId]; // @step:enqueue

    while (nodeQueue.length > 0) {
      const currentId = nodeQueue.shift()!; // @step:dequeue
      const neighbors = Object.keys(residualCapacity[currentId] ?? {}); // @step:visit-node
      for (const neighborId of neighbors) {
        const residual = residualCapacity[currentId]?.[neighborId] ?? 0; // @step:visit-node
        if (!visitedSet.has(neighborId) && residual > 0) {
          visitedSet.add(neighborId); // @step:enqueue
          parentMap[neighborId] = currentId; // @step:enqueue
          nodeQueue.push(neighborId); // @step:enqueue
          if (neighborId === sinkNodeId) return parentMap; // @step:enqueue
        }
      }
    }
    return null; // @step:dequeue
  }

  let parentMap = bfsFindPath(); // @step:augment-flow
  while (parentMap !== null) {
    // Find bottleneck capacity along the path
    let bottleneck = Infinity; // @step:augment-flow
    let currentId = sinkNodeId; // @step:augment-flow
    while (currentId !== sourceNodeId) {
      const parentId = parentMap[currentId]!; // @step:augment-flow
      const residual = residualCapacity[parentId]?.[currentId] ?? 0; // @step:augment-flow
      bottleneck = Math.min(bottleneck, residual); // @step:augment-flow
      currentId = parentId; // @step:augment-flow
    }

    // Update residual capacities along the path
    currentId = sinkNodeId; // @step:augment-flow
    while (currentId !== sourceNodeId) {
      const parentId = parentMap[currentId]!; // @step:augment-flow
      const fwd = residualCapacity[parentId]?.[currentId] ?? 0; // @step:augment-flow
      residualCapacity[parentId]![currentId] = fwd - bottleneck; // @step:augment-flow
      residualCapacity[currentId] ??= {}; // @step:augment-flow
      const back = residualCapacity[currentId]?.[parentId] ?? 0; // @step:augment-flow
      residualCapacity[currentId]![parentId] = back + bottleneck; // @step:augment-flow
      currentId = parentId; // @step:augment-flow
    }

    maxFlow += bottleneck; // @step:augment-flow
    parentMap = bfsFindPath(); // @step:augment-flow
  }

  return maxFlow; // @step:complete
}
