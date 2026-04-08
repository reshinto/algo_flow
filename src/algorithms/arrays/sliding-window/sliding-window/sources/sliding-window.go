// Sliding Window — O(n) max-sum subarray by sliding instead of recomputing
package slidingwindow

func maxSumSubarray(inputArray []int, windowSize int) (maxSum int, windowStartIndex int) {
	if len(inputArray) == 0 || windowSize <= 0 || windowSize > len(inputArray) {
		// @step:initialize
		return 0, 0 // @step:initialize
	}

	// Compute the sum of the first window as the baseline
	currentSum := 0 // @step:move-window
	for initIndex := 0; initIndex < windowSize; initIndex++ { // @step:move-window
		currentSum += inputArray[initIndex] // @step:move-window
	}
	maxSum = currentSum
	windowStartIndex = 0

	// Slide the window: subtract left element, add right element
	for rightIndex := windowSize; rightIndex < len(inputArray); rightIndex++ {
		currentSum -= inputArray[rightIndex-windowSize] // @step:shrink-window
		currentSum += inputArray[rightIndex]            // @step:expand-window

		if currentSum > maxSum { // @step:compare
			maxSum = currentSum                              // @step:compare
			windowStartIndex = rightIndex - windowSize + 1  // @step:compare
		}
	}

	return maxSum, windowStartIndex // @step:complete
}
