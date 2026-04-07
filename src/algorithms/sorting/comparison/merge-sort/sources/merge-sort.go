// Merge Sort — divide array in half recursively, then merge sorted halves
package main

func mergeSortRecursive(arr []int, leftStart, rightEnd int) {
	// @step:divide
	if rightEnd-leftStart <= 1 {
		return // @step:divide
	}

	midPoint := (leftStart + rightEnd) / 2 // @step:divide

	mergeSortRecursive(arr, leftStart, midPoint) // @step:divide
	mergeSortRecursive(arr, midPoint, rightEnd)  // @step:divide

	// Merge the two sorted halves
	leftHalf := make([]int, midPoint-leftStart)          // @step:merge
	rightHalf := make([]int, rightEnd-midPoint)          // @step:merge
	copy(leftHalf, arr[leftStart:midPoint])              // @step:merge
	copy(rightHalf, arr[midPoint:rightEnd])              // @step:merge

	leftIndex := 0        // @step:merge
	rightIndex := 0       // @step:merge
	mergePosition := leftStart // @step:merge

	for leftIndex < len(leftHalf) && rightIndex < len(rightHalf) {
		// @step:compare
		if leftHalf[leftIndex] <= rightHalf[rightIndex] {
			// @step:compare
			arr[mergePosition] = leftHalf[leftIndex] // @step:swap
			leftIndex++                              // @step:swap
		} else {
			arr[mergePosition] = rightHalf[rightIndex] // @step:swap
			rightIndex++                               // @step:swap
		}
		mergePosition++ // @step:swap
	}

	for leftIndex < len(leftHalf) {
		// @step:merge
		arr[mergePosition] = leftHalf[leftIndex] // @step:merge
		leftIndex++                              // @step:merge
		mergePosition++                          // @step:merge
	}

	for rightIndex < len(rightHalf) {
		// @step:merge
		arr[mergePosition] = rightHalf[rightIndex] // @step:merge
		rightIndex++                               // @step:merge
		mergePosition++                            // @step:merge
	}
}

func mergeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	mergeSortRecursive(sortedArray, 0, arrayLength) // @step:divide

	return sortedArray // @step:complete
}
