// Uniform Binary Search — precomputes delta lookup table for uniform jump sizes
package main

import "math"

func uniformBinarySearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	arrayLength := len(sortedArray) // @step:initialize
	if arrayLength == 0 {
		return -1 // @step:initialize
	}

	// Build the delta lookup table: delta[k] = ceil(delta[k-1] / 2)
	deltaTable := []int{} // @step:initialize
	deltaValue := int(math.Ceil(float64(arrayLength) / 2.0)) // @step:initialize
	deltaTable = append(deltaTable, deltaValue) // @step:initialize
	for deltaValue > 1 {
		// @step:initialize
		deltaValue = int(math.Ceil(float64(deltaValue) / 2.0)) // @step:initialize
		deltaTable = append(deltaTable, deltaValue)             // @step:initialize
	}
	// Ensure enough steps to reach any element in the array
	logLen := int(math.Ceil(math.Log2(float64(arrayLength)))) + 1
	if len(deltaTable) < logLen {
		// @step:initialize
		deltaTable = append(deltaTable, 1) // @step:initialize
	}

	firstDelta := 1
	if len(deltaTable) > 0 {
		firstDelta = deltaTable[0]
	}
	currentIndex := firstDelta - 1 // @step:initialize
	stepLevel := 0                  // @step:initialize

	for {
		// @step:compare
		currentValue := sortedArray[currentIndex] // @step:compare

		if currentValue == targetValue {
			// @step:compare,found
			return currentIndex // @step:found
		}

		stepLevel++ // @step:eliminate
		nextDelta := 0
		if stepLevel < len(deltaTable) {
			nextDelta = deltaTable[stepLevel]
		} // @step:eliminate

		if nextDelta == 0 {
			break // @step:eliminate
		}

		previousIndex := currentIndex // @step:eliminate
		if currentValue < targetValue {
			// @step:eliminate
			// Move right
			currentIndex += nextDelta // @step:eliminate
			if currentIndex >= arrayLength {
				currentIndex = arrayLength - 1 // @step:eliminate
			}
		} else {
			// @step:eliminate
			// Move left
			currentIndex -= nextDelta // @step:eliminate
			if currentIndex < 0 {
				currentIndex = 0 // @step:eliminate
			}
		}
		if currentIndex == previousIndex {
			break // @step:eliminate
		}
	}

	return -1 // @step:complete
}
