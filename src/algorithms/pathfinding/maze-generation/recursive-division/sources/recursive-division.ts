// Recursive Division Maze — builds walls in an open grid, leaving one gap per wall
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface MazeResult {
  grid: GridCell[][];
  wallsBuilt: number;
}

function recursiveDivision(
  grid: GridCell[][],
  startPos: [number, number],
  endPos: [number, number],
): MazeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  let wallsBuilt = 0; // @step:initialize

  function buildWallsInRegion(
    topRow: number,
    leftCol: number,
    bottomRow: number,
    rightCol: number,
  ): void {
    const regionHeight = bottomRow - topRow; // @step:carve-cell
    const regionWidth = rightCol - leftCol; // @step:carve-cell

    if (regionHeight < 2 || regionWidth < 2) return; // @step:carve-cell

    // Choose orientation: horizontal wall if taller, vertical if wider
    const buildHorizontal = regionHeight >= regionWidth; // @step:carve-cell

    if (buildHorizontal) {
      // Place wall at a random even row within the region
      const wallRow = topRow + 2 * Math.floor(Math.random() * Math.floor(regionHeight / 2)) + 1; // @step:carve-cell
      // Random passage gap at an odd column
      const gapCol = leftCol + 2 * Math.floor(Math.random() * Math.ceil(regionWidth / 2)); // @step:carve-cell

      for (let colIndex = leftCol; colIndex <= rightCol; colIndex++) {
        // @step:carve-cell
        const cell = grid[wallRow]?.[colIndex];
        if (!cell) continue;
        if (cell.type === "start" || cell.type === "end") continue;
        if (colIndex === gapCol) continue; // Leave the gap open
        cell.type = "wall"; // @step:carve-cell
        wallsBuilt++;
      }

      buildWallsInRegion(topRow, leftCol, wallRow - 1, rightCol); // @step:carve-cell
      buildWallsInRegion(wallRow + 1, leftCol, bottomRow, rightCol); // @step:carve-cell
    } else {
      // Place wall at a random even column within the region
      const wallCol = leftCol + 2 * Math.floor(Math.random() * Math.floor(regionWidth / 2)) + 1; // @step:carve-cell
      // Random passage gap at an odd row
      const gapRow = topRow + 2 * Math.floor(Math.random() * Math.ceil(regionHeight / 2)); // @step:carve-cell

      for (let rowIndex = topRow; rowIndex <= bottomRow; rowIndex++) {
        // @step:carve-cell
        const cell = grid[rowIndex]?.[wallCol];
        if (!cell) continue;
        if (cell.type === "start" || cell.type === "end") continue;
        if (rowIndex === gapRow) continue; // Leave the gap open
        cell.type = "wall"; // @step:carve-cell
        wallsBuilt++;
      }

      buildWallsInRegion(topRow, leftCol, bottomRow, wallCol - 1); // @step:carve-cell
      buildWallsInRegion(topRow, wallCol + 1, bottomRow, rightCol); // @step:carve-cell
    }
  }

  buildWallsInRegion(0, 0, rowCount - 1, colCount - 1); // @step:carve-cell

  return { grid, wallsBuilt }; // @step:complete
}
