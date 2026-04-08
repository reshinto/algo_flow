// Jump Search — jump forward by sqrt(n) blocks, then linear scan within the block
package main

import "math"

func jumpSearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	arrayLength := len(sortedArray) // @step:initialize
	if arrayLength == 0 {
		return -1 // @step:initialize
	}

	blockSize := int(math.Floor(math.Sqrt(float64(arrayLength)))) // @step:initialize
	blockStart := 0                                                // @step:initialize
	jumpEnd := blockSize                                           // @step:initialize

	for jumpEnd < arrayLength && sortedArray[jumpEnd-1] < targetValue {
		// @step:visit
		blockStart = jumpEnd   // @step:visit
		jumpEnd += blockSize   // @step:visit
	}

	// Linear scan within the identified block
	scanEnd := jumpEnd // @step:compare
	if scanEnd > arrayLength {
		scanEnd = arrayLength
	}
	for currentIndex := blockStart; currentIndex < scanEnd; currentIndex++ {
		// @step:compare
		if sortedArray[currentIndex] == targetValue {
			// @step:compare,found
			return currentIndex // @step:found
		}
	}

	return -1 // @step:complete
}
