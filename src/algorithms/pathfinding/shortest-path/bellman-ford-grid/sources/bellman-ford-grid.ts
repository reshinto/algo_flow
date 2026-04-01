// Bellman-Ford Grid — shortest path via V-1 edge relaxation iterations
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface BellmanFordResult {
  path: [number, number][];
  visited: [number, number][];
}

function bellmanFordGrid(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): BellmanFordResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const vertexCount = rowCount * colCount; // @step:initialize
  const distance = Array.from({ length: rowCount }, () => new Array(colCount).fill(Infinity)); // @step:initialize
  distance[start[0]][start[1]] = 0; // @step:initialize
  const parent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize

  // Collect all passable edges: (fromRow, fromCol) -> (toRow, toCol)
  const edges: [number, number, number, number][] = []; // @step:initialize
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      if (grid[rowIndex][colIndex].type === "wall") continue;
      for (const [deltaRow, deltaCol] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        const neighborRow = rowIndex + deltaRow;
        const neighborCol = colIndex + deltaCol;
        if (
          neighborRow < 0 ||
          neighborRow >= rowCount ||
          neighborCol < 0 ||
          neighborCol >= colCount
        )
          continue;
        if (grid[neighborRow][neighborCol].type === "wall") continue;
        edges.push([rowIndex, colIndex, neighborRow, neighborCol]);
      }
    }
  }

  // Relax all edges V-1 times
  for (let iteration = 0; iteration < vertexCount - 1; iteration++) {
    let updated = false;
    for (const [fromRow, fromCol, toRow, toCol] of edges) {
      if (distance[fromRow][fromCol] === Infinity) continue;
      const newDistance = distance[fromRow][fromCol] + 1; // @step:update-cost
      if (newDistance < distance[toRow][toCol]) {
        // @step:update-cost
        distance[toRow][toCol] = newDistance; // @step:update-cost
        parent[toRow][toCol] = [fromRow, fromCol];
        updated = true;
      }
    }
    if (!updated) break; // Early termination if no updates
  }

  // Collect visited cells (all cells that were reached with finite distance)
  const visited: [number, number][] = []; // @step:close-node
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      if (distance[rowIndex][colIndex] < Infinity) {
        visited.push([rowIndex, colIndex]); // @step:close-node
      }
    }
  }

  if (distance[end[0]][end[1]] === Infinity) {
    return { path: [], visited }; // @step:complete
  }

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
