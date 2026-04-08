// Counting Sort — O(n+k) sort by counting frequencies and reconstructing sorted order
package countingsort

func countingSort(inputArray []int) []int {
	if len(inputArray) == 0 {
		// @step:initialize
		return []int{} // @step:initialize
	}

	maxValue := inputArray[0] // @step:initialize
	for _, val := range inputArray {
		if val > maxValue {
			maxValue = val
		}
	}
	countArray := make([]int, maxValue+1) // @step:initialize

	// Count the frequency of each element
	for scanIndex := 0; scanIndex < len(inputArray); scanIndex++ {
		countArray[inputArray[scanIndex]]++ // @step:visit
	}

	// Reconstruct the sorted array from count frequencies
	sortedArray := []int{} // @step:compare
	for currentValue := 0; currentValue <= maxValue; currentValue++ {
		for repeatIndex := 0; repeatIndex < countArray[currentValue]; repeatIndex++ {
			sortedArray = append(sortedArray, currentValue) // @step:compare
		}
	}

	return sortedArray // @step:complete
}
