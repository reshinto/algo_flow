// Quick Sort (Lomuto partition) — pick last element as pivot, partition around it, recurse
package main

func partitionLomuto(arr []int, lowIndex, highIndex int) int {
	// @step:partition
	pivotValue := arr[highIndex]      // @step:partition
	partitionIndex := lowIndex - 1 // @step:partition

	for scanIndex := lowIndex; scanIndex < highIndex; scanIndex++ {
		// @step:compare
		if arr[scanIndex] <= pivotValue {
			// @step:compare
			partitionIndex++ // @step:swap
			arr[partitionIndex], arr[scanIndex] = arr[scanIndex], arr[partitionIndex] // @step:swap
		}
	}

	// Place pivot in its final sorted position
	arr[partitionIndex+1], arr[highIndex] = arr[highIndex], arr[partitionIndex+1] // @step:pivot-placed

	return partitionIndex + 1 // @step:pivot-placed
}

func quickSortRecursive(arr []int, lowIndex, highIndex int) {
	// @step:partition
	if lowIndex >= highIndex {
		return // @step:partition
	}

	pivotFinalIndex := partitionLomuto(arr, lowIndex, highIndex) // @step:pivot-placed

	quickSortRecursive(arr, lowIndex, pivotFinalIndex-1) // @step:partition
	quickSortRecursive(arr, pivotFinalIndex+1, highIndex) // @step:partition
}

func quickSortLomuto(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength > 0 {
		quickSortRecursive(sortedArray, 0, arrayLength-1) // @step:partition
	}

	return sortedArray // @step:complete
}
