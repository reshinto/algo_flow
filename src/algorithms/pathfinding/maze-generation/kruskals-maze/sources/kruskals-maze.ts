// Kruskal's Maze — Union-Find based maze generation by randomly removing walls
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

function kruskalsMaze(grid: GridCell[][]): MazeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  let passagesCarved = 0; // @step:initialize

  // Union-Find: each cell has a set ID
  const setId: number[][] = Array.from({ length: rowCount }, (_, rowIndex) =>
    Array.from({ length: colCount }, (_, colIndex) => rowIndex * colCount + colIndex),
  ); // @step:initialize

  function findSet(row: number, col: number): number {
    // @step:initialize
    const cellId = setId[row]![col]!;
    if (cellId === row * colCount + col) return cellId;
    return cellId;
  }

  function mergeSets(rowA: number, colA: number, rowB: number, colB: number): void {
    // @step:initialize
    const idA = findSet(rowA, colA);
    const idB = findSet(rowB, colB);
    if (idA === idB) return;
    // Relabel all cells with idB to idA
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      for (let colIndex = 0; colIndex < colCount; colIndex++) {
        if (setId[rowIndex]![colIndex] === idB) {
          setId[rowIndex]![colIndex] = idA;
        }
      }
    }
  }

  // Collect all internal walls between passage cells
  const walls: [number, number, number, number, number, number][] = []; // @step:initialize

  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      // Carve the passage cell itself
      if (grid[rowIndex]![colIndex]!.type === "wall") {
        grid[rowIndex]![colIndex]!.type = "empty"; // @step:merge-cells
        passagesCarved++;
      }
      // Horizontal wall to the right
      if (colIndex + 2 < colCount - 1) {
        walls.push([rowIndex, colIndex + 1, rowIndex, colIndex, rowIndex, colIndex + 2]);
      }
      // Vertical wall below
      if (rowIndex + 2 < rowCount - 1) {
        walls.push([rowIndex + 1, colIndex, rowIndex, colIndex, rowIndex + 2, colIndex]);
      }
    }
  }

  // Shuffle walls randomly (Fisher-Yates)
  for (let wallIndex = walls.length - 1; wallIndex > 0; wallIndex--) {
    const swapIndex = Math.floor(Math.random() * (wallIndex + 1));
    const temp = walls[wallIndex]!;
    walls[wallIndex] = walls[swapIndex]!;
    walls[swapIndex] = temp;
  } // @step:merge-cells

  // Process each wall
  for (const wall of walls) {
    const [wallRow, wallCol, cellARow, cellACol, cellBRow, cellBCol] = wall;
    if (findSet(cellARow, cellACol) !== findSet(cellBRow, cellBCol)) {
      // @step:merge-cells
      // Remove the wall and merge the two sets
      grid[wallRow]![wallCol]!.type = "empty"; // @step:merge-cells
      passagesCarved++;
      mergeSets(cellARow, cellACol, cellBRow, cellBCol); // @step:merge-cells
    }
  }

  return { grid, passagesCarved }; // @step:complete
}
