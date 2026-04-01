// Greedy Best-First Search — navigate a grid using only the heuristic h(n) = Manhattan distance
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface GreedyResult {
  path: [number, number][];
  visited: [number, number][];
}

function greedyBestFirst(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): GreedyResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize

  // Priority queue entries: [hCost, row, col]
  const openList: [number, number, number][] = [
    [manhattanDistance(start, end), start[0], start[1]],
  ]; // @step:initialize,open-node
  const inOpenSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize,open-node
  const closedSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  inOpenSet[start[0]][start[1]] = true; // @step:open-node

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (openList.length > 0) {
    // Dequeue node with lowest hCost (greedy: ignore g-cost entirely)
    openList.sort((first, second) => first[0] - second[0]); // @step:close-node
    const current = openList.shift()!; // @step:close-node
    const currentRow = current[1]; // @step:close-node
    const currentCol = current[2]; // @step:close-node

    closedSet[currentRow][currentCol] = true; // @step:close-node
    visited.push([currentRow, currentCol]); // @step:close-node

    // Check if goal reached
    if (currentRow === end[0] && currentCol === end[1]) {
      // @step:trace-path
      return { path: reconstructPath(parent, end), visited }; // @step:trace-path
    }

    // Expand neighbors sorted by heuristic only
    for (const [deltaRow, deltaCol] of directions) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].type === "wall") continue;
      if (closedSet[neighborRow][neighborCol]) continue;
      if (inOpenSet[neighborRow][neighborCol]) continue;

      // Greedy: use only heuristic, g-cost is always treated as 0
      const hCost = manhattanDistance([neighborRow, neighborCol], end); // @step:open-node
      inOpenSet[neighborRow][neighborCol] = true; // @step:open-node
      parent[neighborRow][neighborCol] = [currentRow, currentCol]; // @step:open-node
      openList.push([hCost, neighborRow, neighborCol]); // @step:open-node
    }
  }

  return { path: [], visited }; // @step:complete
}

function manhattanDistance(pointA: [number, number], pointB: [number, number]): number {
  return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
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
