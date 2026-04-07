// Bozo Sort — randomly swap two elements until sorted; uses seeded LCG PRNG for determinism
package main

func bozoSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize
	maxIterations := 200                        // @step:initialize

	// Seeded linear congruential generator for deterministic behavior
	seed := uint64(42) // @step:initialize
	nextRandom := func() int {
		seed = (seed*1103515245 + 12345) & 0x7fffffff
		return int(seed)
	}

	isSorted := func() bool {
		// @step:check-sorted
		for checkIndex := 0; checkIndex+1 < arrayLength; checkIndex++ {
			// @step:compare
			if sortedArray[checkIndex] > sortedArray[checkIndex+1] {
				// @step:compare
				return false // @step:compare
			}
		}
		return true // @step:check-sorted
	}

	iterationCount := 0
	for !isSorted() && iterationCount < maxIterations {
		// Pick two random distinct indices and swap them
		firstSwapIndex := nextRandom() % arrayLength  // @step:swap
		secondSwapIndex := nextRandom() % arrayLength // @step:swap

		if firstSwapIndex != secondSwapIndex {
			// @step:swap
			sortedArray[firstSwapIndex], sortedArray[secondSwapIndex] = sortedArray[secondSwapIndex], sortedArray[firstSwapIndex] // @step:swap
		}

		iterationCount++
	}

	return sortedArray // @step:complete
}
