// Sleep Sort — simulated: each element's "delay" is its value, smaller values wake up first
package main

import "sort"

func sleepSort(inputArray []int) []int {
	// @step:initialize
	originalArray := make([]int, len(inputArray)) // @step:initialize
	copy(originalArray, inputArray)               // @step:initialize
	arrayLength := len(originalArray)             // @step:initialize

	// Simulate scheduling: sort elements by value (ascending delay order)
	// In real sleep sort, each element schedules itself with a timer based on its value
	// and outputs when its timer fires; smaller values fire first
	scheduledElements := make([]int, len(originalArray))
	copy(scheduledElements, originalArray)
	sort.Ints(scheduledElements) // @step:schedule

	outputArray := []int{} // @step:schedule

	// Elements "wake up" in order of their value (their simulated delay)
	for wakeIndex := 0; wakeIndex < arrayLength; wakeIndex++ {
		// @step:wake-up
		wakingValue := scheduledElements[wakeIndex] // @step:wake-up

		// Compare with next sleeping element to show scheduling relationship
		if wakeIndex+1 < arrayLength {
			// @step:compare
			_ = scheduledElements[wakeIndex+1] // @step:compare — next element still sleeping
		}

		outputArray = append(outputArray, wakingValue) // @step:swap
		// @step:mark-sorted
	}

	return outputArray // @step:complete
}
