// Next Greater Element — monotonic stack: for each element, find the next strictly greater element to its right
package nextgreaterelement

func nextGreaterElement(inputArray []int) []int {
	arrayLength := len(inputArray)
	resultArray := make([]int, arrayLength) // @step:initialize
	for resultIndex := range resultArray {
		resultArray[resultIndex] = -1
	}
	pendingStack := []int{} // @step:initialize

	for scanIndex := 0; scanIndex < arrayLength; scanIndex++ {
		currentElement := inputArray[scanIndex] // @step:visit

		for len(pendingStack) > 0 {
			stackTop := pendingStack[len(pendingStack)-1] // @step:compare
			if inputArray[stackTop] < currentElement {    // @step:compare
				pendingStack = pendingStack[:len(pendingStack)-1] // @step:compare
				resultArray[stackTop] = currentElement            // @step:compare
			} else {
				break
			}
		}

		pendingStack = append(pendingStack, scanIndex) // @step:visit
	}

	return resultArray // @step:complete
}
