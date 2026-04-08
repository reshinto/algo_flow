// Min Cost Climbing Stairs tabulation — minimum cost to reach the top

package main

import "fmt"

func minCostClimbingStairsTabulation(costs []int) int {
	// @step:initialize
	stairCount := len(costs) // @step:initialize
	if stairCount == 0 {
		return 0 // @step:initialize
	}
	dpTable := make([]int, stairCount+1) // @step:initialize,fill-table
	dpTable[0] = 0                       // @step:fill-table
	dpTable[1] = 0                       // @step:fill-table
	// Each entry is the minimum cost to reach that step from either one or two steps below
	for currentStep := 2; currentStep <= stairCount; currentStep++ {
		// @step:compute-cell
		fromOne := dpTable[currentStep-1] + costs[currentStep-1] // @step:compute-cell,read-cache
		fromTwo := dpTable[currentStep-2] + costs[currentStep-2] // @step:compute-cell,read-cache
		dpTable[currentStep] = fromOne
		if fromTwo < dpTable[currentStep] {
			dpTable[currentStep] = fromTwo
		}
	}
	return dpTable[stairCount] // @step:complete
}

func main() {
	costs := []int{10, 15, 20}
	result := minCostClimbingStairsTabulation(costs)
	fmt.Printf("Min cost to climb %v: %d\n", costs, result)
}
