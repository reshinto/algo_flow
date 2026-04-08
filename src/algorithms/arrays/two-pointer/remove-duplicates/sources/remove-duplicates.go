// Remove Duplicates from Sorted Array — O(n) two-pointer: write pointer tracks unique boundary
package removeduplicates

func removeDuplicates(sortedArray []int) (int, []int) {
	if len(sortedArray) == 0 {
		// @step:initialize
		return 0, []int{} // @step:initialize
	}

	result := make([]int, len(sortedArray))
	copy(result, sortedArray)
	writePointer := 0 // @step:initialize

	for readPointer := 1; readPointer < len(result); readPointer++ {
		if result[readPointer] != result[writePointer] { // @step:compare
			writePointer++                             // @step:swap
			result[writePointer] = result[readPointer] // @step:swap
		}
	}

	uniqueCount := writePointer + 1
	return uniqueCount, result[:uniqueCount] // @step:complete
}
