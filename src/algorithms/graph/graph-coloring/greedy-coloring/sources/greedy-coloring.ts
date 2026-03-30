// Greedy Graph Coloring — assign smallest available color to each node in order
function greedyColoring(
  adjacencyList: Record<string, string[]>,
  nodeIds: string[],
): Record<string, number> {
  const colorAssignment: Record<string, number> = {}; // @step:initialize

  for (const nodeId of nodeIds) {
    const neighborColors = new Set<number>(); // @step:visit-node
    const neighbors = adjacencyList[nodeId] ?? []; // @step:visit-node
    for (const neighborId of neighbors) {
      if (colorAssignment[neighborId] !== undefined) {
        neighborColors.add(colorAssignment[neighborId]!); // @step:visit-node
      }
    }

    let assignedColor = 0; // @step:assign-color
    while (neighborColors.has(assignedColor)) {
      assignedColor++; // @step:assign-color
    }
    colorAssignment[nodeId] = assignedColor; // @step:assign-color
  }

  return colorAssignment; // @step:complete
}
