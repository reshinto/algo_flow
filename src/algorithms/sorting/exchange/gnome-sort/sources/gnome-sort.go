// Gnome Sort — move forward if in order, backward (swapping) if not
package main

func gnomeSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize
	position := 0                               // @step:initialize

	for position < arrayLength {
		if position == 0 {
			// @step:move-forward
			position++ // @step:move-forward
		} else {
			// @step:compare
			if sortedArray[position] >= sortedArray[position-1] {
				// Elements are in order — move forward
				// @step:move-forward
				position++ // @step:move-forward
			} else {
				// Elements are out of order — swap and step back
				// @step:swap
				sortedArray[position], sortedArray[position-1] = sortedArray[position-1], sortedArray[position] // @step:swap
				position-- // @step:swap
			}
		}
	}

	// All elements are in their sorted positions
	// @step:mark-sorted

	return sortedArray // @step:complete
}
