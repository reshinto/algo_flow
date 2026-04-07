// Interpolation Search — estimate position using value distribution, not just midpoint
package main

func interpolationSearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	lowIndex := 0                      // @step:initialize
	highIndex := len(sortedArray) - 1  // @step:initialize

	for lowIndex <= highIndex &&
		targetValue >= sortedArray[lowIndex] &&
		targetValue <= sortedArray[highIndex] {

		lowValue := sortedArray[lowIndex]   // @step:compare
		highValue := sortedArray[highIndex] // @step:compare

		// Guard against division by zero when all elements in range are equal
		if highValue == lowValue {
			// @step:compare
			if lowValue == targetValue {
				return lowIndex // @step:found
			}
			break // @step:complete
		}

		// Interpolation formula — estimate position based on value distribution
		positionIndex := lowIndex +
			((targetValue-lowValue)*(highIndex-lowIndex))/(highValue-lowValue) // @step:compare

		positionValue := sortedArray[positionIndex] // @step:compare

		if positionValue == targetValue {
			// @step:compare,found
			return positionIndex // @step:found
		} else if positionValue < targetValue {
			// @step:eliminate
			lowIndex = positionIndex + 1 // @step:eliminate
		} else {
			// @step:eliminate
			highIndex = positionIndex - 1 // @step:eliminate
		}
	}

	return -1 // @step:complete
}
