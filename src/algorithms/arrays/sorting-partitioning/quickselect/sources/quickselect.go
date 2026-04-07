// Quickselect — O(n) average via Lomuto partition, recurse only on relevant half
package quickselect

func lomutoPartitionRange(array []int, rangeStart, rangeEnd int) int {
	pivotValue := array[rangeEnd] // @step:compare
	boundaryIndex := rangeStart

	for scanIndex := rangeStart; scanIndex < rangeEnd; scanIndex++ {
		if array[scanIndex] <= pivotValue { // @step:compare
			array[boundaryIndex], array[scanIndex] = array[scanIndex], array[boundaryIndex] // @step:swap
			boundaryIndex++
		}
	}

	array[boundaryIndex], array[rangeEnd] = array[rangeEnd], array[boundaryIndex] // @step:swap
	return boundaryIndex
}

func selectKth(array []int, rangeStart, rangeEnd, targetPosition int) int {
	if rangeStart == rangeEnd { // @step:compare
		return array[rangeStart] // @step:compare
	}

	pivotFinalIndex := lomutoPartitionRange(array, rangeStart, rangeEnd) // @step:compare

	if pivotFinalIndex == targetPosition { // @step:compare
		return array[pivotFinalIndex] // @step:compare
	} else if targetPosition < pivotFinalIndex {
		return selectKth(array, rangeStart, pivotFinalIndex-1, targetPosition) // @step:compare
	} else {
		return selectKth(array, pivotFinalIndex+1, rangeEnd, targetPosition) // @step:compare
	}
}

func quickselect(inputArray []int, targetK int) (int, int) {
	if len(inputArray) == 0 || targetK < 1 || targetK > len(inputArray) {
		// @step:initialize
		return -1, -1 // @step:initialize
	}

	workArray := make([]int, len(inputArray)) // @step:initialize
	copy(workArray, inputArray)
	targetIndex := targetK - 1 // @step:initialize

	kthElement := selectKth(workArray, 0, len(workArray)-1, targetIndex)

	pivotIndex := 0
	for foundIndex, val := range workArray {
		if val == kthElement {
			pivotIndex = foundIndex
			break
		}
	}

	return kthElement, pivotIndex // @step:complete
}
