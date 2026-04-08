// Lomuto Partition — O(n) partition scheme using last element as pivot and a boundary pointer
package lomutopartition

func lomutoPartition(inputArray []int) (int, []int) {
	if len(inputArray) == 0 {
		// @step:initialize
		return -1, []int{} // @step:initialize
	}

	result := make([]int, len(inputArray)) // @step:initialize
	copy(result, inputArray)
	pivotOriginalIndex := len(result) - 1
	pivotValue := result[pivotOriginalIndex] // @step:initialize
	boundaryIndex := 0                       // @step:initialize

	for scanIndex := 0; scanIndex < pivotOriginalIndex; scanIndex++ { // @step:visit
		if result[scanIndex] <= pivotValue { // @step:compare
			result[boundaryIndex], result[scanIndex] = result[scanIndex], result[boundaryIndex] // @step:swap
			boundaryIndex++ // @step:visit
		}
	}

	// Place pivot into its final sorted position
	result[boundaryIndex], result[pivotOriginalIndex] = result[pivotOriginalIndex], result[boundaryIndex] // @step:swap

	return boundaryIndex, result // @step:complete
}
