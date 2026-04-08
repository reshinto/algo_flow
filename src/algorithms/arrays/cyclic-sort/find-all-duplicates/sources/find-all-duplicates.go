// Find All Duplicates — O(n) time, O(1) space via sign-negation index marking
package findallduplicates

func findAllDuplicates(inputArray []int) []int {
	result := make([]int, len(inputArray)) // @step:initialize
	copy(result, inputArray)
	duplicates := []int{} // @step:initialize

	// Mark visited positions by negating the value at the mapped index
	for scanIndex := 0; scanIndex < len(result); scanIndex++ {
		absVal := result[scanIndex]
		if absVal < 0 {
			absVal = -absVal
		}
		mappedIndex := absVal - 1 // @step:compare

		if result[mappedIndex] < 0 {
			// Already negative means we visited this index before — duplicate found
			originalVal := result[scanIndex]
			if originalVal < 0 {
				originalVal = -originalVal
			}
			duplicates = append(duplicates, originalVal) // @step:compare
		} else {
			result[mappedIndex] = -result[mappedIndex] // @step:swap
		}
	}

	return duplicates // @step:complete
}
