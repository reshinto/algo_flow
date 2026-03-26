function dijkstra(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): DijkstraResult {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  const distance = Array.from({ length: rowCount }, () => new Array(colCount).fill(Infinity));
  distance[start[0]][start[1]] = 0;
  const parent = Array.from({ length: rowCount }, () => new Array(colCount).fill(null));
  const openSet = [{ row: start[0], col: start[1], dist: 0 }];
  const visitedSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false));

  while (openSet.length > 0) {
    openSet.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
    const current = openSet.shift()!;
    if (visitedSet[current.row][current.col]) continue;
    visitedSet[current.row][current.col] = true;

    if (current.row === end[0] && current.col === end[1]) {
      return { path: reconstructPath(parent, end), visited: [] };
    }

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
      const newDistance = distance[current.row][current.col] + 1;
      if (newDistance < distance[neighborRow][neighborCol]) {
        distance[neighborRow][neighborCol] = newDistance;
        parent[neighborRow][neighborCol] = [current.row, current.col];
        openSet.push({ row: neighborRow, col: neighborCol, dist: newDistance });
      }
    }
  }
  return { path: [], visited: [] };
}
