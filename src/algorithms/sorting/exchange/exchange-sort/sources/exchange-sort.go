// Exchange Sort — for each element, compare with all subsequent elements and swap if out of order
package main

func exchangeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	for outerIndex := 0; outerIndex < arrayLength-1; outerIndex++ {
		for innerIndex := outerIndex + 1; innerIndex < arrayLength; innerIndex++ {
			// @step:compare
			if sortedArray[outerIndex] > sortedArray[innerIndex] {
				// @step:swap
				sortedArray[outerIndex], sortedArray[innerIndex] = sortedArray[innerIndex], sortedArray[outerIndex] // @step:swap
			}
		}

		// The element at outerIndex is now in its final sorted position
		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
