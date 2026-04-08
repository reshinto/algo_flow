// Articulation Points — finds all cut vertices in an undirected graph using DFS with low-link values
function findArticulationPoints(
  adjacencyList: Record<string, string[]>,
  nodeIds: string[],
): string[] {
  const discoveryTime: Record<string, number> = {}; // @step:initialize
  const lowLink: Record<string, number> = {}; // @step:initialize
  const articulationPoints = new Set<string>(); // @step:initialize
  let timer = 0; // @step:initialize

  function dfs(nodeId: string, parentId: string | null): void {
    discoveryTime[nodeId] = timer; // @step:visit
    lowLink[nodeId] = timer; // @step:visit
    timer++; // @step:visit
    let childCount = 0; // @step:visit

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (discoveryTime[neighborId] === undefined) {
        childCount++; // @step:visit-edge
        dfs(neighborId, nodeId); // @step:visit-edge
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, lowLink[neighborId]!); // @step:visit-edge

        // Root with multiple children is an articulation point
        if (parentId === null && childCount > 1) {
          articulationPoints.add(nodeId); // @step:mark-articulation
        }
        // Non-root: articulation point if no back edge from subtree
        if (parentId !== null && lowLink[neighborId]! >= discoveryTime[nodeId]!) {
          articulationPoints.add(nodeId); // @step:mark-articulation
        }
      } else if (neighborId !== parentId) {
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, discoveryTime[neighborId]!); // @step:visit-edge
      }
    }
  }

  for (const nodeId of nodeIds) {
    if (discoveryTime[nodeId] === undefined) {
      dfs(nodeId, null); // @step:initialize
    }
  }

  return [...articulationPoints]; // @step:complete
}
