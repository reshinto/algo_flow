// Dijkstra Bidirectional — two simultaneous Dijkstra searches meeting in the middle
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface BidirectionalResult {
  path: [number, number][];
  visited: [number, number][];
}

function dijkstraBidirectional(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): BidirectionalResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize

  // Forward search from start
  const forwardDistance = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  ); // @step:initialize
  forwardDistance[start[0]][start[1]] = 0; // @step:initialize
  const forwardParent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const forwardVisited = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize

  // Reverse search from end
  const reverseDistance = Array.from({ length: rowCount }, () =>
    new Array(colCount).fill(Infinity),
  ); // @step:initialize
  reverseDistance[end[0]][end[1]] = 0; // @step:initialize
  const reverseParent = Array.from({ length: rowCount }, () =>
    new Array<[number, number] | null>(colCount).fill(null),
  ); // @step:initialize
  const reverseVisited = Array.from({ length: rowCount }, () => new Array(colCount).fill(false)); // @step:initialize

  const forwardQueue: { row: number; col: number; dist: number }[] = [
    { row: start[0], col: start[1], dist: 0 },
  ]; // @step:initialize,open-node
  const reverseQueue: { row: number; col: number; dist: number }[] = [
    { row: end[0], col: end[1], dist: 0 },
  ]; // @step:initialize,open-node

  const directions: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const allVisited: [number, number][] = [];
  let bestCost = Infinity;
  let meetingPoint: [number, number] | null = null;

  while (forwardQueue.length > 0 || reverseQueue.length > 0) {
    // Alternate between forward and reverse searches
    if (forwardQueue.length > 0) {
      forwardQueue.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist); // @step:close-node
      const current = forwardQueue.shift()!; // @step:close-node
      if (!forwardVisited[current.row][current.col]) {
        forwardVisited[current.row][current.col] = true; // @step:close-node
        allVisited.push([current.row, current.col]); // @step:close-node

        // Check if this cell has been visited by reverse search
        if (reverseVisited[current.row][current.col]) {
          const totalCost =
            forwardDistance[current.row][current.col] + reverseDistance[current.row][current.col];
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingPoint = [current.row, current.col];
          }
        }

        for (const [deltaRow, deltaCol] of directions) {
          const neighborRow = current.row + deltaRow;
          const neighborCol = current.col + deltaCol;
          if (
            neighborRow < 0 ||
            neighborRow >= rowCount ||
            neighborCol < 0 ||
            neighborCol >= colCount
          )
            continue;
          if (grid[neighborRow][neighborCol].type === "wall") continue;
          if (forwardVisited[neighborRow][neighborCol]) continue;
          const newDist = forwardDistance[current.row][current.col] + 1;
          if (newDist < forwardDistance[neighborRow][neighborCol]) {
            forwardDistance[neighborRow][neighborCol] = newDist; // @step:open-node
            forwardParent[neighborRow][neighborCol] = [current.row, current.col];
            forwardQueue.push({ row: neighborRow, col: neighborCol, dist: newDist });
          }
        }
      }
    }

    if (reverseQueue.length > 0) {
      reverseQueue.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist); // @step:close-node
      const current = reverseQueue.shift()!; // @step:close-node
      if (!reverseVisited[current.row][current.col]) {
        reverseVisited[current.row][current.col] = true; // @step:close-node
        allVisited.push([current.row, current.col]); // @step:close-node

        // Check if this cell has been visited by forward search
        if (forwardVisited[current.row][current.col]) {
          const totalCost =
            forwardDistance[current.row][current.col] + reverseDistance[current.row][current.col];
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingPoint = [current.row, current.col];
          }
        }

        for (const [deltaRow, deltaCol] of directions) {
          const neighborRow = current.row + deltaRow;
          const neighborCol = current.col + deltaCol;
          if (
            neighborRow < 0 ||
            neighborRow >= rowCount ||
            neighborCol < 0 ||
            neighborCol >= colCount
          )
            continue;
          if (grid[neighborRow][neighborCol].type === "wall") continue;
          if (reverseVisited[neighborRow][neighborCol]) continue;
          const newDist = reverseDistance[current.row][current.col] + 1;
          if (newDist < reverseDistance[neighborRow][neighborCol]) {
            reverseDistance[neighborRow][neighborCol] = newDist; // @step:open-node
            reverseParent[neighborRow][neighborCol] = [current.row, current.col];
            reverseQueue.push({ row: neighborRow, col: neighborCol, dist: newDist });
          }
        }
      }
    }

    // Early termination when meeting point is found and queues can't improve it
    if (meetingPoint !== null) {
      const forwardMin = forwardQueue.length > 0 ? forwardQueue[0].dist : Infinity;
      const reverseMin = reverseQueue.length > 0 ? reverseQueue[0].dist : Infinity;
      if (forwardMin + reverseMin >= bestCost) break;
    }
  }

  if (meetingPoint === null) {
    return { path: [], visited: allVisited }; // @step:complete
  }

  // Reconstruct path: forward half + reverse half
  const forwardPath = reconstructPath(forwardParent, meetingPoint); // @step:trace-path
  const reversePath = reconstructReversePath(reverseParent, meetingPoint); // @step:trace-path
  const path = [...forwardPath, ...reversePath.slice(1)]; // @step:trace-path
  return { path, visited: allVisited }; // @step:trace-path
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

function reconstructReversePath(
  reverseParent: ([number, number] | null)[][],
  meetingPoint: [number, number],
): [number, number][] {
  const path: [number, number][] = [];
  let current: [number, number] | null = meetingPoint;
  while (current !== null) {
    path.push(current);
    current = reverseParent[current[0]][current[1]];
  }
  return path;
}
