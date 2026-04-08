// Product of Array Except Self — O(n) two-pass prefix/suffix product (no division)
package productexceptself

func productExceptSelf(inputArray []int) []int {
	arrayLength := len(inputArray) // @step:initialize
	if arrayLength == 0 {          // @step:initialize
		return []int{} // @step:initialize
	}

	resultArray := make([]int, arrayLength) // @step:initialize
	for resultIndex := range resultArray {
		resultArray[resultIndex] = 1
	}

	// Left pass: resultArray[index] = product of all elements to the left
	prefixProduct := 1 // @step:visit
	for scanIndex := 0; scanIndex < arrayLength; scanIndex++ { // @step:visit
		resultArray[scanIndex] = prefixProduct          // @step:visit
		prefixProduct *= inputArray[scanIndex]           // @step:visit
	}

	// Right pass: multiply each position by the product of all elements to the right
	suffixProduct := 1 // @step:visit
	for scanIndex := arrayLength - 1; scanIndex >= 0; scanIndex-- { // @step:visit
		resultArray[scanIndex] *= suffixProduct          // @step:visit
		suffixProduct *= inputArray[scanIndex]           // @step:visit
	}

	return resultArray // @step:complete
}
