// Greedy Set Cover approximation
// Finds the minimum number of subsets that cover all elements of the universe.
// Time: O(n × m) where n = |universe|, m = |sets|
// Space: O(n + m) for the uncovered set and selected sets tracking

package main

import "fmt"

type SetCoverResult struct {
	selectedIndices []int
	selectedSets    [][]int
}

func setCover(universe []int, sets [][]int) SetCoverResult {
	uncovered := make(map[int]struct{})
	for _, element := range universe {
		uncovered[element] = struct{}{}
	}
	// @step:initialize

	selectedIndices := make([]int, 0)
	selectedSets := make([][]int, 0)

	for len(uncovered) > 0 {
		// @step:evaluate-set
		bestSetIdx := -1
		bestCoverage := 0

		for setIdx, candidateSet := range sets {
			coverage := 0
			for _, elem := range candidateSet {
				if _, exists := uncovered[elem]; exists {
					coverage++
				}
			}
			// @step:evaluate-set
			if coverage > bestCoverage {
				bestCoverage = coverage
				bestSetIdx = setIdx
			}
		}

		if bestSetIdx == -1 {
			break
		}

		chosenSet := sets[bestSetIdx]
		selectedIndices = append(selectedIndices, bestSetIdx) // @step:select-set
		selectedSets = append(selectedSets, chosenSet)

		for _, element := range chosenSet {
			delete(uncovered, element) // @step:cover-elements
		}
	}

	return SetCoverResult{selectedIndices, selectedSets} // @step:complete
}

func main() {
	universe := []int{1, 2, 3, 4, 5}
	sets := [][]int{{1, 2, 3}, {2, 4}, {3, 4, 5}, {4, 5}}
	result := setCover(universe, sets)
	fmt.Println("Selected indices:", result.selectedIndices)
}
