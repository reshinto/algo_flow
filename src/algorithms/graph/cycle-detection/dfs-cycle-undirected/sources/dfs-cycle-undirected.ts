// DFS Cycle Detection (Undirected) — parent tracking to identify back edges
function dfsCycleUndirected(adjacencyList: Record<string, string[]>, nodeIds: string[]): boolean {
  const visitedSet = new Set<string>(); // @step:initialize

  function dfsVisit(currentNodeId: string, parentNodeId: string | null): boolean {
    visitedSet.add(currentNodeId); // @step:push-stack

    const neighbors = adjacencyList[currentNodeId] ?? []; // @step:visit
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        // @step:classify-edge
        if (dfsVisit(neighborId, currentNodeId)) {
          // @step:classify-edge
          return true; // @step:classify-edge
        }
      } else if (neighborId !== parentNodeId) {
        // @step:classify-edge
        return true; // @step:classify-edge
      }
    }

    return false; // @step:pop-stack
  }

  for (const nodeId of nodeIds) {
    if (!visitedSet.has(nodeId)) {
      // @step:visit
      if (dfsVisit(nodeId, null)) {
        // @step:visit
        return true; // @step:complete
      }
    }
  }

  return false; // @step:complete
}
