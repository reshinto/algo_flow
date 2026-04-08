// Longest K-Distinct — O(n) variable sliding window with at-most K distinct elements
package longestkdistinct

func longestKDistinct(inputArray []int, maxDistinct int) (maxLength int, startIndex int) {
	arrayLength := len(inputArray)

	if arrayLength == 0 || maxDistinct <= 0 {
		// @step:initialize
		return 0, 0 // @step:initialize
	}

	frequencyMap := map[int]int{} // @step:initialize
	windowStart := 0
	maxLength = 0
	bestStart := 0

	for windowEnd := 0; windowEnd < arrayLength; windowEnd++ {
		incomingElement := inputArray[windowEnd]  // @step:expand-window
		frequencyMap[incomingElement]++            // @step:expand-window

		// Shrink from the left while distinct count exceeds maxDistinct
		for len(frequencyMap) > maxDistinct {
			outgoingElement := inputArray[windowStart]          // @step:shrink-window
			outgoingCount := frequencyMap[outgoingElement] - 1  // @step:shrink-window
			if outgoingCount == 0 {                             // @step:shrink-window
				delete(frequencyMap, outgoingElement)           // @step:shrink-window
			} else {
				frequencyMap[outgoingElement] = outgoingCount   // @step:shrink-window
			}
			windowStart++ // @step:shrink-window
		}

		currentLength := windowEnd - windowStart + 1 // @step:compare
		if currentLength > maxLength {               // @step:compare
			maxLength = currentLength  // @step:compare
			bestStart = windowStart    // @step:compare
		}
	}

	return maxLength, bestStart // @step:complete
}
