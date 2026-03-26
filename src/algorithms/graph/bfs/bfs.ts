/** Pure BFS implementation - no visualization logic */
export interface AdjacencyList {
  [nodeId: string]: string[];
}

export function breadthFirstSearch(adjacencyList: AdjacencyList, startNodeId: string): string[] {
  const visitOrder: string[] = [];
  const visitedSet = new Set<string>();
  const nodeQueue: string[] = [startNodeId];
  visitedSet.add(startNodeId);

  while (nodeQueue.length > 0) {
    const currentNodeId = nodeQueue.shift()!;
    visitOrder.push(currentNodeId);

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        visitedSet.add(neighborId);
        nodeQueue.push(neighborId);
      }
    }
  }

  return visitOrder;
}
