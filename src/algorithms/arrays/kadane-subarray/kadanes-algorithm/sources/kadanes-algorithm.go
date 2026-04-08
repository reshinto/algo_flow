// Kadane's Algorithm — O(n) maximum subarray sum via extend-or-restart decision
package kadanesalgorithm

func kadanesAlgorithm(inputArray []int) (maxSum int, startIndex int, endIndex int) {
	if len(inputArray) == 0 {
		// @step:initialize
		return 0, -1, -1 // @step:initialize
	}

	currentSum := inputArray[0] // @step:initialize
	globalMax := inputArray[0]  // @step:initialize
	currentStart := 0
	bestStart := 0
	bestEnd := 0

	for scanIndex := 1; scanIndex < len(inputArray); scanIndex++ {
		extendSum := currentSum + inputArray[scanIndex] // @step:compare
		restartSum := inputArray[scanIndex]             // @step:compare

		if restartSum > extendSum { // @step:compare
			currentSum = restartSum  // @step:shrink-window
			currentStart = scanIndex // @step:shrink-window
		} else {
			currentSum = extendSum // @step:expand-window
		}

		if currentSum > globalMax { // @step:visit
			globalMax = currentSum    // @step:visit
			bestStart = currentStart  // @step:visit
			bestEnd = scanIndex       // @step:visit
		}
	}

	return globalMax, bestStart, bestEnd // @step:complete
}
