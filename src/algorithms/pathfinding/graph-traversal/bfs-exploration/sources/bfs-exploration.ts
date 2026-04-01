// BFS Exploration — explore all reachable cells layer-by-layer using breadth-first search
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface BfsExplorationResult {
  visited: [number, number][];
  layers: number;
}

function bfsExploration(grid: GridCell[][], start: [number, number]): BfsExplorationResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const visitedSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize

  // Seed the queue with the start cell and mark layer boundaries
  const queue: [number, number][] = [[start[0], start[1]]]; // @step:initialize,open-node
  visitedSet[start[0]][start[1]] = true; // @step:open-node
  let layerCount = 0; // @step:initialize

  while (queue.length > 0) {
    // Process the entire current layer before advancing depth
    const layerSize = queue.length; // @step:close-node
    layerCount += 1; // @step:close-node

    for (let offsetIndex = 0; offsetIndex < layerSize; offsetIndex++) {
      const current = queue.shift()!; // @step:close-node
      const [currentRow, currentCol] = current; // @step:close-node
      visited.push([currentRow, currentCol]); // @step:close-node

      // Explore 4-directional neighbors
      for (const [deltaRow, deltaCol] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        const neighborRow = currentRow + deltaRow;
        const neighborCol = currentCol + deltaCol;
        if (
          neighborRow < 0 ||
          neighborRow >= rowCount ||
          neighborCol < 0 ||
          neighborCol >= colCount
        )
          continue;
        if (grid[neighborRow][neighborCol].type === "wall") continue;
        if (visitedSet[neighborRow][neighborCol]) continue;
        visitedSet[neighborRow][neighborCol] = true; // @step:open-node
        queue.push([neighborRow, neighborCol]); // @step:open-node
      }
    }
  }

  return { visited, layers: layerCount }; // @step:complete
}
