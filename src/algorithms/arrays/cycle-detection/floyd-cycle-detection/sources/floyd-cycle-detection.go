// Floyd's Cycle Detection — tortoise and hare: treat array as linked structure, detect cycle and find entrance
package floydcycledetection

func floydCycleDetection(inputArray []int) (hasCycle bool, cycleStart int) {
	if len(inputArray) == 0 {
		// @step:initialize
		return false, -1 // @step:initialize
	}

	tortoise := 0 // @step:initialize
	hare := 0     // @step:initialize

	// Phase 1: detect meeting point inside the cycle
	iterationCount := 0
	maxIterations := len(inputArray) * 2
	for {
		if tortoise < 0 || tortoise >= len(inputArray) {
			break
		}
		if hare < 0 || hare >= len(inputArray) {
			break
		}
		tortoise = inputArray[tortoise] // @step:visit
		hareNext := inputArray[hare]
		if hareNext < 0 || hareNext >= len(inputArray) {
			break
		}
		hare = inputArray[hareNext] // @step:visit
		iterationCount++
		if iterationCount > maxIterations {
			break
		}
		if tortoise == hare { // @step:compare
			break
		}
	}

	// Phase 2: find cycle entrance — reset tortoise to start, hare stays at meeting point
	tortoise = 0 // @step:visit
	for tortoise != hare { // @step:compare
		tortoise = inputArray[tortoise] // @step:visit
		hare = inputArray[hare]         // @step:visit
	}

	return true, tortoise // @step:complete
}
