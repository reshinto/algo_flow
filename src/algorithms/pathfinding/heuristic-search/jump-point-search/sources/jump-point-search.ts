// Jump Point Search — A* optimization that "jumps" over intermediate nodes in uniform-cost grids
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface JpsResult {
  path: [number, number][];
  visited: [number, number][];
  jumpPoints: [number, number][];
}

function jumpPointSearch(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): JpsResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const gCost = Array.from({ length: rowCount }, () => new Array<number>(colCount).fill(Infinity)); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize
  const jumpPoints: [number, number][] = []; // @step:initialize

  gCost[start[0]][start[1]] = 0; // @step:initialize
  const startH = heuristic(start[0], start[1], end[0], end[1]);
  // Open list: [fCost, gCost, row, col]
  const openList: [number, number, number, number][] = [[startH, 0, start[0], start[1]]]; // @step:initialize,open-node
  const inOpenSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize,open-node
  inOpenSet[start[0]][start[1]] = true; // @step:open-node

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (openList.length > 0) {
    openList.sort((first, second) => first[0] - second[0]);
    const current = openList.shift()!; // @step:close-node
    const currentRow = current[2]; // @step:close-node
    const currentCol = current[3]; // @step:close-node
    const currentG = current[1]; // @step:close-node

    visited.push([currentRow, currentCol]); // @step:close-node

    if (currentRow === end[0] && currentCol === end[1]) {
      // @step:trace-path
      return { path: reconstructPath(parent, end), visited, jumpPoints }; // @step:trace-path
    }

    // Try jumping in each cardinal direction from the current node
    for (const [deltaRow, deltaCol] of directions) {
      const jumpTarget = jump(
        grid,
        currentRow,
        currentCol,
        deltaRow,
        deltaCol,
        end,
        rowCount,
        colCount,
      );
      if (jumpTarget === null) continue;

      const [jumpRow, jumpCol] = jumpTarget;

      // Mark intermediate nodes along the jump as jump points
      let scanRow = currentRow + deltaRow;
      let scanCol = currentCol + deltaCol;
      while (scanRow !== jumpRow || scanCol !== jumpCol) {
        if (hasForced(grid, scanRow, scanCol, deltaRow, deltaCol, rowCount, colCount)) {
          jumpPoints.push([scanRow, scanCol]); // @step:visit
        }
        scanRow += deltaRow;
        scanCol += deltaCol;
      }

      const neighborG = currentG + heuristic(currentRow, currentCol, jumpRow, jumpCol);
      if (neighborG < gCost[jumpRow][jumpCol]) {
        gCost[jumpRow][jumpCol] = neighborG; // @step:open-node
        parent[jumpRow][jumpCol] = [currentRow, currentCol]; // @step:open-node
        const jumpH = heuristic(jumpRow, jumpCol, end[0], end[1]);
        const jumpF = neighborG + jumpH;
        inOpenSet[jumpRow][jumpCol] = true;
        openList.push([jumpF, neighborG, jumpRow, jumpCol]); // @step:open-node
      }
    }
  }

  return { path: [], visited, jumpPoints }; // @step:complete
}

/** Attempts to jump from (row+dr, col+dc), returning the first jump point or goal found */
function jump(
  grid: GridCell[][],
  row: number,
  col: number,
  deltaRow: number,
  deltaCol: number,
  end: [number, number],
  rowCount: number,
  colCount: number,
): [number, number] | null {
  let currentRow = row + deltaRow;
  let currentCol = col + deltaCol;

  while (true) {
    if (currentRow < 0 || currentRow >= rowCount || currentCol < 0 || currentCol >= colCount) {
      return null;
    }
    if (grid[currentRow][currentCol].type === "wall") return null;

    // Goal found
    if (currentRow === end[0] && currentCol === end[1]) return [currentRow, currentCol];

    // Forced neighbor detected — this is a jump point
    if (hasForced(grid, currentRow, currentCol, deltaRow, deltaCol, rowCount, colCount)) {
      return [currentRow, currentCol];
    }

    currentRow += deltaRow;
    currentCol += deltaCol;
  }
}

/** Detects forced neighbors — cells reachable through this direction but blocked from natural path */
function hasForced(
  grid: GridCell[][],
  row: number,
  col: number,
  deltaRow: number,
  deltaCol: number,
  rowCount: number,
  colCount: number,
): boolean {
  if (deltaRow !== 0 && deltaCol === 0) {
    // Moving vertically: check horizontal forced neighbors
    const prevRow = row - deltaRow;
    const leftBlocked =
      col - 1 >= 0 &&
      prevRow >= 0 &&
      prevRow < rowCount &&
      grid[prevRow]?.[col - 1]?.type === "wall";
    const rightBlocked =
      col + 1 < colCount &&
      prevRow >= 0 &&
      prevRow < rowCount &&
      grid[prevRow]?.[col + 1]?.type === "wall";
    const leftOpen = col - 1 >= 0 && grid[row]?.[col - 1]?.type !== "wall";
    const rightOpen = col + 1 < colCount && grid[row]?.[col + 1]?.type !== "wall";
    return (leftBlocked && leftOpen) || (rightBlocked && rightOpen);
  }
  if (deltaCol !== 0 && deltaRow === 0) {
    // Moving horizontally: check vertical forced neighbors
    const prevCol = col - deltaCol;
    const upBlocked =
      row - 1 >= 0 &&
      prevCol >= 0 &&
      prevCol < colCount &&
      grid[row - 1]?.[prevCol]?.type === "wall";
    const downBlocked =
      row + 1 < rowCount &&
      prevCol >= 0 &&
      prevCol < colCount &&
      grid[row + 1]?.[prevCol]?.type === "wall";
    const upOpen = row - 1 >= 0 && grid[row - 1]?.[col]?.type !== "wall";
    const downOpen = row + 1 < rowCount && grid[row + 1]?.[col]?.type !== "wall";
    return (upBlocked && upOpen) || (downBlocked && downOpen);
  }
  return false;
}

function heuristic(rowA: number, colA: number, rowB: number, colB: number): number {
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}

function reconstructPath(
  parent: ([number, number] | null)[][],
  end: [number, number],
): [number, number][] {
  const path: [number, number][] = [];
  let current: [number, number] | null = end;
  while (current !== null) {
    path.unshift(current);
    current = parent[current[0]][current[1]];
  }
  return path;
}
