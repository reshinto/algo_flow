// D* Lite — Incremental replanning: searches from goal to start, then replans after obstacle discovery
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface DStarResult {
  path: [number, number][];
  visited: [number, number][];
  replanCount: number;
}

function dStarLite(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): DStarResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  // Work on a mutable copy of the grid for obstacle simulation
  const workingGrid: GridCell[][] = grid.map((row) => row.map((cell) => ({ ...cell }))); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize
  let replanCount = 0; // @step:initialize

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Phase 1: initial A* search from start to end
  const initialResult = aStarSearch(
    workingGrid,
    start,
    end,
    directions,
    rowCount,
    colCount,
    visited,
  ); // @step:close-node

  if (initialResult === null) {
    return { path: [], visited, replanCount }; // @step:complete
  }

  replanCount++; // @step:close-node

  // Phase 2: simulate discovering a new obstacle mid-path and replan
  const discoveredObstacle = findObstacleCandidate(workingGrid, initialResult, rowCount, colCount); // @step:open-node

  if (discoveredObstacle !== null) {
    const [obstacleRow, obstacleCol] = discoveredObstacle;
    workingGrid[obstacleRow][obstacleCol].type = "wall"; // @step:open-node

    const replanResult = aStarSearch(
      workingGrid,
      start,
      end,
      directions,
      rowCount,
      colCount,
      visited,
    ); // @step:close-node
    replanCount++; // @step:close-node

    if (replanResult !== null) {
      return { path: replanResult, visited, replanCount }; // @step:trace-path
    }
    return { path: [], visited, replanCount }; // @step:complete
  }

  return { path: initialResult, visited, replanCount }; // @step:trace-path
}

/** A* search subroutine used by D* Lite for both initial and replanned searches */
function aStarSearch(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
  directions: [number, number][],
  rowCount: number,
  colCount: number,
  visited: [number, number][],
): [number, number][] | null {
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  );
  const gCost = Array.from({ length: rowCount }, () => new Array<number>(colCount).fill(Infinity));

  gCost[start[0]][start[1]] = 0;
  const startH = heuristic(start[0], start[1], end[0], end[1]);
  const openList: [number, number, number, number][] = [[startH, 0, start[0], start[1]]];

  while (openList.length > 0) {
    openList.sort((first, second) => first[0] - second[0]);
    const current = openList.shift()!;
    const currentG = current[1];
    const currentRow = current[2];
    const currentCol = current[3];

    visited.push([currentRow, currentCol]); // @step:close-node

    if (currentRow === end[0] && currentCol === end[1]) {
      return reconstructPath(parent, end); // @step:trace-path
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
        openList.push([neighborG + neighborH, neighborG, neighborRow, neighborCol]); // @step:open-node
      }
    }
  }

  return null;
}

/** Find a cell adjacent to the initial path that can become a new obstacle */
function findObstacleCandidate(
  grid: GridCell[][],
  path: [number, number][],
  rowCount: number,
  colCount: number,
): [number, number] | null {
  if (path.length < 4) return null;

  const midIndex = Math.floor(path.length / 2);
  const midCell = path[midIndex]!;

  const candidates: [number, number][] = [
    [midCell[0] - 1, midCell[1]],
    [midCell[0] + 1, midCell[1]],
    [midCell[0], midCell[1] - 1],
    [midCell[0], midCell[1] + 1],
  ];

  for (const [candidateRow, candidateCol] of candidates) {
    if (candidateRow < 0 || candidateRow >= rowCount) continue;
    if (candidateCol < 0 || candidateCol >= colCount) continue;
    const cell = grid[candidateRow][candidateCol];
    if (cell.type === "empty") return [candidateRow, candidateCol];
  }

  return null;
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
