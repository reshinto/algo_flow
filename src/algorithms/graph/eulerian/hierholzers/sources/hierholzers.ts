// Hierholzer's Algorithm — find an Eulerian circuit using subcircuit splicing
function hierholzersAlgorithm(
  adjacencyList: Record<string, string[]>,
  startNodeId: string,
): string[] {
  // Build a mutable copy of the adjacency list so edges can be removed as used
  const remainingEdges: Record<string, string[]> = {}; // @step:initialize
  for (const nodeId of Object.keys(adjacencyList)) {
    remainingEdges[nodeId] = [...(adjacencyList[nodeId] ?? [])]; // @step:initialize
  }

  const circuit: string[] = []; // @step:initialize
  const nodeStack: string[] = [startNodeId]; // @step:initialize,push-stack

  while (nodeStack.length > 0) {
    const currentNodeId = nodeStack[nodeStack.length - 1]!; // @step:pop-stack
    const currentNeighbors = remainingEdges[currentNodeId] ?? [];

    if (currentNeighbors.length > 0) {
      const nextNodeId = currentNeighbors.shift()!; // @step:use-edge
      // For undirected graphs, remove the reverse edge as well
      const reverseNeighbors = remainingEdges[nextNodeId] ?? [];
      const reverseIndex = reverseNeighbors.indexOf(currentNodeId);
      if (reverseIndex !== -1) {
        reverseNeighbors.splice(reverseIndex, 1); // @step:use-edge
      }
      nodeStack.push(nextNodeId); // @step:push-stack
    } else {
      // No unused edges from currentNodeId — add it to the circuit
      nodeStack.pop(); // @step:pop-stack
      circuit.unshift(currentNodeId); // @step:visit
    }
  }

  return circuit; // @step:complete
}
