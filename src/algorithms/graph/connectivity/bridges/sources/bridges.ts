// Bridges (Cut Edges) — finds all bridge edges in an undirected graph using DFS with low-link values
export function findBridges(
  adjacencyList: Record<string, string[]>,
  nodeIds: string[],
): [string, string][] {
  const discoveryTime: Record<string, number> = {}; // @step:initialize
  const lowLink: Record<string, number> = {}; // @step:initialize
  const bridges: [string, string][] = []; // @step:initialize
  let timer = 0; // @step:initialize

  function dfs(nodeId: string, parentId: string | null): void {
    discoveryTime[nodeId] = timer; // @step:visit
    lowLink[nodeId] = timer; // @step:visit
    timer++; // @step:visit

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (discoveryTime[neighborId] === undefined) {
        dfs(neighborId, nodeId); // @step:visit-edge
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, lowLink[neighborId]!); // @step:visit-edge

        if (lowLink[neighborId]! > discoveryTime[nodeId]!) {
          bridges.push([nodeId, neighborId]); // @step:mark-bridge
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

  return bridges; // @step:complete
}
