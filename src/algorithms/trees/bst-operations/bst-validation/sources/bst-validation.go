// BST Validation (Recursive) — validate BST property using min/max bounds

package main

import "math"

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func validate(node *BSTNode, minVal int, maxVal int) bool {
	if node == nil {
		return true // @step:initialize
	}

	if node.value <= minVal || node.value >= maxVal {
		// Node value violates BST bounds
		return false // @step:found
	}

	// Recurse: left subtree values must be less than current node
	// Right subtree values must be greater than current node
	return validate(node.left, minVal, node.value) && // @step:search-node
		validate(node.right, node.value, maxVal) // @step:search-node
}

func bstValidation(root *BSTNode) bool {
	return validate(root, math.MinInt64, math.MaxInt64) // @step:complete
}
