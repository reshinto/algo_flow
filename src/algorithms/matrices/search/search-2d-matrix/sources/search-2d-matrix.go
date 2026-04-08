// Search a 2D Matrix (Binary Search)
// Matrix rows are sorted left-to-right; first integer of each row > last of previous.
// Treat as a virtual 1D sorted array and binary search.
// Time: O(log(m × n)) — single binary search over m×n elements
// Space: O(1) — no auxiliary data structures

package main

func search2DMatrix(matrix [][]int, target int) bool {
	if len(matrix) == 0 || len(matrix[0]) == 0 { return false } // @step:initialize

	rowCount := len(matrix)    // @step:initialize
	colCount := len(matrix[0]) // @step:initialize
	leftIdx := 0               // @step:initialize
	rightIdx := rowCount*colCount - 1 // @step:initialize

	for leftIdx <= rightIdx {
		midIndex := (leftIdx + rightIdx) / 2        // @step:compare-cell
		midRow := midIndex / colCount               // @step:compare-cell
		midCol := midIndex % colCount               // @step:compare-cell
		midValue := matrix[midRow][midCol]          // @step:compare-cell

		if midValue == target {
			return true // @step:mark-found
		} else if midValue < target {
			leftIdx = midIndex + 1 // @step:compare-cell
		} else {
			rightIdx = midIndex - 1 // @step:compare-cell
		}
	}

	return false // @step:complete
}
