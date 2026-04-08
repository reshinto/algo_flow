// Intro Sort — starts with Quick Sort, falls back to Heap Sort when depth limit exceeded,
// uses Insertion Sort for small partitions
package main

import "math"

const insertionSortThreshold = 16

func insertionSortSlice(sortedArray []int, sliceStart, sliceEnd int) {
	// @step:insertion-pass
	for outerIndex := sliceStart + 1; outerIndex <= sliceEnd; outerIndex++ {
		// @step:insertion-pass
		currentValue := sortedArray[outerIndex] // @step:insertion-pass
		innerIndex := outerIndex - 1            // @step:insertion-pass

		for innerIndex >= sliceStart && sortedArray[innerIndex] > currentValue {
			// @step:compare
			sortedArray[innerIndex+1] = sortedArray[innerIndex] // @step:swap
			innerIndex--                                        // @step:swap
		}
		sortedArray[innerIndex+1] = currentValue // @step:swap
	}
}

func heapifyIntro(sortedArray []int, heapSize, rootIndex int) {
	// @step:heapify
	largestIndex := rootIndex     // @step:heapify
	leftChild := 2*rootIndex + 1  // @step:heapify
	rightChild := 2*rootIndex + 2 // @step:heapify

	if leftChild < heapSize && sortedArray[leftChild] > sortedArray[largestIndex] {
		// @step:compare
		largestIndex = leftChild // @step:heapify
	}
	if rightChild < heapSize && sortedArray[rightChild] > sortedArray[largestIndex] {
		// @step:compare
		largestIndex = rightChild // @step:heapify
	}

	if largestIndex != rootIndex {
		// @step:swap
		sortedArray[rootIndex], sortedArray[largestIndex] = sortedArray[largestIndex], sortedArray[rootIndex] // @step:swap
		heapifyIntro(sortedArray, heapSize, largestIndex)                                                     // @step:heapify
	}
}

func heapSortSlice(sortedArray []int, sliceStart, sliceEnd int) {
	// @step:heapify
	sliceLength := sliceEnd - sliceStart + 1 // @step:heapify

	// Build max heap over the slice
	for buildIndex := sliceLength/2 - 1; buildIndex >= 0; buildIndex-- {
		// @step:heapify
		heapifyIntro(sortedArray, sliceLength, buildIndex) // @step:heapify
	}

	// Extract elements one by one
	for extractIndex := sliceLength - 1; extractIndex > 0; extractIndex-- {
		// @step:swap
		sortedArray[sliceStart], sortedArray[sliceStart+extractIndex] = sortedArray[sliceStart+extractIndex], sortedArray[sliceStart] // @step:swap
		heapifyIntro(sortedArray, extractIndex, 0)                                                                                    // @step:heapify
	}
}

func lomutoPartition(sortedArray []int, partitionStart, partitionEnd int) int {
	// @step:partition
	pivotValue := sortedArray[partitionEnd]    // @step:partition
	partitionIndex := partitionStart - 1 // @step:partition

	for scanIndex := partitionStart; scanIndex < partitionEnd; scanIndex++ {
		// @step:compare
		if sortedArray[scanIndex] <= pivotValue {
			// @step:compare
			partitionIndex++ // @step:swap
			sortedArray[partitionIndex], sortedArray[scanIndex] = sortedArray[scanIndex], sortedArray[partitionIndex] // @step:swap
		}
	}

	sortedArray[partitionIndex+1], sortedArray[partitionEnd] = sortedArray[partitionEnd], sortedArray[partitionIndex+1] // @step:swap
	return partitionIndex + 1                                                                                           // @step:partition
}

func introSortRecurse(sortedArray []int, rangeStart, rangeEnd, depthLimit int) {
	if rangeStart >= rangeEnd {
		return
	}
	rangeSize := rangeEnd - rangeStart + 1

	if rangeSize <= insertionSortThreshold {
		// @step:insertion-pass
		insertionSortSlice(sortedArray, rangeStart, rangeEnd) // @step:insertion-pass
		return
	}

	if depthLimit == 0 {
		// @step:heapify
		heapSortSlice(sortedArray, rangeStart, rangeEnd) // @step:heapify
		return
	}

	pivotIndex := lomutoPartition(sortedArray, rangeStart, rangeEnd) // @step:partition
	introSortRecurse(sortedArray, rangeStart, pivotIndex-1, depthLimit-1) // @step:partition
	introSortRecurse(sortedArray, pivotIndex+1, rangeEnd, depthLimit-1)   // @step:partition
}

func introSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:complete
	}

	depthLimit := 2 * int(math.Log2(float64(arrayLength))) // @step:initialize
	introSortRecurse(sortedArray, 0, arrayLength-1, depthLimit) // @step:partition

	// @step:mark-sorted
	return sortedArray // @step:complete
}
