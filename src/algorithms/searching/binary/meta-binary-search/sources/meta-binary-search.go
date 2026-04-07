// Meta Binary Search (One-Sided Binary Search) — uses bit manipulation to build position
package main

import "math"

func metaBinarySearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	arrayLength := len(sortedArray) // @step:initialize
	if arrayLength == 0 {
		return -1 // @step:initialize
	}

	bitCount := int(math.Floor(math.Log2(float64(arrayLength)))) // @step:initialize
	position := 0                                                  // @step:initialize

	for bitIndex := bitCount; bitIndex >= 0; bitIndex-- {
		// @step:compare
		newPosition := position | (1 << bitIndex) // @step:compare

		if newPosition < arrayLength && sortedArray[newPosition] <= targetValue {
			// @step:compare,eliminate
			position = newPosition // @step:eliminate
		}
	}

	if sortedArray[position] == targetValue {
		// @step:compare,found
		return position // @step:found
	}

	return -1 // @step:complete
}
