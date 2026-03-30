// Union-Find Cycle Detection — detect cycles by checking if two endpoints share a component
function unionFindCycle(edges: { source: string; target: string }[], nodeIds: string[]): boolean {
  const parent: Record<string, string> = {}; // @step:initialize
  const rank: Record<string, number> = {}; // @step:initialize
  for (const nodeId of nodeIds) {
    // @step:initialize
    parent[nodeId] = nodeId; // @step:initialize
    rank[nodeId] = 0; // @step:initialize
  }

  function findRoot(nodeId: string): string {
    if (parent[nodeId] !== nodeId) {
      parent[nodeId] = findRoot(parent[nodeId]!);
    }
    return parent[nodeId]!;
  }

  function unionComponents(nodeA: string, nodeB: string): void {
    const rootA = findRoot(nodeA);
    const rootB = findRoot(nodeB);
    if ((rank[rootA] ?? 0) < (rank[rootB] ?? 0)) {
      parent[rootA] = rootB;
    } else if ((rank[rootA] ?? 0) > (rank[rootB] ?? 0)) {
      parent[rootB] = rootA;
    } else {
      parent[rootB] = rootA;
      rank[rootA] = (rank[rootA] ?? 0) + 1;
    }
  }

  for (const edge of edges) {
    const sourceRoot = findRoot(edge.source); // @step:visit-edge
    const targetRoot = findRoot(edge.target); // @step:visit-edge

    if (sourceRoot === targetRoot) {
      // @step:visit-edge
      return true; // @step:complete
    }

    unionComponents(edge.source, edge.target); // @step:merge-components
  }

  return false; // @step:complete
}
