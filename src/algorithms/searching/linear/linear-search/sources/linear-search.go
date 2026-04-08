// Linear Search — scan left to right comparing each element with the target
package main

func linearSearch(array []int, targetValue int) int {
	// @step:initialize
	for currentIndex := 0; currentIndex < len(array); currentIndex++ {
		// @step:visit
		currentValue := array[currentIndex] // @step:compare
		if currentValue == targetValue {
			// @step:compare,found
			return currentIndex // @step:found
		}
	}

	return -1 // @step:complete
}
