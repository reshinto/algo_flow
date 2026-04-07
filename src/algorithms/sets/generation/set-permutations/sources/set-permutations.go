// Set Permutations
// Generates all n! orderings of a set using backtracking with in-place swaps.
// Time: O(n × n!) — n! permutations each of length n
// Space: O(n × n!) for the result, O(n) call stack depth

package main

import "fmt"

func permute(working []int, startIdx int, result *[][]int) {
	if startIdx == len(working) {
		permCopy := make([]int, len(working))
		copy(permCopy, working)
		*result = append(*result, permCopy) // @step:generate-permutation
		return
	}

	for swapIdx := startIdx; swapIdx < len(working); swapIdx++ {
		// Swap elements[startIdx] with elements[swapIdx]
		working[startIdx], working[swapIdx] = working[swapIdx], working[startIdx] // @step:backtrack
		permute(working, startIdx+1, result)
		// Restore original order
		working[startIdx], working[swapIdx] = working[swapIdx], working[startIdx] // @step:backtrack
	}
}

func setPermutations(elements []int) [][]int {
	result := make([][]int, 0)             // @step:initialize
	working := make([]int, len(elements))  // @step:initialize
	copy(working, elements)

	permute(working, 0, &result)
	return result // @step:complete
}

func main() {
	elements := []int{1, 2, 3}
	result := setPermutations(elements)
	fmt.Println(result)
}
