// IDA* — Iterative Deepening A*: DFS with f-cost threshold that increases each iteration
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface IDAStarResult {
  path: [number, number][];
  visited: [number, number][];
  iterationCount: number;
}

function idaStar(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): IDAStarResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const visited: [number, number][] = []; // @step:initialize
  let threshold = heuristic(start[0], start[1], end[0], end[1]); // @step:initialize
  const currentPath: [number, number][] = [start]; // @step:initialize
  const onPath = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  onPath[start[0]][start[1]] = true; // @step:initialize
  let iterationCount = 0; // @step:initialize

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (true) {
    iterationCount++; // @step:close-node
    const result = search(
      grid,
      currentPath,
      onPath,
      0,
      threshold,
      end,
      visited,
      directions,
      rowCount,
      colCount,
    ); // @step:close-node

    if (result === "FOUND") {
      // @step:trace-path
      return { path: [...currentPath], visited, iterationCount }; // @step:trace-path
    }

    if (result === Infinity) {
      return { path: [], visited, iterationCount }; // @step:complete
    }

    threshold = result as number; // @step:initialize
  }
}

/**
 * DFS subroutine. Returns:
 * - "FOUND" if goal reached within threshold
 * - Infinity if no path exists
 * - minimum f-cost that exceeded threshold (for next iteration)
 */
function search(
  grid: GridCell[][],
  currentPath: [number, number][],
  onPath: boolean[][],
  gCost: number,
  threshold: number,
  end: [number, number],
  visited: [number, number][],
  directions: [number, number][],
  rowCount: number,
  colCount: number,
): number | "FOUND" {
  const head = currentPath[currentPath.length - 1]!;
  const fCost = gCost + heuristic(head[0], head[1], end[0], end[1]); // @step:open-node

  if (fCost > threshold) return fCost; // @step:open-node

  visited.push([head[0], head[1]]); // @step:close-node

  if (head[0] === end[0] && head[1] === end[1]) return "FOUND"; // @step:trace-path

  let minimumExceeded = Infinity;

  for (const [deltaRow, deltaCol] of directions) {
    const neighborRow = head[0] + deltaRow;
    const neighborCol = head[1] + deltaCol;

    if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
      continue;
    if (grid[neighborRow][neighborCol].type === "wall") continue;
    if (onPath[neighborRow][neighborCol]) continue; // @step:open-node

    currentPath.push([neighborRow, neighborCol]); // @step:open-node
    onPath[neighborRow][neighborCol] = true; // @step:open-node

    const subResult = search(
      grid,
      currentPath,
      onPath,
      gCost + 1,
      threshold,
      end,
      visited,
      directions,
      rowCount,
      colCount,
    );

    if (subResult === "FOUND") return "FOUND";
    if ((subResult as number) < minimumExceeded) {
      minimumExceeded = subResult as number;
    }

    currentPath.pop(); // @step:close-node
    onPath[neighborRow][neighborCol] = false; // @step:close-node
  }

  return minimumExceeded;
}

function heuristic(rowA: number, colA: number, rowB: number, colB: number): number {
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}
