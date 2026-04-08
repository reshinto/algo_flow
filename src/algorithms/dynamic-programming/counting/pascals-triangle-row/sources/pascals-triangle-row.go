// Pascal's Triangle Row (Tabulation) — build one row using in-place right-to-left updates

package main

import "fmt"

func pascalsTriangleRow(rowIndex int) []int {
	// @step:initialize
	dpTable := make([]int, rowIndex+1) // @step:initialize,fill-table
	for idx := range dpTable {
		dpTable[idx] = 1
	}
	// Iterate each row from 2 up to rowIndex, updating right-to-left
	for rowNumber := 2; rowNumber <= rowIndex; rowNumber++ {
		// @step:compute-cell
		for columnIndex := rowNumber - 1; columnIndex >= 1; columnIndex-- {
			// @step:compute-cell,read-cache
			dpTable[columnIndex] += dpTable[columnIndex-1] // @step:compute-cell,read-cache
		}
	}
	return dpTable // @step:complete
}

func main() {
	rowIndex := 4
	result := pascalsTriangleRow(rowIndex)
	fmt.Printf("Pascal's triangle row %d: %v\n", rowIndex, result)
}
