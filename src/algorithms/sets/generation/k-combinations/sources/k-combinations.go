// K-Combinations — Backtracking Generation
// Generates all C(n,k) subsets of exactly k elements from the input array.
// Time: O(k × C(n,k)) — generate C(n,k) combinations, each of length k
// Space: O(k × C(n,k)) — store all combinations

package main

import "fmt"

func backtrack(elements []int, chooseK int, startIdx int, currentSubset []int, result *[][]int) {
	if len(currentSubset) == chooseK {
		subsetCopy := make([]int, len(currentSubset))
		copy(subsetCopy, currentSubset)
		*result = append(*result, subsetCopy) // @step:generate-subset
		return
	}

	for elemIdx := startIdx; elemIdx < len(elements); elemIdx++ {
		currentSubset = append(currentSubset, elements[elemIdx]) // @step:initialize
		backtrack(elements, chooseK, elemIdx+1, currentSubset, result)
		currentSubset = currentSubset[:len(currentSubset)-1] // @step:backtrack
	}
}

func kCombinations(elements []int, chooseK int) [][]int {
	result := make([][]int, 0)      // @step:initialize
	currentSubset := make([]int, 0) // @step:initialize

	backtrack(elements, chooseK, 0, currentSubset, &result) // @step:initialize
	return result                                            // @step:complete
}

func main() {
	elements := []int{1, 2, 3, 4, 5}
	result := kCombinations(elements, 3)
	fmt.Println(result)
}
