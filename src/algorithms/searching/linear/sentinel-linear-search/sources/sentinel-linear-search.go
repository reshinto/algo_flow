// Sentinel Linear Search — eliminates the bounds check by placing the target at the end
package main

func sentinelLinearSearch(array []int, targetValue int) int {
	// @step:initialize
	arrayLength := len(array) // @step:initialize
	if arrayLength == 0 {
		return -1 // @step:initialize
	}

	workArray := make([]int, arrayLength)
	copy(workArray, array)

	lastElement := workArray[arrayLength-1]    // @step:initialize
	workArray[arrayLength-1] = targetValue     // @step:initialize — place sentinel

	currentIndex := 0 // @step:initialize

	for workArray[currentIndex] != targetValue {
		// @step:visit
		currentIndex++ // @step:visit
	}

	workArray[arrayLength-1] = lastElement // @step:compare — restore last element

	if currentIndex < arrayLength-1 || lastElement == targetValue {
		// @step:compare,found
		return currentIndex // @step:found
	}

	return -1 // @step:complete
}
