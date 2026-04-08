// Hash-Based Search — build a hash map for O(1) lookup after O(n) build phase
package main

func hashSearch(array []int, targetValue int) int {
	// @step:initialize
	hashMap := make(map[int]int) // @step:initialize

	// Build phase: insert every element into the hash map
	for elementIndex, elementValue := range array {
		// @step:visit
		hashMap[elementValue] = elementIndex // @step:visit
	}

	// Search phase: O(1) lookup
	resultIndex, found := hashMap[targetValue] // @step:compare
	if found {
		// @step:compare,found
		return resultIndex // @step:found
	}

	return -1 // @step:complete
}
