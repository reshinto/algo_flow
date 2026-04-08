// Dutch National Flag — O(n) 3-way partition using three pointers (low, mid, high)
package dutchnationalflag

func dutchNationalFlag(inputArray []int) []int {
	result := make([]int, len(inputArray))
	copy(result, inputArray)
	lowPointer := 0               // @step:initialize
	midPointer := 0               // @step:initialize
	highPointer := len(result) - 1 // @step:initialize

	for midPointer <= highPointer {
		currentValue := result[midPointer] // @step:compare

		if currentValue == 0 { // @step:compare
			result[lowPointer], result[midPointer] = result[midPointer], result[lowPointer] // @step:swap
			lowPointer++ // @step:visit
			midPointer++ // @step:visit
		} else if currentValue == 1 { // @step:compare
			midPointer++ // @step:visit
		} else {
			result[midPointer], result[highPointer] = result[highPointer], result[midPointer] // @step:swap
			highPointer-- // @step:visit
		}
	}

	return result // @step:complete
}
