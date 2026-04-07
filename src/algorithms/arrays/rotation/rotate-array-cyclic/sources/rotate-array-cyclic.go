// Rotate Array (Cyclic Replacement) — O(n) time, O(1) space via cycle-following
package rotatearraycyclic

func rotateArrayCyclic(inputArray []int, rotateCount int) []int {
	result := make([]int, len(inputArray))
	copy(result, inputArray)
	arrayLength := len(result)

	if arrayLength == 0 {
		return result // @step:initialize
	}

	effectiveRotation := rotateCount % arrayLength // @step:initialize

	if effectiveRotation == 0 {
		return result // @step:initialize
	}

	cyclesCompleted := 0 // @step:initialize
	startIndex := 0      // @step:initialize

	// Follow each cycle: place every element at its rotated destination
	for cyclesCompleted < arrayLength {
		currentIndex := startIndex        // @step:visit
		carryValue := result[currentIndex] // @step:visit

		// Traverse the cycle until returning to the start index
		for {
			destinationIndex := (currentIndex + effectiveRotation) % arrayLength // @step:compare
			nextCarry := result[destinationIndex]                                 // @step:compare
			result[destinationIndex] = carryValue                                 // @step:swap
			carryValue = nextCarry                                                // @step:swap
			cyclesCompleted++                                                      // @step:swap
			currentIndex = destinationIndex                                        // @step:swap
			if currentIndex == startIndex { // @step:compare
				break
			}
		}

		startIndex++ // @step:visit
	}

	return result // @step:complete
}
