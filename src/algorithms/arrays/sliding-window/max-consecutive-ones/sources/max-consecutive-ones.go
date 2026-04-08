// Max Consecutive Ones III — O(n) variable sliding window with at most k zero-flips
package maxconsecutiveones

func maxConsecutiveOnes(inputArray []int, maxFlips int) (maxLength int, startIndex int) {
	if len(inputArray) == 0 {
		// @step:initialize
		return 0, 0 // @step:initialize
	}

	leftPointer := 0 // @step:initialize
	zeroCount := 0
	maxLength = 0
	bestStartIndex := 0

	// Expand the right boundary of the window
	for rightPointer := 0; rightPointer < len(inputArray); rightPointer++ {
		if inputArray[rightPointer] == 0 {
			zeroCount++ // @step:expand-window
		}

		// Shrink from left when zero count exceeds the allowed flips
		for zeroCount > maxFlips { // @step:compare
			if inputArray[leftPointer] == 0 {
				zeroCount-- // @step:shrink-window
			}
			leftPointer++ // @step:shrink-window
		}

		windowLength := rightPointer - leftPointer + 1 // @step:compare
		if windowLength > maxLength {                   // @step:compare
			maxLength = windowLength          // @step:compare
			bestStartIndex = leftPointer      // @step:compare
		}
	}

	return maxLength, bestStartIndex // @step:complete
}
