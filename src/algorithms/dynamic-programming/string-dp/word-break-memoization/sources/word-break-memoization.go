// Word Break memoization — determine if text can be segmented into dictionary words top-down

package main

import "fmt"

func canBreak(text string, dictionary []string, startIndex int, memo map[int]bool) bool {
	textLength := len(text)
	if startIndex == textLength {
		return true // @step:fill-table
	}
	if cached, found := memo[startIndex]; found {
		return cached // @step:read-cache
	}
	// @step:push-call
	for _, word := range dictionary {
		// @step:compute-cell
		endIndex := startIndex + len(word) // @step:compute-cell
		if endIndex <= textLength && text[startIndex:endIndex] == word {
			// @step:compute-cell
			if canBreak(text, dictionary, endIndex, memo) {
				// @step:compute-cell
				memo[startIndex] = true // @step:compute-cell
				return true             // @step:pop-call
			}
		}
	}
	memo[startIndex] = false // @step:compute-cell
	return false             // @step:pop-call
}

func wordBreakMemoization(text string, dictionary []string) bool {
	// @step:initialize
	textLength := len(text) // @step:initialize
	if textLength == 0 {
		return true // @step:initialize
	}
	memo := make(map[int]bool)
	return canBreak(text, dictionary, 0, memo) // @step:complete
}

func main() {
	text := "leetcode"
	dictionary := []string{"leet", "code"}
	result := wordBreakMemoization(text, dictionary)
	fmt.Printf("Can break \"%s\": %v\n", text, result)
}
