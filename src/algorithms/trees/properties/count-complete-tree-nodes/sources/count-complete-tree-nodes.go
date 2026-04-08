// Count Complete Tree Nodes — if left height equals right height, nodes = 2^h - 1, else recurse

package main

import "math"

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func countCompleteTreeNodes(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	// Compute left-most height and right-most height
	leftHeight := 0  // @step:initialize
	rightHeight := 0 // @step:initialize

	leftCursor := root // @step:traverse-left
	for leftCursor != nil {
		// @step:traverse-left
		leftHeight += 1             // @step:update-height
		leftCursor = leftCursor.left // @step:traverse-left
	}

	rightCursor := root // @step:traverse-right
	for rightCursor != nil {
		// @step:traverse-right
		rightHeight += 1              // @step:update-height
		rightCursor = rightCursor.right // @step:traverse-right
	}

	// If heights match, the tree is a perfect binary tree
	if leftHeight == rightHeight {
		// @step:check-balance
		return int(math.Pow(2, float64(leftHeight))) - 1 // @step:add-to-result
	}

	// Otherwise recurse on both subtrees
	leftCount := countCompleteTreeNodes(root.left)   // @step:traverse-left
	rightCount := countCompleteTreeNodes(root.right) // @step:traverse-right
	return leftCount + rightCount + 1 // @step:add-to-result
}
