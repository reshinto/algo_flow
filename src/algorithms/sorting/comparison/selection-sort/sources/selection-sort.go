// Selection Sort — find minimum in unsorted portion and swap to front
package main

func selectionSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	for outerIndex := 0; outerIndex < arrayLength-1; outerIndex++ {
		// @step:outer-loop
		minimumIndex := outerIndex // @step:outer-loop

		// Scan the unsorted portion for the minimum element
		for innerIndex := outerIndex + 1; innerIndex < arrayLength; innerIndex++ {
			// @step:compare
			if sortedArray[innerIndex] < sortedArray[minimumIndex] {
				// @step:compare
				minimumIndex = innerIndex // @step:compare
			}
		}

		// Swap the minimum into position if it is not already there
		if minimumIndex != outerIndex {
			// @step:swap
			sortedArray[outerIndex], sortedArray[minimumIndex] = sortedArray[minimumIndex], sortedArray[outerIndex] // @step:swap
		}

		// The element at outerIndex is now permanently in its sorted position
		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
