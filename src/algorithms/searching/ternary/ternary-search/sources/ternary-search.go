// Ternary Search — divide the array into three parts on each iteration
package main

func ternarySearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	lowIndex := 0                      // @step:initialize
	highIndex := len(sortedArray) - 1  // @step:initialize

	for lowIndex <= highIndex {
		rangeSize := highIndex - lowIndex           // @step:compare
		mid1Index := lowIndex + rangeSize/3         // @step:compare
		mid2Index := highIndex - rangeSize/3        // @step:compare

		mid1Value := sortedArray[mid1Index] // @step:compare
		mid2Value := sortedArray[mid2Index] // @step:compare

		if mid1Value == targetValue {
			// @step:compare,found
			return mid1Index // @step:found
		}

		if mid2Value == targetValue {
			// @step:compare,found
			return mid2Index // @step:found
		}

		if targetValue < mid1Value {
			// @step:eliminate
			// Target is in the left third
			highIndex = mid1Index - 1 // @step:eliminate
		} else if targetValue > mid2Value {
			// @step:eliminate
			// Target is in the right third
			lowIndex = mid2Index + 1 // @step:eliminate
		} else {
			// @step:eliminate
			// Target is in the middle third
			lowIndex = mid1Index + 1  // @step:eliminate
			highIndex = mid2Index - 1 // @step:eliminate
		}
	}

	return -1 // @step:complete
}
