// Recursive Backtracker Maze — DFS-based maze carving with random neighbor selection
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

function recursiveBacktrackerMaze(grid: GridCell[][], start: [number, number]): MazeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const visited = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  let passagesCarved = 0; // @step:initialize

  // DFS stack — stores passage cell coordinates (odd row and col only)
  const stack: [number, number][] = []; // @step:initialize
  const [startRow, startCol] = start; // @step:initialize

  // Mark start cell as visited and push onto stack
  visited[startRow][startCol] = true; // @step:carve-cell
  stack.push([startRow, startCol]); // @step:carve-cell

  // Cardinal directions — each step moves 2 cells to skip over walls
  const directions: [number, number][] = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2],
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1]!; // @step:visit
    const [currentRow, currentCol] = current; // @step:visit

    // Collect unvisited passage-cell neighbors
    const unvisitedNeighbors: [number, number][] = []; // @step:visit
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
      if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
      if (!visited[neighborRow][neighborCol]) {
        unvisitedNeighbors.push([neighborRow, neighborCol]); // @step:visit
      }
    }

    if (unvisitedNeighbors.length > 0) {
      // Randomly choose one unvisited neighbor
      const chosenIndex = Math.floor(Math.random() * unvisitedNeighbors.length);
      const chosen = unvisitedNeighbors[chosenIndex]!; // @step:carve-cell
      const [chosenRow, chosenCol] = chosen;

      // Carve the wall between current and chosen
      const wallRow = currentRow + (chosenRow - currentRow) / 2;
      const wallCol = currentCol + (chosenCol - currentCol) / 2;
      grid[wallRow][wallCol].type = "empty"; // @step:carve-cell
      passagesCarved++;

      // Carve the chosen cell itself
      if (grid[chosenRow][chosenCol].type === "wall") {
        grid[chosenRow][chosenCol].type = "empty"; // @step:carve-cell
        passagesCarved++;
      }

      visited[chosenRow][chosenCol] = true; // @step:carve-cell
      stack.push([chosenRow, chosenCol]); // @step:carve-cell
    } else {
      // Backtrack — no unvisited neighbors remain
      stack.pop(); // @step:visit
    }
  }

  return { grid, passagesCarved }; // @step:complete
}
