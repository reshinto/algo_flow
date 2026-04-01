// Aldous-Broder Maze — uniform random spanning tree via random walk
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface MazeResult {
  grid: GridCell[][];
  passagesCarved: number;
}

function aldousBroder(grid: GridCell[][], start: [number, number]): MazeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const visited = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  let passagesCarved = 0; // @step:initialize

  // Count total passage cells (odd row and odd col)
  let totalPassageCells = 0; // @step:initialize
  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      totalPassageCells++;
    }
  }

  let visitedCount = 0; // @step:initialize
  let [currentRow, currentCol] = start; // @step:initialize

  // Mark start as visited and carve it
  visited[currentRow][currentCol] = true; // @step:visit
  if (grid[currentRow][currentCol].type === "wall") {
    grid[currentRow][currentCol].type = "empty"; // @step:carve-cell
    passagesCarved++;
  }
  visitedCount++;

  // Directions move 2 cells to passage-cell neighbors
  const directions: [number, number][] = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  // Iteration cap to prevent infinite loops on sparse grids
  const maxIterations = rowCount * colCount * 10;
  let iterations = 0;

  while (visitedCount < totalPassageCells && iterations < maxIterations) {
    iterations++;

    // Collect valid passage-cell neighbors
    const validNeighbors: [number, number][] = []; // @step:visit
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      validNeighbors.push([neighborRow, neighborCol]);
    }

    if (validNeighbors.length === 0) break;

    // Pick a random neighbor (random walk)
    const chosenIndex = Math.floor(Math.random() * validNeighbors.length);
    const [nextRow, nextCol] = validNeighbors[chosenIndex]!; // @step:visit

    if (!visited[nextRow][nextCol]) {
      // Carve the wall between current and next
      const wallRow = currentRow + Math.floor((nextRow - currentRow) / 2);
      const wallCol = currentCol + Math.floor((nextCol - currentCol) / 2);
      grid[wallRow][wallCol].type = "empty"; // @step:carve-cell
      passagesCarved++;

      // Carve the next passage cell
      if (grid[nextRow][nextCol].type === "wall") {
        grid[nextRow][nextCol].type = "empty"; // @step:carve-cell
        passagesCarved++;
      }

      visited[nextRow][nextCol] = true; // @step:carve-cell
      visitedCount++;
    }

    currentRow = nextRow; // @step:visit
    currentCol = nextCol; // @step:visit
  }

  return { grid, passagesCarved }; // @step:complete
}
