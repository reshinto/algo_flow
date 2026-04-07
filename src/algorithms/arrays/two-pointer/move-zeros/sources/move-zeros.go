// Move Zeros to End — O(n) two-pointer: write pointer tracks next write position, read pointer scans
package movezeros

func moveZeros(inputArray []int) []int {
	result := make([]int, len(inputArray))
	copy(result, inputArray)
	writePointer := 0 // @step:initialize

	for readPointer := 0; readPointer < len(result); readPointer++ {
		currentElement := result[readPointer] // @step:compare
		if currentElement != 0 {             // @step:compare
			result[writePointer], result[readPointer] = result[readPointer], result[writePointer] // @step:swap
			writePointer++ // @step:visit
		}
	}

	return result // @step:complete
}
