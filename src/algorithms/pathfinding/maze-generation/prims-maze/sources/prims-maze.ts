// Prim's Maze — randomized Prim's algorithm for maze generation
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

function primsMaze(grid: GridCell[][], start: [number, number]): MazeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const inMaze = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  let passagesCarved = 0; // @step:initialize

  // Each frontier entry is [wallRow, wallCol, originRow, originCol]
  const frontier: [number, number, number, number][] = []; // @step:initialize
  const [startRow, startCol] = start; // @step:initialize

  // Add start cell to maze
  inMaze[startRow][startCol] = true; // @step:open-node
  if (grid[startRow][startCol].type === "wall") {
    grid[startRow][startCol].type = "empty"; // @step:open-node
    passagesCarved++;
  }

  // Directions move 2 cells (skipping wall cells)
  const directions: [number, number][] = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  // Add initial frontier walls
  for (const [deltaRow, deltaCol] of directions) {
    const neighborRow = startRow + deltaRow;
    const neighborCol = startCol + deltaCol;
    if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
    if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
    if (!inMaze[neighborRow][neighborCol]) {
      frontier.push([neighborRow, neighborCol, startRow, startCol]); // @step:open-node
    }
  }

  while (frontier.length > 0) {
    // Randomly pick a frontier wall
    const pickedIndex = Math.floor(Math.random() * frontier.length);
    const picked = frontier.splice(pickedIndex, 1)[0]!; // @step:carve-cell
    const [pickedRow, pickedCol, originRow, originCol] = picked;

    if (inMaze[pickedRow][pickedCol]) continue; // @step:carve-cell

    // Carve the passage cell
    inMaze[pickedRow][pickedCol] = true; // @step:carve-cell
    if (grid[pickedRow][pickedCol].type === "wall") {
      grid[pickedRow][pickedCol].type = "empty"; // @step:carve-cell
      passagesCarved++;
    }

    // Carve the wall between origin and picked
    const wallRow = originRow + Math.floor((pickedRow - originRow) / 2);
    const wallCol = originCol + Math.floor((pickedCol - originCol) / 2);
    if (grid[wallRow][wallCol].type === "wall") {
      grid[wallRow][wallCol].type = "empty"; // @step:carve-cell
      passagesCarved++;
    }

    // Add new frontier neighbors
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = pickedRow + deltaRow;
      const neighborCol = pickedCol + deltaCol;
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      if (!inMaze[neighborRow][neighborCol]) {
        frontier.push([neighborRow, neighborCol, pickedRow, pickedCol]); // @step:open-node
      }
    }
  }

  return { grid, passagesCarved }; // @step:complete
}
