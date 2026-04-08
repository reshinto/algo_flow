// Circle Sort — recursively compare elements from outer edges toward center, repeat until no swaps
package main

func circleSortPass(sortedArray []int, leftIndex int, rightIndex int) bool {
	if leftIndex >= rightIndex {
		return false
	}

	swapped := false
	low := leftIndex
	high := rightIndex

	for low < high {
		// @step:compare
		if sortedArray[low] > sortedArray[high] {
			// @step:swap
			sortedArray[low], sortedArray[high] = sortedArray[high], sortedArray[low] // @step:swap
			swapped = true
		}
		low++
		high--
	}

	// If the midpoint element is reached (odd-length segment), compare it with one above
	if low == high {
		if sortedArray[low] > sortedArray[high+1] {
			// @step:swap
			sortedArray[low], sortedArray[high+1] = sortedArray[high+1], sortedArray[low] // @step:swap
			swapped = true
		}
	}

	midpoint := (leftIndex + rightIndex) / 2
	leftSwapped := circleSortPass(sortedArray, leftIndex, midpoint)
	rightSwapped := circleSortPass(sortedArray, midpoint+1, rightIndex)

	return swapped || leftSwapped || rightSwapped
}

func circleSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	// Repeat full passes until no swaps occur
	swapped := true
	for swapped {
		swapped = circleSortPass(sortedArray, 0, arrayLength-1)
	}

	return sortedArray // @step:complete
}
