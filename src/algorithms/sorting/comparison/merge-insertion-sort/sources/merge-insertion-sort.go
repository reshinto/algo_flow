// Merge Insertion Sort (Ford-Johnson) — theoretically optimal comparisons; pair elements, sort larger half recursively, binary-insert smaller half
package main

func binarySearchInsertionPoint(targetValue int, searchArray []int, leftBound, rightBound int) int {
	// @step:binary-insert
	low := leftBound
	high := rightBound

	for low < high {
		midPoint := (low + high) / 2 // @step:binary-insert
		if searchArray[midPoint] < targetValue {
			// @step:binary-insert
			low = midPoint + 1
		} else {
			high = midPoint
		}
	}
	return low // @step:binary-insert
}

func insertAt(sortedArray []int, targetValue, insertionIndex, endIndex int) {
	// @step:binary-insert
	for shiftIndex := endIndex; shiftIndex > insertionIndex; shiftIndex-- {
		sortedArray[shiftIndex] = sortedArray[shiftIndex-1] // @step:swap
	}
	sortedArray[insertionIndex] = targetValue // @step:binary-insert
}

func mergeInsertionSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:initialize
	}

	// Step 1: Pair elements and compare each pair to identify larger and smaller elements
	pairCount := arrayLength / 2
	hasUnpaired := arrayLength%2 == 1

	// Sort within each pair so sortedArray[2k] >= sortedArray[2k+1]
	for pairIndex := 0; pairIndex < pairCount; pairIndex++ {
		// @step:pair
		leftPos := pairIndex * 2 // @step:compare
		rightPos := leftPos + 1  // @step:compare

		if sortedArray[leftPos] < sortedArray[rightPos] {
			// @step:compare
			sortedArray[leftPos], sortedArray[rightPos] = sortedArray[rightPos], sortedArray[leftPos] // @step:swap
		}
	}

	// Step 2: Extract the larger elements (at even indices) and sort them
	largerElements := make([]int, 0, pairCount)
	smallerElements := make([]int, 0, pairCount+1)

	for pairIndex := 0; pairIndex < pairCount; pairIndex++ {
		largerElements = append(largerElements, sortedArray[pairIndex*2])     // @step:pair
		smallerElements = append(smallerElements, sortedArray[pairIndex*2+1]) // @step:pair
	}
	if hasUnpaired {
		smallerElements = append(smallerElements, sortedArray[arrayLength-1]) // @step:pair
	}

	// Recursively sort the larger elements using insertion sort
	for insertIndex := 1; insertIndex < len(largerElements); insertIndex++ {
		currentValue := largerElements[insertIndex] // @step:compare
		innerIndex := insertIndex - 1

		for innerIndex >= 0 && largerElements[innerIndex] > currentValue {
			// @step:compare
			largerElements[innerIndex+1] = largerElements[innerIndex] // @step:swap
			innerIndex--
		}
		largerElements[innerIndex+1] = currentValue // @step:binary-insert
	}

	// Step 3: Build the initial sorted sequence from larger elements
	resultLength := len(largerElements)
	for resultIndex := 0; resultIndex < resultLength; resultIndex++ {
		sortedArray[resultIndex] = largerElements[resultIndex] // @step:binary-insert
	}

	insertedCount := resultLength

	// Insert the smaller elements using binary insertion
	for smallerIndex := 0; smallerIndex < len(smallerElements); smallerIndex++ {
		valueToInsert := smallerElements[smallerIndex] // @step:binary-insert
		searchBound := insertedCount                   // @step:binary-insert

		insertionPosition := binarySearchInsertionPoint(valueToInsert, sortedArray[:searchBound], 0, searchBound) // @step:compare

		insertAt(sortedArray, valueToInsert, insertionPosition, insertedCount) // @step:binary-insert
		insertedCount++
	}

	// @step:mark-sorted

	return sortedArray // @step:complete
}
