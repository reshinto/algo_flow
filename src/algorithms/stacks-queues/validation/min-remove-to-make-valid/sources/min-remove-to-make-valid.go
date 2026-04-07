// Min Remove to Make Valid — use a stack of indices to track unmatched '(' and a set for unmatched ')'
package main

import "fmt"

func minRemoveToMakeValid(inputString string) string {
	unmatchedOpenIndices := []int{} // @step:initialize
	unmatchedCloseIndices := map[int]bool{} // @step:initialize
	runes := []rune(inputString)
	for charIdx := 0; charIdx < len(runes); charIdx++ {
		ch := runes[charIdx] // @step:visit
		if ch == '(' {
			unmatchedOpenIndices = append(unmatchedOpenIndices, charIdx) // @step:push
		} else if ch == ')' {
			if len(unmatchedOpenIndices) > 0 {
				unmatchedOpenIndices = unmatchedOpenIndices[:len(unmatchedOpenIndices)-1] // @step:pop
			} else {
				unmatchedCloseIndices[charIdx] = true // @step:mismatch
			}
		}
	}
	// Remaining indices in the stack are unmatched opening brackets
	unmatchedIndices := map[int]bool{} // @step:mismatch
	for idx, val := range unmatchedCloseIndices {
		unmatchedIndices[idx] = val
	}
	for _, idx := range unmatchedOpenIndices {
		unmatchedIndices[idx] = true
	}
	result := "" // @step:complete
	for charIdx := 0; charIdx < len(runes); charIdx++ {
		if !unmatchedIndices[charIdx] {
			result += string(runes[charIdx]) // @step:complete
		}
	}
	return result // @step:complete
}

func main() {
	fmt.Println(minRemoveToMakeValid("lee(t(c)o)de)"))
}
