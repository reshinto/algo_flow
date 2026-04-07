// Binary Indexed Tree (Fenwick Tree) — prefix sum queries and point updates
package main

func bitUpdate(bit []int, arrayLength int, bitIndex int, delta int) {
	for bitIndex <= arrayLength {
		bit[bitIndex] += delta // @step:update-segment
		bitIndex += bitIndex & -bitIndex
	}
}

func bitPrefixSum(bit []int, bitIndex int) int {
	totalSum := 0
	for bitIndex > 0 {
		totalSum += bit[bitIndex] // @step:compute-prefix
		bitIndex -= bitIndex & -bitIndex
	}
	return totalSum // @step:compute-prefix
}

func binaryIndexedTree(array []int, queries [][2]int) []int {
	arrayLength := len(array) // @step:initialize
	bit := make([]int, arrayLength+1) // @step:initialize

	// Build BIT from array (1-indexed)
	for pos, element := range array {
		bitUpdate(bit, arrayLength, pos+1, element) // @step:update-segment
	}

	results := []int{}
	for _, query := range queries {
		queryLow := query[0]
		queryHigh := query[1]
		// Range sum [queryLow, queryHigh] = prefix[queryHigh+1] - prefix[queryLow]
		rangeSumResult := bitPrefixSum(bit, queryHigh+1) - bitPrefixSum(bit, queryLow) // @step:query-range
		results = append(results, rangeSumResult)
	}
	return results // @step:complete
}
