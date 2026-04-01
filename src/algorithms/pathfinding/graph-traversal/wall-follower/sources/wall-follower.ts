// Wall Follower — right-hand rule maze solving: always keep the right wall, follow it to the exit
interface GridCell {
  row: number;
  col: number;
  type: "empty" | "wall" | "start" | "end";
  state: string;
}

interface WallFollowerResult {
  path: [number, number][];
  visited: [number, number][];
}

// Direction indices: 0=up, 1=right, 2=down, 3=left
const DIRECTION_ROW = [-1, 0, 1, 0];
const DIRECTION_COL = [0, 1, 0, -1];

function wallFollower(
  grid: GridCell[][],
  start: [number, number],
  end: [number, number],
): WallFollowerResult {
  const rowCount = grid.length; // @step:initialize
  const colCount = grid[0]?.length ?? 0; // @step:initialize
  const path: [number, number][] = []; // @step:initialize
  const visited: [number, number][] = []; // @step:initialize

  let currentRow = start[0]; // @step:initialize
  let currentCol = start[1]; // @step:initialize
  // Start facing right (direction index 1)
  let facingDirection = 1; // @step:initialize
  const maxSteps = rowCount * colCount * 4; // @step:initialize

  for (let stepCount = 0; stepCount < maxSteps; stepCount++) {
    // @step:open-node
    path.push([currentRow, currentCol]); // @step:close-node
    visited.push([currentRow, currentCol]); // @step:close-node

    // Check if we reached the end
    if (currentRow === end[0] && currentCol === end[1]) {
      return { path, visited }; // @step:trace-path
    }

    // Right-hand rule: try to turn right first, then forward, then left, then back
    const rightDirection = (facingDirection + 1) % 4;
    const leftDirection = (facingDirection + 3) % 4;

    if (canMove(grid, currentRow, currentCol, rightDirection, rowCount, colCount)) {
      // Turn right and move
      facingDirection = rightDirection; // @step:open-node
      currentRow += DIRECTION_ROW[facingDirection]!; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]!; // @step:open-node
    } else if (canMove(grid, currentRow, currentCol, facingDirection, rowCount, colCount)) {
      // Move forward
      currentRow += DIRECTION_ROW[facingDirection]!; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]!; // @step:open-node
    } else if (canMove(grid, currentRow, currentCol, leftDirection, rowCount, colCount)) {
      // Turn left and move
      facingDirection = leftDirection; // @step:open-node
      currentRow += DIRECTION_ROW[facingDirection]!; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]!; // @step:open-node
    } else {
      // Turn back (180 degrees)
      facingDirection = (facingDirection + 2) % 4; // @step:open-node
      currentRow += DIRECTION_ROW[facingDirection]!; // @step:open-node
      currentCol += DIRECTION_COL[facingDirection]!; // @step:open-node
    }
  }

  return { path: [], visited }; // @step:complete
}

function canMove(
  grid: GridCell[][],
  row: number,
  col: number,
  direction: number,
  rowCount: number,
  colCount: number,
): boolean {
  const nextRow = row + DIRECTION_ROW[direction]!;
  const nextCol = col + DIRECTION_COL[direction]!;
  if (nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount) return false;
  return grid[nextRow][nextCol].type !== "wall";
}
