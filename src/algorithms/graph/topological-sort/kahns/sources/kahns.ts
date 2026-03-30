// Kahn's Algorithm — topological sort using BFS and in-degree tracking
function kahnsTopologicalSort(
  adjacencyList: Record<string, string[]>,
  nodeIds: string[],
): string[] {
  const inDegreeMap: Record<string, number> = {}; // @step:initialize
  for (const nodeId of nodeIds) {
    inDegreeMap[nodeId] = 0;
  } // @step:initialize
  for (const nodeId of nodeIds) {
    const neighbors = adjacencyList[nodeId] ?? []; // @step:initialize
    for (const neighborId of neighbors) {
      inDegreeMap[neighborId] = (inDegreeMap[neighborId] ?? 0) + 1;
    } // @step:initialize
  }

  const nodeQueue: string[] = []; // @step:initialize
  for (const nodeId of nodeIds) {
    if (inDegreeMap[nodeId] === 0) {
      nodeQueue.push(nodeId);
    } // @step:enqueue
  }

  const topologicalOrder: string[] = [];

  while (nodeQueue.length > 0) {
    const currentNodeId = nodeQueue.shift()!; // @step:dequeue
    topologicalOrder.push(currentNodeId); // @step:add-to-order

    const neighbors = adjacencyList[currentNodeId] ?? [];
    for (const neighborId of neighbors) {
      inDegreeMap[neighborId] = (inDegreeMap[neighborId] ?? 1) - 1; // @step:visit
      if (inDegreeMap[neighborId] === 0) {
        nodeQueue.push(neighborId);
      } // @step:enqueue
    }
  }

  return topologicalOrder; // @step:complete
}
