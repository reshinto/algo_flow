// Can Jump tabulation — determine if you can reach the last index from index 0

package main

import "fmt"

func canJump(nums []int) bool {
	// @step:initialize
	tableSize := len(nums) // @step:initialize
	dpTable := make([]int, tableSize) // @step:initialize,fill-table
	dpTable[0] = 1                    // @step:fill-table
	// For each index, check if any prior reachable index can reach it
	for targetIndex := 1; targetIndex < tableSize; targetIndex++ {
		// @step:compute-cell
		for sourceIndex := 0; sourceIndex < targetIndex; sourceIndex++ {
			// @step:read-cache
			if dpTable[sourceIndex] == 1 && sourceIndex+nums[sourceIndex] >= targetIndex {
				// @step:read-cache,compute-cell
				dpTable[targetIndex] = 1 // @step:compute-cell
				break
			}
		}
	}
	return dpTable[tableSize-1] == 1 // @step:complete
}

func main() {
	nums := []int{2, 3, 1, 1, 4}
	result := canJump(nums)
	fmt.Printf("Can jump %v: %v\n", nums, result)
}
