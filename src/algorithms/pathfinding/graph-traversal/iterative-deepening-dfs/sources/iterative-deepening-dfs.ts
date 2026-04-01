// Iterative Deepening DFS — DFS with increasing depth limits, combining BFS optimality with DFS memory efficiency
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface IddfsResult {
  path: [number, number][];
  visited: [number, number][];
  depthReached: number;
}

function iterativeDeepeningDfs(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): IddfsResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const allVisited: [number, number][] = []; // @step:initialize

  // Increase depth limit one step at a time until target is reached
  for (let depthLimit = 0; depthLimit <= rowCount * colCount; depthLimit++) {
    // @step:initialize
    const pathSet = new Set<string>(); // @step:open-node
    const result = depthLimitedSearch(
      grid,
      start,
      end,
      depthLimit,
      pathSet,
      allVisited,
      rowCount,
      colCount,
    ); // @step:close-node

    if (result !== null) {
      return { path: result, visited: allVisited, depthReached: depthLimit }; // @step:trace-path
    }
  }

  return { path: [], visited: allVisited, depthReached: 0 }; // @step:complete
}

function depthLimitedSearch(
  grid: GridCell[][],
  current: [number, number],
  end: [number, number],
  depthRemaining: number,
  pathSet: Set<string>,
  allVisited: [number, number][],
  rowCount: number,
  colCount: number,
): [number, number][] | null {
  const [currentRow, currentCol] = current;
  allVisited.push([currentRow, currentCol]);

  if (currentRow === end[0] && currentCol === end[1]) {
    return [[currentRow, currentCol]];
  }

  if (depthRemaining === 0) return null;

  pathSet.add(`${currentRow},${currentCol}`);

  for (const [deltaRow, deltaCol] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const neighborRow = currentRow + deltaRow;
    const neighborCol = currentCol + deltaCol;

    if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
      continue;
    if (grid[neighborRow][neighborCol].type === "wall") continue;
    if (pathSet.has(`${neighborRow},${neighborCol}`)) continue;

    const subResult = depthLimitedSearch(
      grid,
      [neighborRow, neighborCol],
      end,
      depthRemaining - 1,
      pathSet,
      allVisited,
      rowCount,
      colCount,
    );

    if (subResult !== null) {
      return [[currentRow, currentCol], ...subResult];
    }
  }

  pathSet.delete(`${currentRow},${currentCol}`);
  return null;
}
