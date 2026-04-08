// Backspace String Compare — use a stack to process each string, treating '#' as backspace
package main

import "fmt"

func processWithBackspace(inputStr string) []rune {
	resultStack := []rune{} // @step:initialize
	for _, ch := range inputStr {
		// @step:visit
		if ch == '#' {
			if len(resultStack) > 0 {
				resultStack = resultStack[:len(resultStack)-1] // @step:pop
			}
		} else {
			resultStack = append(resultStack, ch) // @step:push
		}
	}
	return resultStack // @step:compare
}

func backspaceStringCompare(firstString string, secondString string) bool {
	processedFirst := processWithBackspace(firstString) // @step:initialize
	processedSecond := processWithBackspace(secondString) // @step:initialize
	if len(processedFirst) != len(processedSecond) {
		return false // @step:compare
	}
	for charIdx := 0; charIdx < len(processedFirst); charIdx++ {
		if processedFirst[charIdx] != processedSecond[charIdx] {
			return false // @step:compare
		}
	}
	return true // @step:complete
}

func main() {
	fmt.Println(backspaceStringCompare("ab#c", "ad#c"))
}
