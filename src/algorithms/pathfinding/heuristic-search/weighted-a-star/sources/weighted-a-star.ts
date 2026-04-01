// Weighted A* — A* with inflated heuristic: f(n) = g(n) + weight * h(n). Trades optimality for speed.
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface WeightedAStarResult {
  path: [number, number][];
  visited: [number, number][];
  weight: number;
}

function weightedAStar(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
  weight: number = 1.5,
): WeightedAStarResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const gCost = Array.from({ length: rowCount }, () => new Array<number>(colCount).fill(Infinity)); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize

  gCost[start[0]][start[1]] = 0; // @step:initialize
  const startH = heuristic(start[0], start[1], end[0], end[1]);
  const startF = 0 + weight * startH;
  // Open list: [fCost, gCost, row, col]
  const openList: [number, number, number, number][] = [[startF, 0, start[0], start[1]]]; // @step:initialize,open-node
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
    inOpenSet[currentRow][currentCol] = false; // @step:close-node

    if (currentRow === end[0] && currentCol === end[1]) {
      // @step:trace-path
      return { path: reconstructPath(parent, end), visited, weight }; // @step:trace-path
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
        // Weighted heuristic: inflating h by weight encourages greedy behavior
        const neighborF = neighborG + weight * neighborH; // @step:open-node
        inOpenSet[neighborRow][neighborCol] = true;
        openList.push([neighborF, neighborG, neighborRow, neighborCol]); // @step:open-node
      }
    }
  }

  return { path: [], visited, weight }; // @step:complete
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
