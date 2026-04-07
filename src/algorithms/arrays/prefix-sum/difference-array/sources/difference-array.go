// Difference Array — O(n + q) range updates via difference array and prefix sum reconstruction
package differencearray

func differenceArray(arrayLength int, updates [][3]int) []int {
	diffArray := make([]int, arrayLength+1) // @step:initialize
	result := make([]int, arrayLength)      // @step:initialize

	// Apply each range update [left, right, delta] to the difference array
	for updateIndex := 0; updateIndex < len(updates); updateIndex++ {
		leftBound := updates[updateIndex][0]  // @step:visit
		rightBound := updates[updateIndex][1] // @step:visit
		delta := updates[updateIndex][2]      // @step:visit
		diffArray[leftBound] += delta         // @step:compare
		if rightBound+1 < len(diffArray) {    // @step:compare
			diffArray[rightBound+1] -= delta // @step:compare
		}
	}

	// Reconstruct result via prefix sum of the difference array
	runningSum := 0 // @step:visit
	for scanIndex := 0; scanIndex < arrayLength; scanIndex++ {
		runningSum += diffArray[scanIndex] // @step:visit
		result[scanIndex] = runningSum     // @step:visit
	}

	return result // @step:complete
}
