// BST Validation (Iterative) — stack-based in-order traversal checking ascending order

package main

import "math"

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstValidationIterative(root *BSTNode) bool {
	stack := []*BSTNode{}    // @step:initialize
	previousValue := math.MinInt64
	current := root

	for current != nil || len(stack) > 0 {
		// Push all left nodes onto the stack
		for current != nil {
			stack = append(stack, current) // @step:search-node
			current = current.left
		}

		// Process the top of the stack
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		// In-order value must be strictly greater than the previous one
		if top.value <= previousValue {
			return false // @step:found — BST violation detected
		}

		previousValue = top.value // @step:search-node
		current = top.right
	}

	return true // @step:complete — all values in ascending order
}
