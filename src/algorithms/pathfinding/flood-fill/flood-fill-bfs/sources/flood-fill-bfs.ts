// Flood Fill BFS — classic paint bucket fill using breadth-first search
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

function floodFillBfs(grid: GridCell[][], start: [number, number]): FloodFillResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const filledSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  const filled: [number, number][] = []; // @step:initialize
  // Seed the queue with the start cell
  const queue: [number, number][] = [[start[0], start[1]]]; // @step:initialize,open-node
  filledSet[start[0]][start[1]] = true; // @step:open-node

  while (queue.length > 0) {
    // Dequeue the front cell — BFS processes cells level by level
    const current = queue.shift()!; // @step:close-node
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
      // Mark on enqueue to avoid duplicates
      filledSet[neighborRow][neighborCol] = true; // @step:open-node
      queue.push([neighborRow, neighborCol]); // @step:open-node
    }
  }
  return { filled, count: filled.length }; // @step:complete
}
