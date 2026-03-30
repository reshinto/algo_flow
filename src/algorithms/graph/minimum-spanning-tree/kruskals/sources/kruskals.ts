// Kruskal's Algorithm — build MST by sorting edges and merging components with Union-Find

interface WeightedEdge {
  source: string;
  target: string;
  weight: number;
}

function kruskalsAlgorithm(edges: WeightedEdge[], nodeIds: string[]): WeightedEdge[] {
  const mstEdges: WeightedEdge[] = []; // @step:initialize
  const parent: Record<string, string> = {}; // @step:initialize
  const rank: Record<string, number> = {}; // @step:initialize

  for (const nodeId of nodeIds) {
    // @step:initialize
    parent[nodeId] = nodeId; // @step:initialize
    rank[nodeId] = 0; // @step:initialize
  }

  function find(nodeId: string): string {
    // @step:initialize
    if (parent[nodeId] !== nodeId) {
      // @step:initialize
      parent[nodeId] = find(parent[nodeId]!); // @step:initialize
    }
    return parent[nodeId]!; // @step:initialize
  }

  function union(nodeA: string, nodeB: string): boolean {
    // @step:initialize
    const rootA = find(nodeA); // @step:initialize
    const rootB = find(nodeB); // @step:initialize
    if (rootA === rootB) return false; // @step:initialize
    if ((rank[rootA] ?? 0) < (rank[rootB] ?? 0)) {
      // @step:initialize
      parent[rootA] = rootB; // @step:initialize
    } else if ((rank[rootA] ?? 0) > (rank[rootB] ?? 0)) {
      // @step:initialize
      parent[rootB] = rootA; // @step:initialize
    } else {
      // @step:initialize
      parent[rootB] = rootA; // @step:initialize
      rank[rootA] = (rank[rootA] ?? 0) + 1; // @step:initialize
    }
    return true; // @step:initialize
  }

  const sortedEdges = [...edges].sort((edgeA, edgeB) => edgeA.weight - edgeB.weight); // @step:sort-edges

  for (const edge of sortedEdges) {
    const sourceRoot = find(edge.source); // @step:visit-edge
    const targetRoot = find(edge.target); // @step:visit-edge

    if (sourceRoot !== targetRoot) {
      // @step:visit-edge
      union(edge.source, edge.target); // @step:add-to-mst
      mstEdges.push(edge); // @step:add-to-mst
    } else {
      // Edge would create a cycle — reject it
      void edge; // @step:reject-edge
    }

    if (mstEdges.length === nodeIds.length - 1) break; // @step:add-to-mst
  }

  return mstEdges; // @step:complete
}
