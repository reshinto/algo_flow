// Power Set — Backtracking Generation
// Generates all 2^n subsets of the input elements by choosing to include or exclude each element.
// Time: O(n × 2^n) — generate 2^n subsets, each of length up to n
// Space: O(n × 2^n) — store all subsets

package main

import "fmt"

func backtrack(elements []int, startIdx int, currentSubset []int, result *[][]int) {
	subsetCopy := make([]int, len(currentSubset))
	copy(subsetCopy, currentSubset)
	*result = append(*result, subsetCopy) // @step:generate-subset

	for elemIdx := startIdx; elemIdx < len(elements); elemIdx++ {
		currentSubset = append(currentSubset, elements[elemIdx]) // @step:initialize
		backtrack(elements, elemIdx+1, currentSubset, result)    // recurse with next element
		currentSubset = currentSubset[:len(currentSubset)-1]     // @step:backtrack
	}
}

func powerSet(elements []int) [][]int {
	result := make([][]int, 0)      // @step:initialize
	currentSubset := make([]int, 0) // @step:initialize

	backtrack(elements, 0, currentSubset, &result) // @step:initialize
	return result                                   // @step:complete
}

func main() {
	elements := []int{1, 2, 3}
	result := powerSet(elements)
	fmt.Println(result)
}
