// Hungarian Bipartite Matching (Kuhn's Algorithm) — maximum matching via augmenting paths
function hungarianMatching(
  adjacencyList: Record<string, string[]>,
  leftNodes: string[],
  rightNodes: string[],
): Record<string, string> {
  const matchLeft: Record<string, string> = {}; // @step:initialize
  const matchRight: Record<string, string> = {}; // @step:initialize

  for (const leftNode of leftNodes) {
    // @step:initialize
    const visitedRight = new Set<string>(); // @step:initialize

    tryAugment(leftNode, adjacencyList, matchLeft, matchRight, visitedRight); // @step:visit
  }

  return matchLeft; // @step:complete
}

function tryAugment(
  leftNode: string,
  adjacencyList: Record<string, string[]>,
  matchLeft: Record<string, string>,
  matchRight: Record<string, string>,
  visitedRight: Set<string>,
): boolean {
  const neighbors = adjacencyList[leftNode] ?? []; // @step:visit-edge
  for (const rightNode of neighbors) {
    // @step:visit-edge
    if (visitedRight.has(rightNode)) continue; // @step:visit-edge
    visitedRight.add(rightNode); // @step:visit-edge

    const currentOwner = matchRight[rightNode]; // @step:visit-edge
    if (
      currentOwner === undefined ||
      tryAugment(currentOwner, adjacencyList, matchLeft, matchRight, visitedRight)
    ) {
      matchLeft[leftNode] = rightNode; // @step:match-edge
      matchRight[rightNode] = leftNode; // @step:match-edge
      return true; // @step:match-edge
    }
  }
  return false; // @step:visit-edge
}
