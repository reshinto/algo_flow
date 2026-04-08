// Valid Sudoku (LeetCode 36)
// Determine if a 9×9 Sudoku board is valid.
// Each row, column, and 3×3 sub-box must contain no duplicate digits 1-9.
// Empty cells are represented by 0.
// Time: O(1) — fixed 9×9 board
// Space: O(1) — fixed-size sets

package main

func validSudoku(board [][]int) bool {
	rowsSeen := make([]map[int]bool, 9)   // @step:initialize
	colsSeen := make([]map[int]bool, 9)   // @step:initialize
	boxesSeen := make([]map[int]bool, 9)  // @step:initialize
	for idx := 0; idx < 9; idx++ {
		rowsSeen[idx] = make(map[int]bool)
		colsSeen[idx] = make(map[int]bool)
		boxesSeen[idx] = make(map[int]bool)
	}

	for rowIdx := 0; rowIdx < 9; rowIdx++ {
		for colIdx := 0; colIdx < 9; colIdx++ {
			digitValue := board[rowIdx][colIdx] // @step:compare-cell

			if digitValue == 0 { continue } // @step:compare-cell

			boxIdx := (rowIdx/3)*3 + (colIdx / 3) // @step:compare-cell

			if rowsSeen[rowIdx][digitValue] ||
				colsSeen[colIdx][digitValue] ||
				boxesSeen[boxIdx][digitValue] {
				return false // @step:mark-found
			}

			rowsSeen[rowIdx][digitValue] = true  // @step:compare-cell
			colsSeen[colIdx][digitValue] = true  // @step:compare-cell
			boxesSeen[boxIdx][digitValue] = true // @step:compare-cell
		}
	}

	return true // @step:complete
}
