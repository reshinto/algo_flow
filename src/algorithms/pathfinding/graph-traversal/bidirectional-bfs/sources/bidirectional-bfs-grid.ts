// Bidirectional BFS — BFS from start and end simultaneously, meeting in the middle
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface BidirectionalBfsResult {
  path: [number, number][];
  visited: [number, number][];
}

function bidirectionalBfsGrid(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): BidirectionalBfsResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize

  if (start[0] === end[0] && start[1] === end[1]) {
    return { path: [start], visited: [start] }; // @step:complete
  }

  // Separate parent maps for forward and backward searches
  const forwardParent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const backwardParent: ([number, number] | null)[][] = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const forwardVisited = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize
  const backwardVisited = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize

  const forwardQueue: [number, number][] = [[start[0], start[1]]]; // @step:initialize,open-node
  const backwardQueue: [number, number][] = [[end[0], end[1]]]; // @step:initialize,open-node
  forwardVisited[start[0]][start[1]] = true; // @step:open-node
  backwardVisited[end[0]][end[1]] = true; // @step:open-node

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const allVisited: [number, number][] = [];

  while (forwardQueue.length > 0 || backwardQueue.length > 0) {
    // Expand forward frontier one step
    if (forwardQueue.length > 0) {
      const current = forwardQueue.shift()!; // @step:close-node
      const [currentRow, currentCol] = current; // @step:close-node
      allVisited.push([currentRow, currentCol]); // @step:close-node

      for (const [deltaRow, deltaCol] of directions) {
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
        if (forwardVisited[neighborRow][neighborCol]) continue;
        forwardVisited[neighborRow][neighborCol] = true; // @step:open-node
        forwardParent[neighborRow][neighborCol] = [currentRow, currentCol]; // @step:open-node
        forwardQueue.push([neighborRow, neighborCol]); // @step:open-node

        // Meeting point detected
        if (backwardVisited[neighborRow][neighborCol]) {
          const path = buildPath(
            forwardParent,
            backwardParent,
            [neighborRow, neighborCol],
            start,
            end,
          );
          return { path, visited: allVisited }; // @step:trace-path
        }
      }
    }

    // Expand backward frontier one step
    if (backwardQueue.length > 0) {
      const current = backwardQueue.shift()!; // @step:close-node
      const [currentRow, currentCol] = current; // @step:close-node
      allVisited.push([currentRow, currentCol]); // @step:close-node

      for (const [deltaRow, deltaCol] of directions) {
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
        if (backwardVisited[neighborRow][neighborCol]) continue;
        backwardVisited[neighborRow][neighborCol] = true; // @step:open-node
        backwardParent[neighborRow][neighborCol] = [currentRow, currentCol]; // @step:open-node
        backwardQueue.push([neighborRow, neighborCol]); // @step:open-node

        // Meeting point detected
        if (forwardVisited[neighborRow][neighborCol]) {
          const path = buildPath(
            forwardParent,
            backwardParent,
            [neighborRow, neighborCol],
            start,
            end,
          );
          return { path, visited: allVisited }; // @step:trace-path
        }
      }
    }
  }

  return { path: [], visited: allVisited }; // @step:complete
}

function buildPath(
  forwardParent: ([number, number] | null)[][],
  backwardParent: ([number, number] | null)[][],
  meetingPoint: [number, number],
  start: [number, number],
  end: [number, number],
): [number, number][] {
  // Build forward path: start → meeting point
  const forwardPath: [number, number][] = [];
  let current: [number, number] | null = meetingPoint;
  while (current !== null) {
    forwardPath.unshift(current);
    const parentRow = forwardParent[current[0]]?.[current[1]];
    current = parentRow ?? null;
  }
  void start;

  // Build backward path: meeting point → end
  const backwardPath: [number, number][] = [];
  current = backwardParent[meetingPoint[0]]?.[meetingPoint[1]] ?? null;
  while (current !== null) {
    backwardPath.push(current);
    const parentRow = backwardParent[current[0]]?.[current[1]];
    current = parentRow ?? null;
  }
  void end;

  return [...forwardPath, ...backwardPath];
}
