// Cyclic Sort — O(n) sort for arrays containing values 1..n by placing each at index value-1
package cyclicsort

func cyclicSort(inputArray []int) []int {
	result := make([]int, len(inputArray)) // @step:initialize
	copy(result, inputArray)
	currentIndex := 0 // @step:initialize

	for currentIndex < len(result) {
		currentValue := result[currentIndex]  // @step:compare
		correctIndex := currentValue - 1      // @step:compare

		if correctIndex >= 0 &&
			correctIndex < len(result) &&
			correctIndex != currentIndex &&
			result[correctIndex] != currentValue {
			// @step:compare
			result[currentIndex], result[correctIndex] = result[correctIndex], result[currentIndex] // @step:swap
		} else {
			currentIndex++ // @step:visit
		}
	}

	return result // @step:complete
}
