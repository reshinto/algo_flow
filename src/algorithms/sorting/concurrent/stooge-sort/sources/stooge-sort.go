// Stooge Sort — recursive: swap first/last if needed, sort first 2/3, last 2/3, first 2/3 again
package main

func stoogeSortRange(sortedArray []int, startIndex, endIndex int) {
	if startIndex >= endIndex {
		return
	}

	// @step:compare
	if sortedArray[startIndex] > sortedArray[endIndex] {
		// @step:swap
		sortedArray[startIndex], sortedArray[endIndex] = sortedArray[endIndex], sortedArray[startIndex] // @step:swap
	}

	rangeLength := endIndex - startIndex + 1
	if rangeLength > 2 {
		thirdLength := rangeLength / 3

		stoogeSortRange(sortedArray, startIndex, endIndex-thirdLength)    // Sort first 2/3
		stoogeSortRange(sortedArray, startIndex+thirdLength, endIndex)    // Sort last 2/3
		stoogeSortRange(sortedArray, startIndex, endIndex-thirdLength)    // Sort first 2/3 again
	}
}

func stoogeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize

	if len(sortedArray) > 0 {
		stoogeSortRange(sortedArray, 0, len(sortedArray)-1)
	}

	// @step:mark-sorted

	return sortedArray // @step:complete
}
