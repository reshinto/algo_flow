// Lee Algorithm — BFS wavefront shortest path with distance numbering
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface LeeResult {
  path: [number, number][];
  visited: [number, number][];
}

function leeAlgorithm(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): LeeResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  // Wave number map: each cell gets the wavefront distance from start
  const waveMap = Array.from({ length: rowCount }, () => new Array(colCount).fill(-1)); // @step:initialize
  waveMap[start[0]][start[1]] = 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize

  // Phase 1: BFS wavefront expansion — label each reachable cell with its wave number
  const queue: [number, number][] = [[start[0], start[1]]]; // @step:initialize,open-node
  const visited: [number, number][] = [];

  while (queue.length > 0) {
    const current = queue.shift()!; // @step:close-node
    const [currentRow, currentCol] = current; // @step:close-node
    visited.push([currentRow, currentCol]); // @step:close-node
    const currentWave = waveMap[currentRow][currentCol]; // @step:close-node

    // Check if we reached the end — begin backtracking
    if (currentRow === end[0] && currentCol === end[1]) break; // @step:update-cost

    // Expand wavefront to 4-directional neighbors
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
      if (waveMap[neighborRow][neighborCol] !== -1) continue;
      // Stamp the neighbor with the next wave number
      waveMap[neighborRow][neighborCol] = currentWave + 1; // @step:update-cost
      parent[neighborRow][neighborCol] = [currentRow, currentCol];
      queue.push([neighborRow, neighborCol]); // @step:open-node
    }
  }

  if (waveMap[end[0]][end[1]] === -1) {
    return { path: [], visited }; // @step:complete
  }

  // Phase 2: Backtrack from end using parent pointers
  const path = reconstructPath(parent, end); // @step:trace-path
  return { path, visited }; // @step:trace-path
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
