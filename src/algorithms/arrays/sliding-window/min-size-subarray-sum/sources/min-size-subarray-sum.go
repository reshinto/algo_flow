// Min Size Subarray Sum — O(n) variable sliding window to find shortest subarray with sum >= target
package minsizesubarraysum

import "math"

func minSizeSubarraySum(inputArray []int, target int) (minLength int, startIndex int) {
	if len(inputArray) == 0 || target <= 0 {
		// @step:initialize
		return 0, 0 // @step:initialize
	}

	leftPointer := 0 // @step:initialize
	currentSum := 0
	minLength = math.MaxInt64
	bestStartIndex := 0

	// Expand the right boundary of the window
	for rightPointer := 0; rightPointer < len(inputArray); rightPointer++ {
		currentSum += inputArray[rightPointer] // @step:expand-window

		// Shrink from the left while the sum constraint is satisfied
		for currentSum >= target { // @step:compare
			windowLength := rightPointer - leftPointer + 1 // @step:compare
			if windowLength < minLength {                   // @step:compare
				minLength = windowLength          // @step:compare
				bestStartIndex = leftPointer      // @step:compare
			}
			currentSum -= inputArray[leftPointer] // @step:shrink-window
			leftPointer++                          // @step:shrink-window
		}
	}

	if minLength == math.MaxInt64 {
		return 0, 0 // @step:complete
	}
	return minLength, bestStartIndex // @step:complete
}
