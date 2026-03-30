// Kosaraju's SCC — two-pass DFS: first pass collects finish order, second pass on transposed graph
export function kosarajuSCC(
  adjacencyList: Record<string, string[]>,
  nodeIds: string[],
): string[][] {
  const visitedSet = new Set<string>(); // @step:initialize
  const finishOrder: string[] = []; // @step:initialize

  // First pass: DFS on original graph to collect finish order
  function dfsFirstPass(nodeId: string): void {
    visitedSet.add(nodeId); // @step:visit
    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        dfsFirstPass(neighborId); // @step:visit-edge
      }
    }
    finishOrder.push(nodeId); // @step:push-stack
  }

  for (const nodeId of nodeIds) {
    if (!visitedSet.has(nodeId)) {
      dfsFirstPass(nodeId); // @step:initialize
    }
  }

  // Build transposed adjacency list
  const transposedList: Record<string, string[]> = {}; // @step:initialize
  for (const nodeId of nodeIds) {
    transposedList[nodeId] = [];
  }
  for (const sourceId of nodeIds) {
    const neighbors = adjacencyList[sourceId] ?? [];
    for (const targetId of neighbors) {
      (transposedList[targetId] ??= []).push(sourceId); // @step:initialize
    }
  }

  // Second pass: DFS on transposed graph in reverse finish order
  visitedSet.clear(); // @step:initialize
  const components: string[][] = []; // @step:initialize

  function dfsSecondPass(nodeId: string, currentComponent: string[]): void {
    visitedSet.add(nodeId); // @step:visit
    currentComponent.push(nodeId); // @step:visit
    const neighbors = transposedList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (!visitedSet.has(neighborId)) {
        dfsSecondPass(neighborId, currentComponent); // @step:visit-edge
      }
    }
  }

  for (let index = finishOrder.length - 1; index >= 0; index--) {
    const nodeId = finishOrder[index]!;
    if (!visitedSet.has(nodeId)) {
      const currentComponent: string[] = []; // @step:pop-stack
      dfsSecondPass(nodeId, currentComponent); // @step:pop-stack
      components.push(currentComponent); // @step:assign-component
    }
  }

  return components; // @step:complete
}
