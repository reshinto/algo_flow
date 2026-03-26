// Dijkstra's Algorithm — find shortest path on a weighted grid
function dijkstra(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): DijkstraResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0].length; // @step:initialize
  const distance = Array.from({ length: rowCount }, () => new Array(colCount).fill(Infinity)); // @step:initialize
  distance[start[0]][start[1]] = 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () => new Array(colCount).fill(null)); // @step:initialize
  // Seed the frontier with the start cell
  const openSet = [{ row: start[0], col: start[1], dist: 0 }]; // @step:initialize,open-node
  const visitedSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize,open-node

  while (openSet.length > 0) {
    // Extract the node with the smallest tentative distance
    openSet.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist); // @step:close-node
    const current = openSet.shift()!; // @step:close-node
    if (visitedSet[current.row][current.col]) continue; // @step:close-node
    visitedSet[current.row][current.col] = true; // @step:close-node

    // Check if we reached the end — reconstruct path via parent pointers
    if (current.row === end[0] && current.col === end[1]) {
      // @step:trace-path
      return { path: reconstructPath(parent, end), visited: [] }; // @step:trace-path
    }

    // Explore 4-directional neighbors (up, down, left, right)
    for (const [deltaRow, deltaCol] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const neighborRow = current.row + deltaRow;
      const neighborCol = current.col + deltaCol;
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].type === "wall" || visitedSet[neighborRow][neighborCol])
        continue;
      // Relax the edge: update distance if a shorter path is found
      const newDistance = distance[current.row][current.col] + 1; // @step:update-cost
      if (newDistance < distance[neighborRow][neighborCol]) {
        // @step:update-cost
        distance[neighborRow][neighborCol] = newDistance; // @step:update-cost
        parent[neighborRow][neighborCol] = [current.row, current.col];
        openSet.push({ row: neighborRow, col: neighborCol, dist: newDistance });
      }
    }
  }
  return { path: [], visited: [] }; // @step:complete
}
