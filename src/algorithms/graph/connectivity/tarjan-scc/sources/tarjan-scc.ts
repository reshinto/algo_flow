// Tarjan's SCC — finds strongly connected components using DFS with discovery and low-link values
export function tarjanSCC(adjacencyList: Record<string, string[]>, nodeIds: string[]): string[][] {
  const discoveryTime: Record<string, number> = {}; // @step:initialize
  const lowLink: Record<string, number> = {}; // @step:initialize
  const onStack: Record<string, boolean> = {}; // @step:initialize
  const nodeStack: string[] = []; // @step:initialize
  const components: string[][] = []; // @step:initialize
  let timer = 0; // @step:initialize

  function dfs(nodeId: string): void {
    discoveryTime[nodeId] = timer; // @step:visit
    lowLink[nodeId] = timer; // @step:visit
    timer++; // @step:visit
    nodeStack.push(nodeId); // @step:push-stack
    onStack[nodeId] = true; // @step:push-stack

    const neighbors = adjacencyList[nodeId] ?? [];
    for (const neighborId of neighbors) {
      if (discoveryTime[neighborId] === undefined) {
        dfs(neighborId); // @step:visit-edge
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, lowLink[neighborId]!); // @step:visit-edge
      } else if (onStack[neighborId]) {
        lowLink[nodeId] = Math.min(lowLink[nodeId]!, discoveryTime[neighborId]!); // @step:visit-edge
      }
    }

    if (lowLink[nodeId] === discoveryTime[nodeId]) {
      const component: string[] = []; // @step:pop-stack
      let poppedNodeId: string;
      do {
        poppedNodeId = nodeStack.pop()!; // @step:pop-stack
        onStack[poppedNodeId] = false; // @step:pop-stack
        component.push(poppedNodeId); // @step:pop-stack
      } while (poppedNodeId !== nodeId);
      components.push(component); // @step:assign-component
    }
  }

  for (const nodeId of nodeIds) {
    if (discoveryTime[nodeId] === undefined) {
      dfs(nodeId); // @step:initialize
    }
  }

  return components; // @step:complete
}
