// Connected Components — find all connected components in an undirected graph using BFS
function connectedComponents(
  adjacencyList: Record<string, string[]>,
  nodeIds: string[],
): string[][] {
  const components: string[][] = []; // @step:initialize
  const visitedSet = new Set<string>(); // @step:initialize

  for (const startNodeId of nodeIds) {
    if (visitedSet.has(startNodeId)) continue; // @step:initialize

    const currentComponent: string[] = []; // @step:enqueue
    const nodeQueue: string[] = [startNodeId]; // @step:enqueue
    visitedSet.add(startNodeId); // @step:enqueue

    while (nodeQueue.length > 0) {
      const currentNodeId = nodeQueue.shift()!; // @step:dequeue
      currentComponent.push(currentNodeId); // @step:dequeue,visit

      const neighbors = adjacencyList[currentNodeId] ?? [];
      for (const neighborId of neighbors) {
        if (!visitedSet.has(neighborId)) {
          visitedSet.add(neighborId); // @step:visit-edge
          nodeQueue.push(neighborId); // @step:visit-edge,enqueue
        }
      }
    }

    components.push(currentComponent); // @step:assign-component
  }

  return components; // @step:complete
}
