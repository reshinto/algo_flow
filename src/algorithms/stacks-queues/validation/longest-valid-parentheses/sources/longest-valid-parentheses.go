// Longest Valid Parentheses — find the length of the longest well-formed parentheses substring
package main

import "fmt"

func longestValidParentheses(inputString string) int {
	indexStack := []int{-1} // @step:initialize
	maxLength := 0 // @step:initialize
	runes := []rune(inputString)
	for charIdx := 0; charIdx < len(runes); charIdx++ {
		ch := runes[charIdx] // @step:visit
		if ch == '(' {
			indexStack = append(indexStack, charIdx) // @step:push
		} else {
			// Pop the top; if stack becomes empty, push current index as new base
			indexStack = indexStack[:len(indexStack)-1] // @step:pop
			if len(indexStack) == 0 {
				indexStack = append(indexStack, charIdx) // @step:push
			} else {
				// Length of current valid substring = current index minus new stack top
				stackTop := indexStack[len(indexStack)-1] // @step:compare
				currentLength := charIdx - stackTop // @step:compare
				if currentLength > maxLength {
					maxLength = currentLength // @step:compare
				}
			}
		}
	}
	return maxLength // @step:complete
}

func main() {
	fmt.Println(longestValidParentheses(")()())"))
}
