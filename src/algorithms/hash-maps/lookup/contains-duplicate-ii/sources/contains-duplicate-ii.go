// Contains Duplicate II — find if the same value appears within maxDistance index gap
package main

func containsDuplicateII(numbers []int, maxDistance int) bool {
	indexMap := make(map[int]int) // @step:initialize
	for currentIndex, current := range numbers {
		storedIndex, exists := indexMap[current]
		if exists {
			// @step:check-duplicate
			distance := currentIndex - storedIndex
			if distance < 0 {
				distance = -distance
			}
			if distance <= maxDistance {
				// @step:key-found
				return true // @step:key-found
			}
			// Too far apart — update stored index to keep closest occurrence
			indexMap[current] = currentIndex // @step:update-value
		} else {
			// First time seeing this value — store its index
			indexMap[current] = currentIndex // @step:insert-key
		}
	}
	return false // @step:complete
}
