// Slow Sort — multiply-and-surrender: recursively find max of halves, swap to end, sort remainder
package main

func slowSortRange(sortedArray []int, startIndex, endIndex int) {
	if startIndex >= endIndex {
		return
	}

	midIndex := (startIndex + endIndex) / 2

	slowSortRange(sortedArray, startIndex, midIndex)   // Sort first half
	slowSortRange(sortedArray, midIndex+1, endIndex)   // Sort second half

	// Find the maximum of both halves (now at their respective ends)
	// @step:compare
	if sortedArray[midIndex] > sortedArray[endIndex] {
		// @step:swap
		sortedArray[midIndex], sortedArray[endIndex] = sortedArray[endIndex], sortedArray[midIndex] // @step:swap
	}

	// The maximum is now at endIndex — recursively sort the rest
	slowSortRange(sortedArray, startIndex, endIndex-1) // @step:mark-sorted
}

func slowSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize

	if len(sortedArray) > 0 {
		slowSortRange(sortedArray, 0, len(sortedArray)-1)
	}

	return sortedArray // @step:complete
}
