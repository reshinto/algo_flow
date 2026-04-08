// Rotate Array (Reversal Method) — O(n) three-reversal technique with O(1) space
package rotatearray

func rotateArray(inputArray []int, rotateCount int) []int {
	result := make([]int, len(inputArray))
	copy(result, inputArray)
	arrayLength := len(result)

	if arrayLength == 0 {
		return result // @step:initialize
	}

	effectiveRotation := rotateCount % arrayLength // @step:initialize

	if effectiveRotation == 0 {
		return result // @step:initialize
	}

	// Phase 1: reverse entire array
	leftPointer := 0               // @step:initialize
	rightPointer := arrayLength - 1 // @step:initialize

	for leftPointer < rightPointer {
		result[leftPointer], result[rightPointer] = result[rightPointer], result[leftPointer] // @step:swap
		leftPointer++  // @step:visit
		rightPointer-- // @step:visit
	}

	// Phase 2: reverse first effectiveRotation elements
	leftPointer = 0                    // @step:initialize
	rightPointer = effectiveRotation - 1 // @step:initialize

	for leftPointer < rightPointer {
		result[leftPointer], result[rightPointer] = result[rightPointer], result[leftPointer] // @step:swap
		leftPointer++  // @step:visit
		rightPointer-- // @step:visit
	}

	// Phase 3: reverse remaining elements
	leftPointer = effectiveRotation  // @step:initialize
	rightPointer = arrayLength - 1   // @step:initialize

	for leftPointer < rightPointer {
		result[leftPointer], result[rightPointer] = result[rightPointer], result[leftPointer] // @step:swap
		leftPointer++  // @step:visit
		rightPointer-- // @step:visit
	}

	return result // @step:complete
}
