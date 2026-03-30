// Bidirectional BFS — two simultaneous frontiers from start and target meeting in the middle
function bidirectionalBFS(
  adjacencyList: Record<string, string[]>,
  startNodeId: string,
  targetNodeId: string,
): string[] | null {
  if (startNodeId === targetNodeId) return [startNodeId]; // @step:initialize

  const forwardVisited: Map<string, string | null> = new Map(); // @step:initialize
  const backwardVisited: Map<string, string | null> = new Map(); // @step:initialize
  const forwardQueue: string[] = [startNodeId]; // @step:initialize
  const backwardQueue: string[] = [targetNodeId]; // @step:initialize
  forwardVisited.set(startNodeId, null); // @step:initialize
  backwardVisited.set(targetNodeId, null); // @step:initialize

  // Build undirected neighbor lookup by merging both edge directions
  const undirectedNeighbors: Record<string, string[]> = {};
  for (const [nodeId, neighbors] of Object.entries(adjacencyList)) {
    undirectedNeighbors[nodeId] ??= [];
    for (const neighborId of neighbors) {
      undirectedNeighbors[nodeId]!.push(neighborId);
      undirectedNeighbors[neighborId] ??= [];
      if (!undirectedNeighbors[neighborId]!.includes(nodeId)) {
        undirectedNeighbors[neighborId]!.push(nodeId);
      }
    }
  }

  while (forwardQueue.length > 0 || backwardQueue.length > 0) {
    // Expand the forward frontier one level
    if (forwardQueue.length > 0) {
      const currentNodeId = forwardQueue.shift()!; // @step:dequeue
      const forwardNeighbors = undirectedNeighbors[currentNodeId] ?? [];
      for (const neighborId of forwardNeighbors) {
        // @step:visit-edge
        if (!forwardVisited.has(neighborId)) {
          forwardVisited.set(neighborId, currentNodeId); // @step:visit-edge
          forwardQueue.push(neighborId); // @step:visit-edge,enqueue
          if (backwardVisited.has(neighborId)) {
            // @step:complete
            return reconstructPath(forwardVisited, backwardVisited, neighborId); // @step:complete
          }
        }
      }
    }

    // Expand the backward frontier one level
    if (backwardQueue.length > 0) {
      const currentNodeId = backwardQueue.shift()!; // @step:dequeue
      const backwardNeighbors = undirectedNeighbors[currentNodeId] ?? [];
      for (const neighborId of backwardNeighbors) {
        // @step:visit-edge
        if (!backwardVisited.has(neighborId)) {
          backwardVisited.set(neighborId, currentNodeId); // @step:visit-edge
          backwardQueue.push(neighborId); // @step:visit-edge,enqueue
          if (forwardVisited.has(neighborId)) {
            // @step:complete
            return reconstructPath(forwardVisited, backwardVisited, neighborId); // @step:complete
          }
        }
      }
    }
  }

  return null; // @step:complete
}

/** Reconstruct the shortest path from start to target through the meeting node. */
function reconstructPath(
  forwardVisited: Map<string, string | null>,
  backwardVisited: Map<string, string | null>,
  meetingNodeId: string,
): string[] {
  const forwardPath: string[] = [];
  let currentNode: string | null = meetingNodeId;
  while (currentNode !== null) {
    forwardPath.unshift(currentNode);
    currentNode = forwardVisited.get(currentNode) ?? null;
  }

  const backwardPath: string[] = [];
  let backNode: string | null | undefined = backwardVisited.get(meetingNodeId);
  while (backNode !== undefined && backNode !== null) {
    backwardPath.push(backNode);
    backNode = backwardVisited.get(backNode);
  }

  return [...forwardPath, ...backwardPath];
}
