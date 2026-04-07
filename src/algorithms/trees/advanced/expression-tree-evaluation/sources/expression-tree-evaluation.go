// Expression Tree Evaluation — build expression tree from postfix, then evaluate
package main

import (
	"strconv"
	"strings"
)

type ExprNode struct {
	token string
	left  *ExprNode
	right *ExprNode
}

func evaluate(node *ExprNode) int64 {
	if node == nil {
		return 0
	}
	if node.left == nil && node.right == nil {
		val, _ := strconv.ParseInt(node.token, 10, 64)
		return val // @step:visit
	}

	leftValue := evaluate(node.left)  // @step:traverse-left
	rightValue := evaluate(node.right) // @step:traverse-right

	switch node.token {
	case "+":
		return leftValue + rightValue // @step:visit
	case "-":
		return leftValue - rightValue // @step:visit
	case "*":
		return leftValue * rightValue // @step:visit
	case "/":
		return leftValue / rightValue // @step:visit
	}
	return 0
}

func expressionTreeEvaluation(expression string) int64 {
	tokens := strings.Fields(strings.TrimSpace(expression)) // @step:initialize
	stack := []*ExprNode{}                                   // @step:initialize

	for _, token := range tokens {
		_, parseErr := strconv.ParseInt(token, 10, 64)
		if parseErr == nil {
			stack = append(stack, &ExprNode{token: token}) // @step:build-node
		} else {
			rightOperand := stack[len(stack)-1]
			stack = stack[:len(stack)-1] // @step:connect-child
			leftOperand := stack[len(stack)-1]
			stack = stack[:len(stack)-1] // @step:connect-child
			node := &ExprNode{token: token, left: leftOperand, right: rightOperand}
			stack = append(stack, node) // @step:build-node
		}
	}

	var root *ExprNode
	if len(stack) > 0 {
		root = stack[0]
	}
	return evaluate(root) // @step:complete
}
