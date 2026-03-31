// Conway's Game of Life — One Step Simulation
// Updates all cells simultaneously based on neighbor counts using in-place encoding.
// Encoding: current bit = value & 1, next bit = (value >> 1) & 1
// Time: O(m × n) — every cell visited twice
// Space: O(1) — in-place using bit encoding

function gameOfLife(board: number[][]): number[][] {
  const rowCount = board.length; // @step:initialize
  const colCount = board[0]?.length ?? 0; // @step:initialize

  // Phase 1: Encode next state in higher bits
  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    // @step:mark-cell
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      // @step:mark-cell
      const neighborCount = countLiveNeighbors(board, rowIdx, colIdx, rowCount, colCount); // @step:mark-cell
      const currentState = board[rowIdx]![colIdx]! & 1; // @step:mark-cell

      let nextState = 0; // @step:mark-cell
      if (currentState === 1 && (neighborCount === 2 || neighborCount === 3)) {
        // @step:mark-cell
        nextState = 1; // @step:mark-cell
      } else if (currentState === 0 && neighborCount === 3) {
        // @step:mark-cell
        nextState = 1; // @step:mark-cell
      }

      // Encode next state into bit 1 (shift left by 1)
      board[rowIdx]![colIdx] |= nextState << 1; // @step:mark-cell
    }
  }

  // Phase 2: Decode final state by right-shifting
  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    // @step:flip-cell
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      // @step:flip-cell
      board[rowIdx]![colIdx] >>= 1; // @step:flip-cell
    }
  }

  return board; // @step:complete
}

function countLiveNeighbors(
  board: number[][],
  rowIdx: number,
  colIdx: number,
  rowCount: number,
  colCount: number,
): number {
  const directions: [number, number][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let liveCount = 0;
  for (const [rowDelta, colDelta] of directions) {
    const neighborRow = rowIdx + rowDelta;
    const neighborCol = colIdx + colDelta;
    if (neighborRow >= 0 && neighborRow < rowCount && neighborCol >= 0 && neighborCol < colCount) {
      // Use & 1 to read original state (lower bit) even if already encoded
      liveCount += board[neighborRow]![neighborCol]! & 1;
    }
  }
  return liveCount;
}
