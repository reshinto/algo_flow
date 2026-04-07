// Unique Paths (Tabulation) — count distinct paths from top-left to bottom-right in a rows×columns grid

package main

import "fmt"

func uniquePaths(rows int, columns int) int {
	// @step:initialize
	dpTable := make([]int, columns) // @step:initialize,fill-table
	for idx := range dpTable {
		dpTable[idx] = 1
	}
	// First row is all 1s — only one way to reach any cell by moving right only
	for rowIndex := 1; rowIndex < rows; rowIndex++ {
		// @step:compute-cell
		for columnIndex := 1; columnIndex < columns; columnIndex++ {
			// @step:compute-cell
			dpTable[columnIndex] += dpTable[columnIndex-1] // @step:compute-cell,read-cache
		}
	}
	return dpTable[columns-1] // @step:complete
}

func main() {
	rows, columns := 3, 7
	result := uniquePaths(rows, columns)
	fmt.Printf("Unique paths in %dx%d grid: %d\n", rows, columns, result)
}
