// A* Search — find shortest path using Manhattan distance heuristic
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface AStarResult {
  path: [number, number][];
  visited: [number, number][];
}

interface AStarNode {
  row: number;
  col: number;
  gCost: number;
  hCost: number;
  fCost: number;
}

function aStarGrid(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): AStarResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const gCostMap = Array.from({ length: rowCount }, () => new Array(colCount).fill(Infinity)); // @step:initialize
  gCostMap[start[0]][start[1]] = 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const closedSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize

  // Priority queue ordered by fCost = gCost + hCost
  const openSet: AStarNode[] = []; // @step:initialize,open-node
  const startHCost = manhattanDistance(start[0], start[1], end[0], end[1]);
  openSet.push({ row: start[0], col: start[1], gCost: 0, hCost: startHCost, fCost: startHCost }); // @step:open-node

  while (openSet.length > 0) {
    // Extract node with lowest fCost
    openSet.sort((nodeA, nodeB) => nodeA.fCost - nodeB.fCost || nodeA.hCost - nodeB.hCost); // @step:close-node
    const current = openSet.shift()!; // @step:close-node
    if (closedSet[current.row][current.col]) continue; // @step:close-node
    closedSet[current.row][current.col] = true; // @step:close-node
    visited.push([current.row, current.col]); // @step:close-node

    // Check if we reached the end
    if (current.row === end[0] && current.col === end[1]) {
      // @step:trace-path
      return { path: reconstructPath(parent, end), visited }; // @step:trace-path
    }

    // Explore 4-directional neighbors
    for (const [deltaRow, deltaCol] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const neighborRow = current.row + deltaRow;
      const neighborCol = current.col + deltaCol;
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].type === "wall") continue;
      if (closedSet[neighborRow][neighborCol]) continue;

      const tentativeGCost = gCostMap[current.row][current.col] + 1; // @step:update-cost
      if (tentativeGCost < gCostMap[neighborRow][neighborCol]) {
        // @step:update-cost
        gCostMap[neighborRow][neighborCol] = tentativeGCost; // @step:update-cost
        parent[neighborRow][neighborCol] = [current.row, current.col];
        const neighborHCost = manhattanDistance(neighborRow, neighborCol, end[0], end[1]);
        const neighborFCost = tentativeGCost + neighborHCost;
        openSet.push({
          row: neighborRow,
          col: neighborCol,
          gCost: tentativeGCost,
          hCost: neighborHCost,
          fCost: neighborFCost,
        });
      }
    }
  }
  return { path: [], visited }; // @step:complete
}

function manhattanDistance(rowA: number, colA: number, rowB: number, colB: number): number {
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
