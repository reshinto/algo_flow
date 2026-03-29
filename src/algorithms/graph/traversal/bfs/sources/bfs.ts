// BFS — traverse level-by-level using a FIFO queue
function breadthFirstSearch(
  adjacencyList: Record<string, string[]>,
  startNodeId: string,
): string[] {
  const visitOrder: string[] = []; // @step:initialize
  const visitedSet = new Set<string>(); // @step:initialize
  const nodeQueue: string[] = [startNodeId]; // @step:initialize
  visitedSet.add(startNodeId); // @step:initialize

  while (nodeQueue.length > 0) {
    const currentNodeId = nodeQueue.shift()!; // @step:dequeue
    visitOrder.push(currentNodeId); // @step:dequeue,visit
    const neighbors = adjacencyList[currentNodeId] ?? [];
    // Mark as visited when enqueuing to avoid duplicate queue entries
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        // @step:visit-edge
        visitedSet.add(neighborId); // @step:visit-edge
        nodeQueue.push(neighborId); // @step:visit-edge,enqueue
      }
    }
  }
  return visitOrder; // @step:complete
}
