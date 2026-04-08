// Word Break tabulation — determine if a string can be segmented into dictionary words bottom-up

package main

import "fmt"

func wordBreakTabulation(text string, dictionary []string) bool {
	// @step:initialize
	textLength := len(text) // @step:initialize
	dpTable := make([]int, textLength+1) // @step:initialize
	dpTable[0] = 1                       // @step:fill-table
	for endIndex := 1; endIndex <= textLength; endIndex++ {
		// @step:read-cache
		for _, word := range dictionary {
			// @step:read-cache
			if endIndex >= len(word) {
				// @step:read-cache
				segment := text[endIndex-len(word) : endIndex] // @step:read-cache
				if segment == word && dpTable[endIndex-len(word)] == 1 {
					// @step:read-cache
					dpTable[endIndex] = 1 // @step:read-cache
				}
			}
			// @step:compute-cell
		}
	}
	return dpTable[textLength] == 1 // @step:complete
}

func main() {
	text := "leetcode"
	dictionary := []string{"leet", "code"}
	result := wordBreakTabulation(text, dictionary)
	fmt.Printf("Can break \"%s\": %v\n", text, result)
}
