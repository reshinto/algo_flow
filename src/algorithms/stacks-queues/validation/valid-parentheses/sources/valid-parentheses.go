// Valid Parentheses — use a stack to verify every opening bracket has a matching closing bracket
package main

import "fmt"

func validParentheses(inputString string) bool {
	stack := []rune{} // @step:initialize
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'} // @step:initialize
	for _, ch := range inputString {
		// @step:push,pop
		if ch == '(' || ch == '[' || ch == '{' {
			stack = append(stack, ch) // @step:push
		} else {
			// Closing bracket — check that stack top matches the expected opening bracket
			if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] { // @step:mismatch
				return false // @step:mismatch
			}
			stack = stack[:len(stack)-1] // @step:pop
		}
	}
	// Valid only if every opened bracket was closed
	return len(stack) == 0 // @step:complete
}

func main() {
	fmt.Println(validParentheses("({[]})"))
}
