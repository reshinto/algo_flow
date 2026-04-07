// Two Sum (Sorted Array) — O(n) two-pointer: converge from both ends toward the target sum
package twopointersum

func twoPointerSum(sortedArray []int, target int) (found bool, leftIndex int, rightIndex int) {
	leftPointer := 0                   // @step:initialize
	rightPointer := len(sortedArray) - 1 // @step:initialize

	for leftPointer < rightPointer {
		currentSum := sortedArray[leftPointer] + sortedArray[rightPointer] // @step:visit

		if currentSum == target { // @step:compare
			return true, leftPointer, rightPointer // @step:complete
		} else if currentSum < target { // @step:compare
			leftPointer++ // @step:visit
		} else {
			rightPointer-- // @step:visit
		}
	}

	return false, -1, -1 // @step:complete
}
