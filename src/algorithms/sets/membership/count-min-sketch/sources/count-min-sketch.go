// Count-Min Sketch — probabilistic frequency estimation using a d×w counter matrix.
// Supports sub-linear space frequency estimation with one-sided error (never undercounts).
// Time: O(d) per insert/query — Space: O(d × w)

package main

import (
	"fmt"
	"math"
)

func computeSketchHash(value int, hashIdx int, width int) int {
	result := int(math.Abs(float64((value*(hashIdx*1327+31) + hashIdx*7919) % width)))
	return result // @step:hash-element
}

type EstimatedResult struct {
	value         int
	estimatedCount int
}

func countMinSketch(elements []int, queries []int, width int, depth int) []EstimatedResult {
	// Initialize d×w counter matrix with all zeros
	sketch := make([][]int, depth)
	for rowIdx := range sketch {
		sketch[rowIdx] = make([]int, width)
	}
	// @step:initialize

	// Insert phase: for each element, increment d counters
	for _, element := range elements {
		for hashIdx := 0; hashIdx < depth; hashIdx++ {
			col := computeSketchHash(element, hashIdx, width)
			sketch[hashIdx][col]++ // @step:increment-count
		}
	}

	// Query phase: estimate frequency by taking minimum across all d rows
	results := make([]EstimatedResult, 0)
	for _, query := range queries {
		minCount := math.MaxInt // @step:check-membership
		for hashIdx := 0; hashIdx < depth; hashIdx++ {
			col := computeSketchHash(query, hashIdx, width)
			if sketch[hashIdx][col] < minCount {
				minCount = sketch[hashIdx][col]
			}
		}
		estimatedCount := 0
		if minCount != math.MaxInt {
			estimatedCount = minCount
		}
		if estimatedCount > 0 {
			results = append(results, EstimatedResult{query, estimatedCount}) // @step:member-found
		} else {
			_ = query // @step:member-not-found
		}
	}

	return results // @step:complete
}

func main() {
	elements := []int{1, 2, 1, 3, 2, 1}
	queries := []int{1, 2, 3, 4}
	results := countMinSketch(elements, queries, 10, 3)
	for _, result := range results {
		fmt.Printf("value=%d count=%d\n", result.value, result.estimatedCount)
	}
}
