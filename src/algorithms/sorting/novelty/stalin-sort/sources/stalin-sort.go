// Stalin Sort — eliminate any element smaller than the current maximum; returns only surviving elements
package main

func stalinSort(inputArray []int) []int {
	// @step:initialize
	originalArray := make([]int, len(inputArray)) // @step:initialize
	copy(originalArray, inputArray)               // @step:initialize
	arrayLength := len(originalArray)             // @step:initialize

	if arrayLength == 0 {
		return []int{} // @step:complete
	}

	survivingElements := []int{originalArray[0]} // @step:initialize — first element always survives
	currentMaximum := originalArray[0]           // @step:initialize

	for scanIndex := 1; scanIndex < arrayLength; scanIndex++ {
		candidateValue := originalArray[scanIndex]

		// @step:compare
		if candidateValue >= currentMaximum {
			// Element is in order — keep it
			currentMaximum = candidateValue                           // @step:compare
			survivingElements = append(survivingElements, candidateValue) // @step:compare — keep
		}
		// Otherwise the element is eliminated (out of order)
		// @step:compare — eliminate
	}

	return survivingElements // @step:complete
}
