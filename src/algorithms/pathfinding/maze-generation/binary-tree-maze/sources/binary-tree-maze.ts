// Binary Tree Maze — for each cell, randomly carve north or east
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

function binaryTreeMaze(grid: GridCell[][]): MazeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  let passagesCarved = 0; // @step:initialize

  // Carve all passage cells first
  for (let rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
    for (let colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
      if (grid[rowIndex]![colIndex]!.type === "wall") {
        grid[rowIndex]![colIndex]!.type = "empty"; // @step:carve-cell
        passagesCarved++;
      }

      // Determine which directions are available: north (row-1) and east (col+1)
      const canGoNorth = rowIndex - 2 >= 1; // @step:carve-cell
      const canGoEast = colIndex + 2 <= colCount - 2; // @step:carve-cell

      if (canGoNorth && canGoEast) {
        // Randomly choose north or east
        if (Math.random() < 0.5) {
          grid[rowIndex - 1]![colIndex]!.type = "empty"; // @step:carve-cell — carve north
          passagesCarved++;
        } else {
          grid[rowIndex]![colIndex + 1]!.type = "empty"; // @step:carve-cell — carve east
          passagesCarved++;
        }
      } else if (canGoNorth) {
        grid[rowIndex - 1]![colIndex]!.type = "empty"; // @step:carve-cell — only north available
        passagesCarved++;
      } else if (canGoEast) {
        grid[rowIndex]![colIndex + 1]!.type = "empty"; // @step:carve-cell — only east available
        passagesCarved++;
      }
      // Corner cell (top-right): no north or east — leave isolated
    }
  }

  return { grid, passagesCarved }; // @step:complete
}
