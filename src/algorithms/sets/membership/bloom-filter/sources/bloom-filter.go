// Bloom Filter — Probabilistic Membership Data Structure
// Uses k hash functions to map elements into a bit array of size m.
// Insert: set k bit positions to 1. Query: check if all k positions are 1.
// False positives possible; false negatives impossible.
// Time: O(k) per operation — Space: O(m) for the bit array

package main

import (
	"fmt"
	"math"
)

func computeHashPositions(value int, hashCount int, size int) []int {
	positions := make([]int, 0, hashCount)
	for hashIdx := 0; hashIdx < hashCount; hashIdx++ {
		hash := int(math.Abs(float64((value*(hashIdx+1)*31 + hashIdx*17) % size)))
		positions = append(positions, hash)
	}
	return positions
}

type QueryResult struct {
	value int
	found bool
}

func bloomFilter(elements []int, queries []int, size int, hashCount int) []QueryResult {
	bitArray := make([]int, size) // @step:initialize

	// Insert phase: hash each element and set its bit positions
	for _, element := range elements {
		positions := computeHashPositions(element, hashCount, size) // @step:hash-element
		for _, position := range positions {
			bitArray[position] = 1 // @step:set-bit
		}
	}

	results := make([]QueryResult, 0)

	// Query phase: check if all bit positions for a query value are set
	for _, query := range queries {
		positions := computeHashPositions(query, hashCount, size) // @step:check-bit
		allBitsSet := true
		for _, position := range positions {
			if bitArray[position] != 1 {
				allBitsSet = false
				break
			}
		}

		if allBitsSet {
			results = append(results, QueryResult{query, true}) // @step:member-found
		} else {
			results = append(results, QueryResult{query, false}) // @step:member-not-found
		}
	}

	return results // @step:complete
}

func main() {
	elements := []int{1, 2, 3, 4, 5}
	queries := []int{3, 6}
	results := bloomFilter(elements, queries, 20, 3)
	for _, result := range results {
		fmt.Printf("value=%d found=%v\n", result.value, result.found)
	}
}
