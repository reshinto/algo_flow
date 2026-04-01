// BFS Shortest Path — find shortest path on an unweighted grid using breadth-first search
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface BfsResult {
  path: [number, number][];
  visited: [number, number][];
}

function bfsShortestPath(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): BfsResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize
  // Seed the queue with the start cell
  const queue: [number, number][] = [[start[0], start[1]]]; // @step:initialize,open-node
  const visitedSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize,open-node
  visitedSet[start[0]][start[1]] = true; // @step:open-node

  while (queue.length > 0) {
    // Dequeue the front cell — BFS explores level by level
    const current = queue.shift()!; // @step:close-node
    const [currentRow, currentCol] = current; // @step:close-node
    visited.push([currentRow, currentCol]); // @step:close-node

    // Check if we reached the end
    if (currentRow === end[0] && currentCol === end[1]) {
      // @step:trace-path
      return { path: reconstructPath(parent, end), visited }; // @step:trace-path
    }

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
      if (visitedSet[neighborRow][neighborCol]) continue;
      // Mark visited immediately on enqueue to avoid duplicates
      visitedSet[neighborRow][neighborCol] = true; // @step:open-node
      parent[neighborRow][neighborCol] = [currentRow, currentCol]; // @step:open-node
      queue.push([neighborRow, neighborCol]); // @step:open-node
    }
  }
  return { path: [], visited }; // @step:complete
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
