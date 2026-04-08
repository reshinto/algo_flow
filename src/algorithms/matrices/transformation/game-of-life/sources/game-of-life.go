// Conway's Game of Life — One Step Simulation
// Updates all cells simultaneously based on neighbor counts using in-place encoding.
// Encoding: current bit = value & 1, next bit = (value >> 1) & 1
// Time: O(m × n) — every cell visited twice
// Space: O(1) — in-place using bit encoding

package main

func countLiveNeighbors(board [][]int, rowIdx int, colIdx int, rowCount int, colCount int) int {
	directions := [][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1},            {0, 1},
		{1, -1},  {1, 0},  {1, 1},
	}
	liveCount := 0
	for _, dir := range directions {
		neighborRow := rowIdx + dir[0]
		neighborCol := colIdx + dir[1]
		if neighborRow >= 0 && neighborRow < rowCount &&
			neighborCol >= 0 && neighborCol < colCount {
			// Use & 1 to read original state (lower bit) even if already encoded
			liveCount += board[neighborRow][neighborCol] & 1
		}
	}
	return liveCount
}

func gameOfLife(board [][]int) [][]int {
	rowCount := len(board) // @step:initialize
	colCount := 0
	if rowCount > 0 {
		colCount = len(board[0])
	} // @step:initialize

	// Phase 1: Encode next state in higher bits
	for rowIdx := 0; rowIdx < rowCount; rowIdx++ {
		// @step:mark-cell
		for colIdx := 0; colIdx < colCount; colIdx++ {
			// @step:mark-cell
			neighborCount := countLiveNeighbors(board, rowIdx, colIdx, rowCount, colCount) // @step:mark-cell
			currentState := board[rowIdx][colIdx] & 1                                      // @step:mark-cell

			nextState := 0 // @step:mark-cell
			if currentState == 1 && (neighborCount == 2 || neighborCount == 3) {
				// @step:mark-cell
				nextState = 1 // @step:mark-cell
			} else if currentState == 0 && neighborCount == 3 {
				// @step:mark-cell
				nextState = 1 // @step:mark-cell
			}

			// Encode next state into bit 1 (shift left by 1)
			board[rowIdx][colIdx] |= nextState << 1 // @step:mark-cell
		}
	}

	// Phase 2: Decode final state by right-shifting
	for rowIdx := 0; rowIdx < rowCount; rowIdx++ {
		// @step:flip-cell
		for colIdx := 0; colIdx < colCount; colIdx++ {
			// @step:flip-cell
			board[rowIdx][colIdx] >>= 1 // @step:flip-cell
		}
	}

	return board // @step:complete
}
