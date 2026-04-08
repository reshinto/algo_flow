// Bogo Sort — randomly shuffle until sorted; uses seeded LCG PRNG for determinism
package main

func bogoSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize
	maxIterations := 100                        // @step:initialize

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

	shuffleArray := func() {
		// @step:shuffle
		for shuffleIndex := arrayLength - 1; shuffleIndex > 0; shuffleIndex-- {
			// @step:shuffle
			swapTarget := nextRandom() % (shuffleIndex + 1) // @step:shuffle
			sortedArray[shuffleIndex], sortedArray[swapTarget] = sortedArray[swapTarget], sortedArray[shuffleIndex] // @step:swap
		}
	}

	iterationCount := 0
	for !isSorted() && iterationCount < maxIterations {
		shuffleArray()
		iterationCount++
	}

	// @step:mark-sorted

	return sortedArray // @step:complete
}
