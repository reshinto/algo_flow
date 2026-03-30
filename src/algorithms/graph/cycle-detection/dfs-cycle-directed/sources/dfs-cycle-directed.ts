// DFS Cycle Detection (Directed) — three-color marking via DFS
// White = unvisited, Gray = in current stack, Black = fully processed
function dfsCycleDirected(adjacencyList: Record<string, string[]>, nodeIds: string[]): boolean {
  const colorMap: Record<string, "white" | "gray" | "black"> = {}; // @step:initialize
  for (const nodeId of nodeIds) {
    // @step:initialize
    colorMap[nodeId] = "white"; // @step:initialize
  }

  function dfsVisit(currentNodeId: string): boolean {
    colorMap[currentNodeId] = "gray"; // @step:push-stack

    const neighbors = adjacencyList[currentNodeId] ?? []; // @step:visit
    for (const neighborId of neighbors) {
      if (colorMap[neighborId] === "gray") {
        // @step:classify-edge
        return true; // @step:classify-edge
      }
      if (colorMap[neighborId] === "white") {
        // @step:classify-edge
        if (dfsVisit(neighborId)) {
          // @step:classify-edge
          return true; // @step:classify-edge
        }
      }
    }

    colorMap[currentNodeId] = "black"; // @step:process-node
    return false; // @step:process-node
  }

  for (const nodeId of nodeIds) {
    if (colorMap[nodeId] === "white") {
      // @step:visit
      if (dfsVisit(nodeId)) {
        // @step:visit
        return true; // @step:complete
      }
    }
  }

  return false; // @step:complete
}
