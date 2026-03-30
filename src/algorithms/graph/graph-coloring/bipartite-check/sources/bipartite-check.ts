// Bipartite Check — 2-coloring via BFS; conflict means not bipartite
function bipartiteCheck(
  adjacencyList: Record<string, string[]>,
  nodeIds: string[],
): { isBipartite: boolean; coloring: Record<string, number> } {
  const coloring: Record<string, number> = {}; // @step:initialize

  for (const startNodeId of nodeIds) {
    if (coloring[startNodeId] !== undefined) continue; // @step:initialize

    coloring[startNodeId] = 0; // @step:enqueue
    const nodeQueue: string[] = [startNodeId]; // @step:enqueue

    while (nodeQueue.length > 0) {
      const currentId = nodeQueue.shift()!; // @step:dequeue
      const currentColor = coloring[currentId]!; // @step:visit-node
      const neighbors = adjacencyList[currentId] ?? []; // @step:visit-node

      for (const neighborId of neighbors) {
        if (coloring[neighborId] === undefined) {
          coloring[neighborId] = 1 - currentColor; // @step:assign-color
          nodeQueue.push(neighborId); // @step:assign-color
        } else if (coloring[neighborId] === currentColor) {
          return { isBipartite: false, coloring }; // @step:check-conflict
        }
      }
    }
  }

  return { isBipartite: true, coloring }; // @step:complete
}
