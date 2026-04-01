// Flood Fill DFS — classic paint bucket fill using depth-first search (stack-based)
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface FloodFillResult {
  filled: [number, number][];
  count: number;
}

function floodFillDfs(grid: GridCell[][], start: [number, number]): FloodFillResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const filledSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  const filled: [number, number][] = []; // @step:initialize
  // Seed the stack with the start cell
  const stack: [number, number][] = [[start[0], start[1]]]; // @step:initialize,open-node
  filledSet[start[0]][start[1]] = true; // @step:open-node

  while (stack.length > 0) {
    // Pop the top cell — DFS dives deep before backtracking
    const current = stack.pop()!; // @step:close-node
    const [currentRow, currentCol] = current; // @step:close-node
    filled.push([currentRow, currentCol]); // @step:close-node

    // Explore 4-directional neighbors (up, down, left, right)
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
      if (filledSet[neighborRow][neighborCol]) continue;
      // Mark on push to avoid duplicates
      filledSet[neighborRow][neighborCol] = true; // @step:open-node
      stack.push([neighborRow, neighborCol]); // @step:open-node
    }
  }
  return { filled, count: filled.length }; // @step:complete
}
