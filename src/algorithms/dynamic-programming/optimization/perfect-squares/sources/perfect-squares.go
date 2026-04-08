// Perfect Squares tabulation — find minimum number of perfect squares summing to n

package main

import (
	"fmt"
	"math"
)

func perfectSquares(targetNumber int) int {
	// @step:initialize
	dpTable := make([]int, targetNumber+1)
	for idx := range dpTable {
		dpTable[idx] = math.MaxInt32 // @step:initialize,fill-table
	}
	dpTable[0] = 0 // @step:fill-table
	// Fill each cell with the minimum number of perfect squares needed
	for cellIndex := 1; cellIndex <= targetNumber; cellIndex++ {
		// @step:compute-cell
		for squareRoot := 1; squareRoot*squareRoot <= cellIndex; squareRoot++ {
			// @step:read-cache
			prevIndex := cellIndex - squareRoot*squareRoot // @step:read-cache
			if dpTable[prevIndex] != math.MaxInt32 && dpTable[prevIndex]+1 < dpTable[cellIndex] {
				// @step:compute-cell
				dpTable[cellIndex] = dpTable[prevIndex] + 1 // @step:compute-cell
			}
		}
	}
	return dpTable[targetNumber] // @step:complete
}

func main() {
	targetNumber := 12
	result := perfectSquares(targetNumber)
	fmt.Printf("Perfect squares for %d: %d\n", targetNumber, result)
}
