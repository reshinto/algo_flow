// Borůvka's Algorithm — each component finds its cheapest outgoing edge each round

interface WeightedEdge {
  source: string;
  target: string;
  weight: number;
}

function boruvkasAlgorithm(edges: WeightedEdge[], nodeIds: string[]): WeightedEdge[] {
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

  function union(nodeA: string, nodeB: string): void {
    // @step:initialize
    const rootA = find(nodeA); // @step:initialize
    const rootB = find(nodeB); // @step:initialize
    if (rootA === rootB) return; // @step:initialize
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
  }

  let componentCount = nodeIds.length;

  while (componentCount > 1) {
    const cheapestEdge: Record<string, WeightedEdge | null> = {}; // @step:visit-edge

    for (const edge of edges) {
      const sourceRoot = find(edge.source); // @step:visit-edge
      const targetRoot = find(edge.target); // @step:visit-edge

      if (sourceRoot === targetRoot) continue; // @step:visit-edge

      const existingCheapestForSource = cheapestEdge[sourceRoot]; // @step:visit-edge
      if (!existingCheapestForSource || edge.weight < existingCheapestForSource.weight) {
        // @step:visit-edge
        cheapestEdge[sourceRoot] = edge; // @step:visit-edge
      }
      const existingCheapestForTarget = cheapestEdge[targetRoot]; // @step:visit-edge
      if (!existingCheapestForTarget || edge.weight < existingCheapestForTarget.weight) {
        // @step:visit-edge
        cheapestEdge[targetRoot] = edge; // @step:visit-edge
      }
    }

    for (const cheapest of Object.values(cheapestEdge)) {
      if (!cheapest) continue;
      const sourceRoot = find(cheapest.source); // @step:add-to-mst
      const targetRoot = find(cheapest.target); // @step:add-to-mst
      if (sourceRoot === targetRoot) continue; // @step:add-to-mst
      union(cheapest.source, cheapest.target); // @step:merge-components
      mstEdges.push(cheapest); // @step:add-to-mst
      componentCount--; // @step:merge-components
    }
  }

  return mstEdges; // @step:complete
}
