// DFS — traverse depth-first using a LIFO stack
function depthFirstSearch(adjacencyList: Record<string, string[]>, startNodeId: string): string[] {
  const visitOrder: string[] = []; // @step:initialize
  const visitedSet = new Set<string>(); // @step:initialize
  const nodeStack: string[] = [startNodeId]; // @step:initialize,push-stack

  while (nodeStack.length > 0) {
    const currentNodeId = nodeStack.pop()!; // @step:pop-stack
    if (visitedSet.has(currentNodeId)) {
      continue; // @step:pop-stack
    }
    visitedSet.add(currentNodeId); // @step:visit
    visitOrder.push(currentNodeId); // @step:visit

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        // @step:visit-edge
        nodeStack.push(neighborId); // @step:visit-edge,push-stack
      }
    }
  }
  return visitOrder; // @step:complete
}
