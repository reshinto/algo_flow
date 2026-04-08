// Binary Insertion Sort — use binary search to find position, then shift and insert
package main

func binaryInsertionSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	for outerIndex := 1; outerIndex < arrayLength; outerIndex++ {
		currentElement := sortedArray[outerIndex] // @step:binary-search
		searchLeft := 0                           // @step:binary-search
		searchRight := outerIndex - 1             // @step:binary-search

		// Binary search for the correct insertion position
		for searchLeft <= searchRight {
			midIndex := (searchLeft + searchRight) / 2 // @step:compare
			if currentElement < sortedArray[midIndex] {
				// @step:compare
				searchRight = midIndex - 1 // @step:compare
			} else {
				searchLeft = midIndex + 1 // @step:compare
			}
		}

		// Shift elements right to make room for currentElement
		shiftIndex := outerIndex - 1 // @step:swap
		for shiftIndex >= searchLeft {
			// @step:swap
			sortedArray[shiftIndex+1] = sortedArray[shiftIndex] // @step:swap
			shiftIndex--                                         // @step:swap
		}
		sortedArray[searchLeft] = currentElement // @step:swap

		// Element is now in its sorted position within the sorted prefix
		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
