// Multi-Source BFS — computes distance from nearest wall for every empty cell simultaneously
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface MultiSourceResult {
  distances: number[][];
  maxDistance: number;
}

function multiSourceBfs(grid: GridCell[][]): MultiSourceResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const distances: number[][] = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(-1),
  ); // @step:initialize

  // Seed queue with ALL empty cells adjacent to a wall (distance = 1)
  const queue: [number, number][] = []; // @step:initialize,open-node
  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      const cell = grid[rowIndex][colIndex];
      if (cell.type === "wall") continue;
      // Check if any neighbor is a wall
      let adjacentToWall = false;
      for (const [deltaRow, deltaCol] of directions) {
        const neighborRow = rowIndex + deltaRow;
        const neighborCol = colIndex + deltaCol;
        if (
          neighborRow < 0 ||
          neighborRow >= rowCount ||
          neighborCol < 0 ||
          neighborCol >= colCount
        ) {
          adjacentToWall = true; // grid boundary counts as wall
          break;
        }
        if (grid[neighborRow][neighborCol].type === "wall") {
          // @step:open-node
          adjacentToWall = true;
          break;
        }
      }
      if (adjacentToWall) {
        distances[rowIndex][colIndex] = 1; // @step:open-node
        queue.push([rowIndex, colIndex]); // @step:open-node
      }
    }
  }

  let maxDistance = 1;

  while (queue.length > 0) {
    const current = queue.shift()!; // @step:close-node
    const [currentRow, currentCol] = current; // @step:close-node
    const currentDistance = distances[currentRow][currentCol]!; // @step:update-cost

    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;

      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].type === "wall") continue;
      if (distances[neighborRow][neighborCol] !== -1) continue;

      const neighborDistance = currentDistance + 1;
      distances[neighborRow][neighborCol] = neighborDistance; // @step:update-cost
      if (neighborDistance > maxDistance) maxDistance = neighborDistance;
      queue.push([neighborRow, neighborCol]); // @step:open-node
    }
  }

  return { distances, maxDistance }; // @step:complete
}
