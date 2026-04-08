// Minimum Subarray Sum — O(n) inverted Kadane's algorithm tracking minimum instead of maximum
package minimumsubarraysum

func minimumSubarraySum(inputArray []int) (minSum int, startIndex int, endIndex int) {
	if len(inputArray) == 0 {
		// @step:initialize
		return 0, 0, 0 // @step:initialize
	}

	minEndingHere := inputArray[0] // @step:initialize
	minSoFar := inputArray[0]      // @step:initialize
	currentStartIndex := 0
	bestStartIndex := 0
	bestEndIndex := 0

	// Extend the current subarray or restart from the current element
	for elementIndex := 1; elementIndex < len(inputArray); elementIndex++ {
		if inputArray[elementIndex] < minEndingHere+inputArray[elementIndex] { // @step:compare
			minEndingHere = inputArray[elementIndex]  // @step:compare
			currentStartIndex = elementIndex          // @step:compare
		} else {
			minEndingHere += inputArray[elementIndex] // @step:compare
		}

		if minEndingHere < minSoFar { // @step:compare
			minSoFar = minEndingHere          // @step:compare
			bestStartIndex = currentStartIndex // @step:compare
			bestEndIndex = elementIndex        // @step:compare
		}
	}

	return minSoFar, bestStartIndex, bestEndIndex // @step:complete
}
