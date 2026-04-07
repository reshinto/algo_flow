// Contains Duplicate — determine if any value appears at least twice using a hash set
package main

func containsDuplicate(numbers []int) bool {
	seen := make(map[int]bool) // @step:initialize
	for _, current := range numbers {
		if seen[current] {
			// @step:key-found
			return true // @step:key-found
		}
		// Not seen yet — record it for future duplicate checks
		seen[current] = true // @step:insert-key
	}
	return false // @step:complete
}
