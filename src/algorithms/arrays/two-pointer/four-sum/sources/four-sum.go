// Four Sum — finds all unique quadruplets summing to target via sorting and two-pointer reduction
package foursum

import "sort"

func fourSum(inputArray []int, target int) [][]int {
	sortedArray := make([]int, len(inputArray))
	copy(sortedArray, inputArray)
	sort.Ints(sortedArray)        // @step:initialize
	arrayLength := len(sortedArray) // @step:initialize
	quadruplets := [][]int{}      // @step:initialize

	for firstIndex := 0; firstIndex < arrayLength-3; firstIndex++ { // @step:visit
		if firstIndex > 0 && sortedArray[firstIndex] == sortedArray[firstIndex-1] { // @step:compare
			continue // @step:compare
		}

		for secondIndex := firstIndex + 1; secondIndex < arrayLength-2; secondIndex++ { // @step:visit
			if secondIndex > firstIndex+1 && sortedArray[secondIndex] == sortedArray[secondIndex-1] { // @step:compare
				continue // @step:compare
			}

			leftPointer := secondIndex + 1  // @step:visit
			rightPointer := arrayLength - 1 // @step:visit

			for leftPointer < rightPointer { // @step:compare
				currentSum := sortedArray[firstIndex] + sortedArray[secondIndex] +
					sortedArray[leftPointer] + sortedArray[rightPointer] // @step:compare

				if currentSum == target { // @step:compare
					quadruplets = append(quadruplets, []int{
						sortedArray[firstIndex], sortedArray[secondIndex],
						sortedArray[leftPointer], sortedArray[rightPointer],
					}) // @step:visit

					for leftPointer < rightPointer && sortedArray[leftPointer] == sortedArray[leftPointer+1] {
						leftPointer++ // @step:compare
					}
					for leftPointer < rightPointer && sortedArray[rightPointer] == sortedArray[rightPointer-1] {
						rightPointer-- // @step:compare
					}
					leftPointer++  // @step:visit
					rightPointer-- // @step:visit
				} else if currentSum < target {
					leftPointer++ // @step:visit
				} else {
					rightPointer-- // @step:visit
				}
			}
		}
	}

	return quadruplets // @step:complete
}
