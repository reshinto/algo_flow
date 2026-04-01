// DFS Exploration — explore all reachable cells using iterative depth-first search with a stack
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface DfsExplorationResult {
  visited: [number, number][];
  maxDepth: number;
}

function dfsExploration(grid: GridCell[][], start: [number, number]): DfsExplorationResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const visitedSet = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  const visited: [number, number][] = []; // @step:initialize

  // Stack stores [row, col, depth] tuples for iterative DFS
  const stack: [number, number, number][] = [[start[0], start[1], 0]]; // @step:initialize,open-node
  visitedSet[start[0]][start[1]] = true; // @step:open-node
  let maxDepth = 0; // @step:initialize

  while (stack.length > 0) {
    // Pop from top of stack — DFS always expands the deepest unvisited cell
    const current = stack.pop()!; // @step:close-node
    const [currentRow, currentCol, currentDepth] = current; // @step:close-node
    visited.push([currentRow, currentCol]); // @step:close-node
    if (currentDepth > maxDepth) maxDepth = currentDepth; // @step:close-node

    // Explore 4-directional neighbors in reverse order for natural DFS snaking
    for (const [deltaRow, deltaCol] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const neighborRow = currentRow + deltaRow;
      const neighborCol = currentCol + deltaCol;
      if (neighborRow < 0 || neighborRow >= rowCount || neighborCol < 0 || neighborCol >= colCount)
        continue;
      if (grid[neighborRow][neighborCol].type === "wall") continue;
      if (visitedSet[neighborRow][neighborCol]) continue;
      visitedSet[neighborRow][neighborCol] = true; // @step:open-node
      stack.push([neighborRow, neighborCol, currentDepth + 1]); // @step:open-node
    }
  }

  return { visited, maxDepth }; // @step:complete
}
