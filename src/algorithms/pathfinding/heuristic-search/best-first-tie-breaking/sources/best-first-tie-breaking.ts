// Best-First Tie Breaking — A* with cross-product tie-breaking for aesthetically straight paths
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface TieBreakingResult {
  path: [number, number][];
  visited: [number, number][];
}

function bestFirstTieBreaking(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): TieBreakingResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const gCost = Array.from({ length: rowCount }, () => new Array<number>(colCount).fill(Infinity)); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize

  gCost[start[0]][start[1]] = 0; // @step:initialize
  const startH = heuristic(start[0], start[1], end[0], end[1]);
  const startTie = crossProduct(start[0], start[1], start[0], start[1], end[0], end[1]);
  // Open list: [fCost, hCost, tieBreaker, gCost, row, col]
  const openList: [number, number, number, number, number, number][] = [
    [startH, startH, startTie, 0, start[0], start[1]],
  ]; // @step:initialize,open-node
  const inOpenSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize,open-node
  inOpenSet[start[0]][start[1]] = true; // @step:open-node

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (openList.length > 0) {
    // Sort by: fCost, then hCost, then cross-product tie breaker
    openList.sort((first, second) => {
      if (first[0] !== second[0]) return first[0] - second[0];
      if (first[1] !== second[1]) return first[1] - second[1];
      return first[2] - second[2];
    });

    const current = openList.shift()!; // @step:close-node
    const currentRow = current[4]; // @step:close-node
    const currentCol = current[5]; // @step:close-node
    const currentG = current[3]; // @step:close-node

    visited.push([currentRow, currentCol]); // @step:close-node
    inOpenSet[currentRow][currentCol] = false; // @step:close-node

    if (currentRow === end[0] && currentCol === end[1]) {
      // @step:trace-path
      return { path: reconstructPath(parent, end), visited }; // @step:trace-path
    }

    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].type === "wall") continue;

      const neighborG = currentG + 1;
      if (neighborG < gCost[neighborRow][neighborCol]) {
        gCost[neighborRow][neighborCol] = neighborG; // @step:open-node
        parent[neighborRow][neighborCol] = [currentRow, currentCol]; // @step:open-node
        const neighborH = heuristic(neighborRow, neighborCol, end[0], end[1]);
        const neighborF = neighborG + neighborH;
        // Cross-product tie-breaking: prefer nodes on the straight line from start to end
        const tieBreaker = crossProduct(
          start[0],
          start[1],
          neighborRow,
          neighborCol,
          end[0],
          end[1],
        ); // @step:open-node
        inOpenSet[neighborRow][neighborCol] = true;
        openList.push([neighborF, neighborH, tieBreaker, neighborG, neighborRow, neighborCol]); // @step:open-node
      }
    }
  }

  return { path: [], visited }; // @step:complete
}

/**
 * Cross-product tie breaker: measures deviation from the ideal straight line.
 * Nodes lying exactly on the line from start to end receive a score of 0.
 */
function crossProduct(
  startRow: number,
  startCol: number,
  nodeRow: number,
  nodeCol: number,
  endRow: number,
  endCol: number,
): number {
  const deltaRow1 = nodeRow - startRow;
  const deltaCol1 = nodeCol - startCol;
  const deltaRow2 = endRow - startRow;
  const deltaCol2 = endCol - startCol;
  return Math.abs(deltaRow1 * deltaCol2 - deltaRow2 * deltaCol1);
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
