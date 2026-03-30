// DFS Topological Sort — post-order DFS, prepend finished nodes to result
function dfsTopologicalSort(adjacencyList: Record<string, string[]>, nodeIds: string[]): string[] {
  const visitedSet = new Set<string>(); // @step:initialize
  const topologicalOrder: string[] = []; // @step:initialize

  function dfsVisit(currentNodeId: string): void {
    visitedSet.add(currentNodeId); // @step:visit
    const neighbors = adjacencyList[currentNodeId] ?? []; // @step:visit
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        // @step:push-stack
        dfsVisit(neighborId); // @step:push-stack
      }
    }
    topologicalOrder.unshift(currentNodeId); // @step:add-to-order
  }

  for (const nodeId of nodeIds) {
    if (!visitedSet.has(nodeId)) {
      // @step:push-stack
      dfsVisit(nodeId); // @step:push-stack
    }
  }

  return topologicalOrder; // @step:complete
}
