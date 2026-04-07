// House Robber tabulation — build DP table iteratively from base cases

package main

import "fmt"

func houseRobberTabulation(houses []int) int {
	// @step:initialize
	if len(houses) == 0 {
		return 0 // @step:initialize
	}
	if len(houses) == 1 {
		return houses[0] // @step:initialize,fill-table
	}
	dpTable := make([]int, len(houses)) // @step:initialize,fill-table
	dpTable[0] = houses[0]             // @step:fill-table
	dpTable[1] = houses[0]
	if houses[1] > dpTable[1] {
		dpTable[1] = houses[1] // @step:fill-table
	}
	// Each entry is max(rob current + dp[i-2], skip current = dp[i-1])
	for houseIndex := 2; houseIndex < len(houses); houseIndex++ {
		// @step:compute-cell
		skipCurrent := dpTable[houseIndex-1]
		robCurrent := dpTable[houseIndex-2] + houses[houseIndex]
		dpTable[houseIndex] = skipCurrent
		if robCurrent > dpTable[houseIndex] {
			dpTable[houseIndex] = robCurrent // @step:compute-cell,read-cache
		}
	}
	return dpTable[len(houses)-1] // @step:complete
}

func main() {
	houses := []int{2, 7, 9, 3, 1}
	result := houseRobberTabulation(houses)
	fmt.Printf("Max rob from %v: %d\n", houses, result)
}
