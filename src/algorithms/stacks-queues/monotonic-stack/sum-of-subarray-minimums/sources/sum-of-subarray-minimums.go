// Sum of Subarray Minimums — for each element, compute its contribution as minimum across subarrays using monotonic stack
package main

import "fmt"

func sumOfSubarrayMinimums(arr []int64) int64 {
	const mod int64 = 1_000_000_007 // @step:initialize
	arrayLength := len(arr) // @step:initialize
	leftDistances := make([]int64, arrayLength) // @step:initialize
	rightDistances := make([]int64, arrayLength) // @step:initialize
	indexStack := []int{} // @step:initialize

	// Compute left distances: distance to previous less element
	for elementIdx := 0; elementIdx < arrayLength; elementIdx++ {
		currentValue := arr[elementIdx] // @step:visit
		// Pop while stack top has value >= current (not strictly less)
		for len(indexStack) > 0 && arr[indexStack[len(indexStack)-1]] >= currentValue { // @step:compare
			indexStack = indexStack[:len(indexStack)-1] // @step:maintain-monotonic
		}
		if len(indexStack) == 0 {
			leftDistances[elementIdx] = int64(elementIdx) + 1
		} else {
			leftDistances[elementIdx] = int64(elementIdx) - int64(indexStack[len(indexStack)-1])
		} // @step:resolve
		indexStack = append(indexStack, elementIdx) // @step:push
	}

	indexStack = indexStack[:0] // @step:initialize

	// Compute right distances: distance to next less-or-equal element
	for elementIdx := arrayLength - 1; elementIdx >= 0; elementIdx-- {
		currentValue := arr[elementIdx] // @step:visit
		// Pop while stack top has value > current (strictly greater — allows equal on right)
		for len(indexStack) > 0 && arr[indexStack[len(indexStack)-1]] > currentValue { // @step:compare
			indexStack = indexStack[:len(indexStack)-1] // @step:maintain-monotonic
		}
		if len(indexStack) == 0 {
			rightDistances[elementIdx] = int64(arrayLength) - int64(elementIdx)
		} else {
			rightDistances[elementIdx] = int64(indexStack[len(indexStack)-1]) - int64(elementIdx)
		} // @step:resolve
		indexStack = append(indexStack, elementIdx) // @step:push
	}

	// Sum contributions: each element contributes arr[i] * left[i] * right[i]
	var result int64 = 0 // @step:initialize
	for elementIdx := 0; elementIdx < arrayLength; elementIdx++ {
		result = (result + arr[elementIdx]*leftDistances[elementIdx]*rightDistances[elementIdx]) % mod // @step:resolve
	}

	return result // @step:complete
}

func main() {
	arr := []int64{3, 1, 2, 4}
	fmt.Println(sumOfSubarrayMinimums(arr))
}
