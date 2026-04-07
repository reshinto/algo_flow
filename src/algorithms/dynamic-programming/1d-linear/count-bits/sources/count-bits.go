// Count Bits tabulation — dp[i] = number of 1-bits in binary representation of i

package main

import "fmt"

func countBits(targetNumber int) []int {
	// @step:initialize
	dpTable := make([]int, targetNumber+1) // @step:initialize,fill-table
	// dp[0] = 0: zero has no set bits
	for bitIndex := 1; bitIndex <= targetNumber; bitIndex++ {
		// @step:compute-cell
		// Half the number shares all bits except possibly the LSB
		dpTable[bitIndex] = dpTable[bitIndex>>1] + (bitIndex & 1) // @step:compute-cell,read-cache
	}
	return dpTable // @step:complete
}

func main() {
	targetNumber := 5
	result := countBits(targetNumber)
	fmt.Printf("Count bits up to %d: %v\n", targetNumber, result)
}
