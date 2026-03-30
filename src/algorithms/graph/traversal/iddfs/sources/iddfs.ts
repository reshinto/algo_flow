// IDDFS — iterative deepening depth-first search using increasing depth limits
function iterativeDeepeningDFS(
  adjacencyList: Record<string, string[]>,
  startNodeId: string,
  maxDepth?: number,
): string[] {
  const visitOrder: string[] = []; // @step:initialize
  const resolvedMaxDepth = maxDepth ?? Object.keys(adjacencyList).length; // @step:initialize

  for (let depthLimit = 0; depthLimit <= resolvedMaxDepth; depthLimit++) {
    // @step:initialize
    visitOrder.length = 0; // @step:initialize
    const visitedSet = new Set<string>(); // @step:initialize

    const nodeStack: Array<{ nodeId: string; depth: number }> = [{ nodeId: startNodeId, depth: 0 }]; // @step:push-stack

    while (nodeStack.length > 0) {
      const frame = nodeStack.pop()!; // @step:pop-stack
      const currentNodeId = frame.nodeId; // @step:pop-stack
      const currentDepth = frame.depth; // @step:pop-stack

      if (visitedSet.has(currentNodeId)) {
        // @step:backtrack
        continue; // @step:backtrack
      }

      visitedSet.add(currentNodeId); // @step:visit
      visitOrder.push(currentNodeId); // @step:visit

      if (currentDepth >= depthLimit) {
        // @step:visit
        continue; // @step:visit
      }

      const neighbors = adjacencyList[currentNodeId] ?? []; // @step:visit-edge
      for (let neighborIndex = neighbors.length - 1; neighborIndex >= 0; neighborIndex--) {
        // @step:visit-edge
        const neighborId = neighbors[neighborIndex]!; // @step:visit-edge
        if (!visitedSet.has(neighborId)) {
          // @step:visit-edge
          nodeStack.push({ nodeId: neighborId, depth: currentDepth + 1 }); // @step:push-stack
        }
      }
    }

    const allVisited = Object.keys(adjacencyList).every((nodeId) => visitedSet.has(nodeId)); // @step:complete
    if (allVisited) break; // @step:complete
  }

  return visitOrder; // @step:complete
}
