// Cube Sort — divide into cube-root-sized blocks, sort each, then merge all blocks together
package main

import "math"

func cubeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:initialize
	}

	// Compute block size as cube root of array length (minimum 1)
	blockSize := int(math.Ceil(math.Cbrt(float64(arrayLength)))) // @step:initialize
	if blockSize < 1 {
		blockSize = 1
	}

	// Phase 1: Insertion sort each block
	blockCount := (arrayLength + blockSize - 1) / blockSize
	for blockIndex := 0; blockIndex < blockCount; blockIndex++ {
		// @step:divide-block
		blockStart := blockIndex * blockSize // @step:divide-block
		blockEnd := blockStart + blockSize   // @step:divide-block
		if blockEnd > arrayLength {
			blockEnd = arrayLength
		}

		// Insertion sort within this block
		for outerIndex := blockStart + 1; outerIndex < blockEnd; outerIndex++ {
			currentValue := sortedArray[outerIndex] // @step:compare
			innerIndex := outerIndex - 1

			for innerIndex >= blockStart && sortedArray[innerIndex] > currentValue {
				// @step:swap
				sortedArray[innerIndex+1] = sortedArray[innerIndex] // @step:swap
				innerIndex--
			}
			sortedArray[innerIndex+1] = currentValue // @step:swap
		}
	}

	// Phase 2: Merge all sorted blocks using a k-way merge into a temporary array
	resultArray := make([]int, arrayLength)
	// Track the current position within each block
	blockPointers := make([]int, blockCount)
	for blockIndex := 0; blockIndex < blockCount; blockIndex++ {
		blockPointers[blockIndex] = blockIndex * blockSize
	}

	for resultIndex := 0; resultIndex < arrayLength; resultIndex++ {
		// @step:merge-blocks
		minimumValue := math.MaxInt64
		minimumBlock := -1

		for blockIndex := 0; blockIndex < blockCount; blockIndex++ {
			pointer := blockPointers[blockIndex]
			blockEnd := (blockIndex + 1) * blockSize
			if blockEnd > arrayLength {
				blockEnd = arrayLength
			}

			if pointer < blockEnd {
				// @step:compare
				if sortedArray[pointer] < minimumValue {
					// @step:compare
					minimumValue = sortedArray[pointer]
					minimumBlock = blockIndex
				}
			}
		}

		resultArray[resultIndex] = minimumValue // @step:merge-blocks
		if minimumBlock >= 0 {
			blockPointers[minimumBlock]++ // @step:merge-blocks
		}
	}

	// Copy result back
	for copyIndex := 0; copyIndex < arrayLength; copyIndex++ {
		sortedArray[copyIndex] = resultArray[copyIndex] // @step:mark-sorted
	}

	return sortedArray // @step:complete
}
