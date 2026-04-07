// Infix to Postfix — Dijkstra's Shunting-Yard: convert infix expression to postfix (RPN)
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func infixToPostfix(expression string) string {
	operatorPrecedence := map[rune]int{'+': 1, '-': 1, '*': 2, '/': 2} // @step:initialize
	outputQueue := []string{} // @step:initialize
	operatorStack := []rune{} // @step:initialize

	// Tokenize: collect alphanumeric runs and single-char operators/parens
	tokens := []string{} // @step:initialize
	runes := []rune(expression)
	charIdx := 0
	for charIdx < len(runes) {
		ch := runes[charIdx]
		if unicode.IsLetter(ch) || unicode.IsDigit(ch) {
			token := ""
			for charIdx < len(runes) && (unicode.IsLetter(runes[charIdx]) || unicode.IsDigit(runes[charIdx])) {
				token += string(runes[charIdx])
				charIdx++
			}
			tokens = append(tokens, token)
		} else if strings.ContainsRune("+-*/()", ch) {
			tokens = append(tokens, string(ch))
			charIdx++
		} else {
			charIdx++
		}
	}

	for _, currentToken := range tokens {
		// @step:visit
		isOperand := len(currentToken) > 0 && (unicode.IsLetter(rune(currentToken[0])) || unicode.IsDigit(rune(currentToken[0])))
		if isOperand {
			// Operand — send directly to output
			outputQueue = append(outputQueue, currentToken) // @step:output
		} else if tokenPrec, isOp := operatorPrecedence[rune(currentToken[0])]; isOp {
			// Operator — pop higher/equal-precedence operators to output first
			for len(operatorStack) > 0 {
				stackTop := operatorStack[len(operatorStack)-1]
				if stackTop == '(' {
					break
				}
				topPrec, topIsOp := operatorPrecedence[stackTop]
				if topIsOp && topPrec >= tokenPrec { // @step:compare
					outputQueue = append(outputQueue, string(operatorStack[len(operatorStack)-1])) // @step:pop
					operatorStack = operatorStack[:len(operatorStack)-1] // @step:pop
				} else {
					break
				}
			}
			operatorStack = append(operatorStack, rune(currentToken[0])) // @step:push
		} else if currentToken == "(" {
			operatorStack = append(operatorStack, '(') // @step:push
		} else if currentToken == ")" {
			// Pop to output until matching '(' is found
			for len(operatorStack) > 0 && operatorStack[len(operatorStack)-1] != '(' {
				outputQueue = append(outputQueue, string(operatorStack[len(operatorStack)-1])) // @step:pop
				operatorStack = operatorStack[:len(operatorStack)-1] // @step:pop
			}
			if len(operatorStack) > 0 {
				operatorStack = operatorStack[:len(operatorStack)-1] // @step:pop — discard the '('
			}
		}
	}

	// Drain remaining operators to output
	for len(operatorStack) > 0 {
		outputQueue = append(outputQueue, string(operatorStack[len(operatorStack)-1])) // @step:pop
		operatorStack = operatorStack[:len(operatorStack)-1]
	}

	return strings.Join(outputQueue, " ") // @step:complete
}

func main() {
	fmt.Println(infixToPostfix("A+B*C"))
}
