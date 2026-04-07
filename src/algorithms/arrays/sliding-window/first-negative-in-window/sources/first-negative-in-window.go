// First Negative in Window — O(n) using a deque to track negative indices
package firstnegativeinwindow

func firstNegativeInWindow(inputArray []int, windowSize int) []int {
	arrayLength := len(inputArray)

	if arrayLength == 0 || windowSize <= 0 || windowSize > arrayLength {
		// @step:initialize
		return []int{} // @step:initialize
	}

	// Deque (slice) stores indices of negative numbers in current window
	negativeIndices := []int{} // @step:initialize
	result := []int{}

	// Process first window
	for initIndex := 0; initIndex < windowSize; initIndex++ { // @step:move-window
		if inputArray[initIndex] < 0 { // @step:move-window
			negativeIndices = append(negativeIndices, initIndex) // @step:move-window
		}
	}

	// Record result for first window
	if len(negativeIndices) > 0 {
		result = append(result, inputArray[negativeIndices[0]]) // @step:compare
	} else {
		result = append(result, 0) // @step:compare
	}

	// Slide window across remaining positions
	for rightIndex := windowSize; rightIndex < arrayLength; rightIndex++ {
		leftIndex := rightIndex - windowSize

		// Remove indices that are out of current window
		if len(negativeIndices) > 0 && negativeIndices[0] <= leftIndex { // @step:shrink-window
			negativeIndices = negativeIndices[1:] // @step:shrink-window
		}

		// Add new element if negative
		if inputArray[rightIndex] < 0 { // @step:expand-window
			negativeIndices = append(negativeIndices, rightIndex) // @step:expand-window
		}

		// Record first negative in current window (or 0 if none)
		if len(negativeIndices) > 0 {
			result = append(result, inputArray[negativeIndices[0]]) // @step:compare
		} else {
			result = append(result, 0) // @step:compare
		}
	}

	return result // @step:complete
}
