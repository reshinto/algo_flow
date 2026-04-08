// Fibonacci Search — use Fibonacci numbers to divide the array and narrow the search range
package main

func fibonacciSearch(sortedArray []int, targetValue int) int {
	// @step:initialize
	arrayLength := len(sortedArray) // @step:initialize
	if arrayLength == 0 {
		return -1 // @step:initialize
	}

	fibM2 := 0              // @step:initialize — Fibonacci(k-2)
	fibM1 := 1              // @step:initialize — Fibonacci(k-1)
	fibM := fibM1 + fibM2   // @step:initialize — Fibonacci(k)

	// Find the smallest Fibonacci number >= arrayLength
	for fibM < arrayLength {
		// @step:initialize
		fibM2 = fibM1          // @step:initialize
		fibM1 = fibM           // @step:initialize
		fibM = fibM1 + fibM2   // @step:initialize
	}

	offset := -1 // @step:initialize

	for fibM > 1 {
		compareIndex := offset + fibM2 // @step:compare
		if compareIndex > arrayLength-1 {
			compareIndex = arrayLength - 1
		}
		compareValue := sortedArray[compareIndex] // @step:compare

		if compareValue < targetValue {
			// @step:eliminate
			// Target is in the right portion — advance offset
			fibM = fibM1           // @step:eliminate
			fibM1 = fibM2          // @step:eliminate
			fibM2 = fibM - fibM1   // @step:eliminate
			offset = compareIndex  // @step:eliminate
		} else if compareValue > targetValue {
			// @step:eliminate
			// Target is in the left portion — shrink range
			fibM = fibM2           // @step:eliminate
			fibM1 = fibM1 - fibM2  // @step:eliminate
			fibM2 = fibM - fibM1   // @step:eliminate
		} else {
			// @step:found
			return compareIndex // @step:found
		}
	}

	// Check the remaining element
	if fibM1 == 1 && offset+1 < arrayLength && sortedArray[offset+1] == targetValue {
		// @step:compare,found
		return offset + 1 // @step:found
	}

	return -1 // @step:complete
}
