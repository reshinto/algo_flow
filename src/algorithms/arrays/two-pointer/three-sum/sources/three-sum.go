// Three Sum — O(n^2) find all unique triplets that sum to zero using sort + two-pointer
package threesum

import "sort"

func threeSum(inputArray []int) [][]int {
	sortedArray := make([]int, len(inputArray))
	copy(sortedArray, inputArray)
	sort.Ints(sortedArray)          // @step:initialize
	arrayLength := len(sortedArray) // @step:initialize
	triplets := [][]int{}           // @step:initialize

	for anchorIndex := 0; anchorIndex < arrayLength-2; anchorIndex++ { // @step:visit
		// Skip duplicate anchor values to avoid duplicate triplets
		if anchorIndex > 0 && sortedArray[anchorIndex] == sortedArray[anchorIndex-1] { // @step:compare
			continue // @step:compare
		}

		leftPointer := anchorIndex + 1  // @step:visit
		rightPointer := arrayLength - 1 // @step:visit

		for leftPointer < rightPointer { // @step:compare
			currentSum := sortedArray[anchorIndex] + sortedArray[leftPointer] + sortedArray[rightPointer] // @step:compare

			if currentSum == 0 { // @step:compare
				triplets = append(triplets, []int{sortedArray[anchorIndex], sortedArray[leftPointer], sortedArray[rightPointer]}) // @step:visit

				// Advance both pointers and skip duplicates
				for leftPointer < rightPointer && sortedArray[leftPointer] == sortedArray[leftPointer+1] {
					leftPointer++ // @step:compare
				}
				for leftPointer < rightPointer && sortedArray[rightPointer] == sortedArray[rightPointer-1] {
					rightPointer-- // @step:compare
				}
				leftPointer++  // @step:visit
				rightPointer-- // @step:visit
			} else if currentSum < 0 {
				leftPointer++ // @step:visit
			} else {
				rightPointer-- // @step:visit
			}
		}
	}

	return triplets // @step:complete
}
