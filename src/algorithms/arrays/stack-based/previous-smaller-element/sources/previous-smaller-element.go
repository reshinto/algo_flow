// Previous Smaller Element — monotonic stack: for each element, find the nearest element to the LEFT that is strictly smaller, or -1
package previoussmallerelement

func previousSmallerElement(inputArray []int) []int {
	arrayLength := len(inputArray)
	resultArray := make([]int, arrayLength) // @step:initialize
	for resultIndex := range resultArray {
		resultArray[resultIndex] = -1
	}
	increasingStack := []int{} // @step:initialize

	for scanIndex := 0; scanIndex < arrayLength; scanIndex++ {
		currentElement := inputArray[scanIndex] // @step:visit

		// Pop elements from the stack that are >= currentElement (they cannot be the answer)
		for len(increasingStack) > 0 {
			stackTop := increasingStack[len(increasingStack)-1] // @step:compare
			if inputArray[stackTop] >= currentElement {         // @step:compare
				increasingStack = increasingStack[:len(increasingStack)-1] // @step:compare
			} else {
				break
			}
		}

		// The new stack top (if any) is the nearest smaller element to the left
		if len(increasingStack) > 0 {
			nearestSmallerIndex := increasingStack[len(increasingStack)-1] // @step:visit
			resultArray[scanIndex] = inputArray[nearestSmallerIndex]       // @step:visit
		}

		increasingStack = append(increasingStack, scanIndex) // @step:visit
	}

	return resultArray // @step:complete
}
