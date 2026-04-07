// Jewels and Stones — count how many stones are also jewels using a hash set
package main

func jewelsAndStones(jewels string, stones string) int {
	jewelSet := make(map[rune]bool) // @step:initialize
	for _, jewelChar := range jewels {
		jewelSet[jewelChar] = true // @step:insert-key
	}
	count := 0
	for _, stone := range stones {
		if jewelSet[stone] {
			// @step:lookup-key
			count++ // @step:key-found
		} else {
			// @step:key-not-found
		}
	}
	return count // @step:complete
}
